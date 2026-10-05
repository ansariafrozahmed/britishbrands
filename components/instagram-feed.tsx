import Image from "next/image";
import { Reveal } from "@/components/reveal";

const posts = [
  {
    id: 1,
    image: "/insta1.jpg",
    link: "https://www.instagram.com/britishbrands.ly",
  },
  {
    id: 2,
    image: "/insta6.jpg",
    link: "https://www.instagram.com/britishbrands.ly",
  },
  {
    id: 3,
    image: "/insta3.jpg",
    link: "https://www.instagram.com/britishbrands.ly",
  },
  {
    id: 4,
    image: "/insta4.jpg",
    link: "https://www.instagram.com/britishbrands.ly",
  },
  {
    id: 5,
    image: "/insta5.jpg",
    link: "https://www.instagram.com/britishbrands.ly",
  },
  // {
  //   id: 6,
  //   image: "/insta6.jpg",
  //   link: "https://www.instagram.com/britishbrands.ly",
  // },
];

export function InstagramFeed() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-12 lg:px-14 lg:py-20">
      <Reveal className="flex flex-col items-center text-center mb-10">
        <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          Follow Us
        </p>
        <h2 className="mt-4 font-display text-[1.6rem] font-normal tracking-[0.01em] leading-[1.4] md:text-[1.8rem] bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] inline-block text-transparent bg-clip-text pb-1">
          @britishbrands.ly
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {posts.map((post, idx) => (
          <Reveal
            key={post.id}
            delay={idx * 100}
            className={idx === 4 ? "col-span-2 md:col-span-1" : ""}
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block overflow-hidden aspect-square bg-line `}
            >
              <Image
                src={post.image}
                alt="Instagram post"
                height={400}
                width={400}
                className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-ink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-white scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                  fill="currentColor"
                >
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 2.2a4 4 0 110 8 4 4 0 010-8zm6.4-3.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z" />
                </svg>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300} className="mt-12 text-center">
        <a
          href="https://www.instagram.com/britishbrands.ly"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 rounded-sm bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity duration-300 hover:opacity-90 shadow-md"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-[18px] h-[18px]"
            fill="currentColor"
          >
            <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 2.2a4 4 0 110 8 4 4 0 010-8zm6.4-3.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z" />
          </svg>
          Follow us on Instagram
        </a>
      </Reveal>
    </section>
  );
}
