import React from "react";
import SEO from "../components/SEO";
import { Hero } from "../components/hero";
import { FAQItem } from "../components/faqItem";
import { Grid } from "@chakra-ui/core";

const FAQPage = () => {
  return (
    <>
      <SEO
        pageTitle='FAQ'
        pageDescription="Any and all questions regarding BeFreakingKind, it's website and products. If your question is not answered, please use the contact form."
      />
      <Hero text='FAQ.' />
      <Grid
        templateColumns={["auto-fill", "auto-fill", "repeat(2, 1fr)"]}
        gap={6}>
        {faqs.map(faq => (
          <FAQItem question={faq.question} answer={faq.answer} />
        ))}
      </Grid>
    </>
  );
};

export default FAQPage;

const faqs = [
  {
    question: "Are there any discounts / coupon codes?",
    answer: "We do not currently offer any discounts."
  },
  {
    question: "Can I track my order?",
    answer: "Tracking is not possible yet, but will be possible soon."
  }
];
