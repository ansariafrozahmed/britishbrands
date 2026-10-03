export const contact = {
  // digits only, with country code: used for wa.me and tel: links
  phoneDigits: "218943322111",
  phoneDisplay: "+218 94 332 2111",
  email: "info@britishbrandsly.com",
  salesEmail: "Sales@britishbrandsly.com",
  address: "Venesia Street, Benghazi, Libya",
  city: "Benghazi",
};

export const telHref = `tel:+${contact.phoneDigits}`;

export function whatsappHref(message: string): string {
  return `https://wa.me/${contact.phoneDigits}?text=${encodeURIComponent(message)}`;
}
