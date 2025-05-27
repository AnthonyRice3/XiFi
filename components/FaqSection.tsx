'use client';

import { useState } from 'react';

// Define the FAQ type
type FaqItem = {
  question: string;
  answer: string;
};

// Define tab categories
type FaqCategory = 'General Report' | 'Our Service' | 'Support' | 'Privacy/Policy';

// Main data structure
const faqData: Record<FaqCategory, FaqItem[]> = {
  'General Report': [
    {
      question: 'How can I reset my password?',
      answer:
        'To reset your password, go to the login page and click "Forgot password." Enter your email and follow the instructions.',
    },
    {
      question: 'How do I change my email address?',
      answer:
        'You can change your email in account settings. Save changes to update your email address.',
    },
  ],
  'Our Service': [
    {
      question: 'What services do you offer?',
      answer:
        'We offer proxy management tools, remote access, and performance monitoring solutions.',
    },
    {
      question: 'Can I upgrade my plan?',
      answer:
        'Yes, you can upgrade or downgrade your plan anytime from your dashboard.',
    },
  ],
  Support: [
    {
      question: 'How do I contact support?',
      answer:
        'Reach us via live chat or email support@yourdomain.com. We respond within 24 hours.',
    },
    {
      question: 'Do you offer phone support?',
      answer: 'Currently, we only provide email and chat-based support.',
    },
  ],
  'Privacy/Policy': [
    {
      question: 'Is my data secure?',
      answer:
        'Yes. We use industry-standard encryption and never sell your data to third parties.',
    },
    {
      question: 'Where can I read your privacy policy?',
      answer: 'You can find it on the footer under "Privacy Policy".',
    },
  ],
};

export default function FaqSection() {
  const categories = Object.keys(faqData) as FaqCategory[];
  const [activeCategory, setActiveCategory] = useState<FaqCategory>(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto py-12 px-4 md:px-6 flex flex-col md:flex-row gap-10">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-700 rounded-full opacity-20 blur-3xl"></div>
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-1/4 space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setOpenIndex(null);
            }}
            className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition ${
              category === activeCategory
                ? 'bg-amber-200 text-black'
                : 'hover:bg-gray-100 text-amber-400'
            }`}
          >
            {category}
          </button>
        ))}
      </aside>

      {/* FAQ Content */}
      <div className="w-full md:w-3/4 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-amber-500 to-neutral-100">
          {activeCategory} – Frequently Asked Questions
        </h2>
        {faqData[activeCategory].map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-amber-200"
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="font-medium text-black">{item.question}</span>
              <span className="text-xl text-black">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-sm text-gray-600">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
