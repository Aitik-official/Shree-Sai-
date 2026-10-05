export const SITE_NAME = 'SHRI SAI TOURS & TRAVELS';
export const SITE_TAGLINE = 'Travel & Tour Experiences';
export const LOGO_SRC = '/WhatsApp_Image_2026-10-03_at_4.30.52_PM-removebg-preview.png';
export const SITE_DESCRIPTION =
  'Tour Packages, Adventure Expeditions & Curated Travel Experiences Across India & Beyond.';

export const HERO_SUBHEADING =
  'From family vacations and holiday tour packages to motorcycle expeditions and curated outdoor experiences, we craft journeys that create stories and memories for a lifetime.';

export const BRAND_POSITIONING =
  'SHRI SAI TOURS & TRAVELS curates premium travel packages, adventure expeditions and extraordinary experiences across India and beyond. Every journey is thoughtfully crafted to inspire, delight and create stories that stay with you long after the adventure ends.';

export const DEFAULT_ABOUT_TEXT = BRAND_POSITIONING;

export const DEFAULT_SERVICES_TEXT =
  'Customized travel planning, Guided tours & local experiences, Group & family vacations, Luxury & adventure travel';

export const CONTACT_EMAIL = 'info@shrisaitours.com';
export const CONTACT_PHONE = '+91 87657 67140';
export const CONTACT_PHONE_TEL = 'tel:+918765767140';
export const CONTACT_EMAIL_MAILTO = 'mailto:info@shrisaitours.com';
export const CONTACT_WHATSAPP = 'https://wa.me/918765767140';
export const CONTACT_ADDRESS = 'Navi Mumbai, Maharashtra 400706';
export const CONTACT_ADDRESS_LINE = 'Head Office — Navi Mumbai, Maharashtra 400706';
export const CONTACT_MAP_SEARCH =
  'https://www.google.com/maps/place/Navi+Mumbai,+Maharashtra+400706/@19.0263615,72.9798539,13z/data=!3m1!4b1!4m6!3m5!1s0x3be7c3c389405e23:0x6b5611d97b65f7c4!8m2!3d19.0344647!4d73.0110096!16s%2Fm%2F0j1x4hm';
export const CONTACT_MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48233.8!2d73.0110096!3d19.0344647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3c389405e23%3A0x6b5611d97b65f7c4!2sNavi%20Mumbai%2C%20Maharashtra%20400706!5e0!3m2!1sen!2sin!4v1721123456789!5m2!1sen!2sin';

export const CONTACT_FAQS = [
  {
    question: 'How do I book an experience with SHRI SAI TOURS & TRAVELS?',
    answer:
      "You can submit an enquiry through our website, WhatsApp or contact our team directly. We'll share the available dates, package details, inclusions and next steps to help you choose the experience that's right for you.",
  },
  {
    question: "What's typically included in a tour package?",
    answer:
      'Each experience is different. Package inclusions vary depending on the destination and activity and may include accommodation, planned activities, local transfers or other services. The specific inclusions and exclusions are clearly mentioned for every experience before booking.',
  },
  {
    question: "Can I join if I'm travelling solo or with a group?",
    answer:
      'Yes. Many of our experiences are suitable for solo travellers, friends, families or groups. Depending on the experience, you may have the option of joining a shared group or booking a private experience, subject to availability.',
  },
  {
    question: 'How do you select your travel partners?',
    answer:
      'We collaborate with experienced operators and service providers to curate quality adventure and travel experiences. The choice of partners may vary based on the destination, activity, season and availability.',
  },
] as const;

/** Replace legacy branding in stored package copy when rendering. */
export function brandedText(text?: string | null): string {
  if (!text) return '';
  return text
    .replace(/Explore\s*360/gi, SITE_NAME)
    .replace(/Explore360/gi, SITE_NAME)
    .replace(/Shree\s*Sai\s*Tours\s*&\s*Travels/gi, SITE_NAME)
    .replace(/Shree\s*Sai\s*Tours/gi, SITE_NAME)
    .replace(/Premium Sky\s*Go Tours/gi, `Premium ${SITE_NAME}`)
    .replace(/Premium Skygo Tours/gi, `Premium ${SITE_NAME}`)
    .replace(/Sky\s*Go/gi, SITE_NAME)
    .replace(/Skygo/gi, SITE_NAME);
}
