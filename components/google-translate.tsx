"use client";

import { useEffect, useRef, useState } from "react";
import { Translate, Check, CaretDown } from "@phosphor-icons/react/dist/ssr";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (opts: object, el: string) => void;
      };
    };
    __gtPatched?: boolean;
  }
}

const STORE_KEY = "wonestop_lang";
const ONE_DAY = 24 * 60 * 60 * 1000;

// Visitor country (ISO-2) → default Google Translate language.
// English-preferred markets (India, and other English-speaking countries not
// listed) are intentionally omitted so they fall through to English instead of
// being auto-translated. Only regions that generally prefer a local language
// are mapped here.
const COUNTRY_LANG: Record<string, string> = {
  PK: "ur",
  BD: "bn",
  NP: "ne",
  LK: "ta",
  FR: "fr",
  BE: "fr",
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  DE: "de",
  AT: "de",
  CH: "de",
  IT: "it",
  PT: "pt",
  BR: "pt",
  NL: "nl",
  RU: "ru",
  UA: "uk",
  PL: "pl",
  TR: "tr",
  SA: "ar",
  AE: "ar",
  EG: "ar",
  QA: "ar",
  KW: "ar",
  OM: "ar",
  CN: "zh-CN",
  TW: "zh-TW",
  HK: "zh-TW",
  JP: "ja",
  KR: "ko",
  TH: "th",
  VN: "vi",
  ID: "id",
  MY: "ms",
  PH: "tl",
};

// languages offered in the manual switcher (covers every mapped target)
const LANGS: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

function readStoredLang(): string | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as { lang: string; exp: number };
    return o && Date.now() < o.exp ? o.lang : null;
  } catch {
    return null;
  }
}

function storeLang(lang: string) {
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ lang, exp: Date.now() + ONE_DAY }),
    );
  } catch {
    /* ignore */
  }
}

/** current target language from the googtrans cookie ("/en/hi" → "hi") */
function currentGoogTrans(): string {
  const m = document.cookie.match(/googtrans=\/[^/]*\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

function setGoogTrans(lang: string) {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`];
  const parts = host.split(".");
  if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`);

  const clear = !lang || lang === "en";
  for (const d of domains) {
    const domainAttr = d ? `;domain=${d}` : "";
    if (clear) {
      document.cookie = `googtrans=;path=/${domainAttr};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } else {
      document.cookie = `googtrans=/en/${lang};path=/${domainAttr};max-age=${60 * 60 * 24 * 365}`;
    }
  }
}

/** Guard React against Google Translate's text-node rewrites (removeChild crash). */
function patchDom() {
  if (typeof window === "undefined" || window.__gtPatched) return;
  if (typeof Node !== "function" || !Node.prototype) return;
  window.__gtPatched = true;
  const proto = Node.prototype as unknown as {
    removeChild: (c: Node) => Node;
    insertBefore: (n: Node, r: Node | null) => Node;
  };
  const origRemove = proto.removeChild;
  proto.removeChild = function (this: Node, child: Node) {
    if (child.parentNode !== this) return child;
    return origRemove.call(this, child);
  };
  const origInsert = proto.insertBefore;
  proto.insertBefore = function (this: Node, newNode: Node, ref: Node | null) {
    if (ref && ref.parentNode !== this) return newNode;
    return origInsert.call(this, newNode, ref);
  };
}

function loadWidget() {
  if (document.getElementById("google-translate-script")) return;
  window.googleTranslateElementInit = () => {
    if (!window.google?.translate) return;
    new window.google.translate.TranslateElement(
      { pageLanguage: "en", includedLanguages: "en,ar", autoDisplay: false },
      "google_translate_element",
    );
  };
  const s = document.createElement("script");
  s.id = "google-translate-script";
  s.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

export default function GoogleTranslate() {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    patchDom();
    let cancelled = false;

    (async () => {
      // 1) an existing choice (cookie) wins — don't override the user
      const cookieLang = currentGoogTrans();
      if (cookieLang && cookieLang !== "en") {
        if (!cancelled) setLang(cookieLang);
        loadWidget();
        return;
      }

      // 2) cached auto-detected language (1 day)
      let target = readStoredLang();

      // 3) detect from the visitor's IP region
      if (!target) {
        try {
          const res = await fetch("https://get.geojs.io/v1/ip/country.json");
          const data = await res.json();
          const cc = String(data.country || "").toUpperCase();
          target = COUNTRY_LANG[cc] || "en";
        } catch {
          target = "en";
        }
        if (cancelled) return;
        storeLang(target);
        if (target !== "en") setGoogTrans(target);
      }

      if (!cancelled) setLang(target);
      loadWidget();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // close the dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const onChange = (code: string) => {
    // Set the cookie and reload — the widget reliably applies the cookie
    // language on load (the in-place switch was inconsistent).
    setGoogTrans(code);
    storeLang(code);
    window.location.reload();
  };

  const selectValue = LANGS.some((l) => l.code === lang) ? lang : "en";
  const currentLabel =
    LANGS.find((l) => l.code === selectValue)?.label ?? "English";

  return (
    <>
      {/* hidden Google mount point */}
      <div id="google_translate_element" aria-hidden />

      {/* language switcher — Google Translate style */}
      <div
        ref={boxRef}
        translate="no"
        className="notranslate fixed bottom-4 left-4 z-40"
      >
        {open && (
          <div className="absolute bottom-full left-0 mb-2 w-60 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_70px_-22px_rgba(6,42,32,0.55)]">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <Translate size={15} weight="fill" className="text-[#4285F4]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                Translate this page
              </span>
            </div>
            <div className="max-h-72 overflow-y-auto py-1.5">
              {LANGS.map((l) => {
                const active = l.code === selectValue;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      if (l.code !== selectValue) onChange(l.code);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-[13.5px] transition-colors hover:bg-paper ${
                      active ? "font-semibold text-brand-deep" : "text-ink"
                    }`}
                  >
                    <span>{l.label}</span>
                    {active && (
                      <Check size={14} weight="bold" className="text-brand" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5 border-t border-line bg-paper px-4 py-2 text-[11px] text-ink-faint">
              <span className="inline-flex gap-0.5" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
                <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
                <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
                <span className="h-2 w-2 rounded-full bg-[#34A853]" />
              </span>
              Powered by Google Translate
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Change language"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full border border-line bg-white/95 py-2 pl-3.5 pr-3 shadow-[0_12px_30px_-14px_rgba(6,42,32,0.45)] backdrop-blur transition-shadow hover:shadow-[0_16px_36px_-14px_rgba(6,42,32,0.5)]"
        >
          <Translate size={18} weight="fill" className="text-[#4285F4]" />
          <span className="text-[13px] font-semibold text-ink">
            {currentLabel}
          </span>
          <CaretDown
            size={12}
            weight="bold"
            className={`text-ink-faint transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </>
  );
}
