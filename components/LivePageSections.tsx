"use client";
import { useSiteData } from "./SiteDataProvider";
import { About } from "./about/About";
import { Contact } from "./contact/Contact";
import { NaturalTechniques } from "./natural-medicine/NaturalTechniques";
import { NaturalMedicinePreview } from "./home/NaturalMedicinePreview";
import { FAQList } from "./faq/FAQList";
export function LiveAbout() {
  return <About profile={useSiteData().profile} />;
}
export function LiveContact() {
  return <Contact contact={useSiteData().contact} />;
}
export function LiveNaturalMedicine() {
  return <NaturalTechniques consultation={useSiteData().naturalMedicine} />;
}
export function LiveNaturalPreview() {
  return (
    <NaturalMedicinePreview consultation={useSiteData().naturalMedicine} />
  );
}
export function LiveFAQ() {
  return <FAQList faqs={useSiteData().faqs} />;
}
