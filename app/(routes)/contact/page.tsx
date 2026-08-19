"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  IconMail,
  IconMapPin,
  IconPhone,
  IconBrandLinkedin,
  IconBrandGithub,
  IconSend,
  IconBrandX,
  } from "@tabler/icons-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const contactDetails = [
  {
    icon: <IconMail size={24} />,
    label: "Email",
    value: "hello@medify.ai",
    href: "mailto:hello@medify.ai",
  },
  {
    icon: <IconPhone size={24} />,
    label: "Phone",
    value: "+1 (250) 863-1030",
    href: "tel:+12508631030",
  },
  {
    icon: <IconMapPin size={24} />,
    label: "Office",
    value: "2360 Baron Road, Kelowna, BC V1X 6X4",
    href: "https://maps.app.goo.gl/XbtrPh9TsR5qCMjD6",
  },
];

const socials = [
  { icon: <IconBrandLinkedin size={22} />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <IconBrandGithub size={22} />, href: "https://github.com", label: "GitHub" },
  { icon: <IconBrandX size={22} />, href: "https://x.com", label: "X" },
];

const faqs = [
  {
    q: "Is Medify a replacement for a real doctor?",
    a: "No. Medify provides AI-powered healthcare guidance to help you understand symptoms and make informed decisions, but it does not replace a licensed medical professional. Always consult a doctor for diagnosis and treatment.",
  },
  {
    q: "How secure is my health data?",
    a: "All user data is stored under your authenticated account. Files are hosted on Cloudinary with access controls and your identity is managed by Clerk. We never sell your personal information.",
  },
  {
    q: "What file types can I upload?",
    a: "Medify supports PDF documents and common image formats (JPG, PNG). Our system uses OCR and PDF parsing to extract content automatically.",
  },
  {
    q: "How does the credit system work?",
    a: "Each consultation consumes a set number of credits. New accounts receive a starter credit allocation. You can view your balance in the Billing section of the dashboard.",
  },
  {
    q: "Can I export my consultation reports?",
    a: "Yes. Every AI-generated summary and consultation report can be downloaded as a formatted PDF directly from the Medical Records page.",
  },
];

export default function ContactPage() {
  const { user } = useUser();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    // Simulate async submission
    console.log("Form submitted:", form);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/medify_logo.png" alt="Logo" width={160} height={160} className="ml-4" />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <Link href="/about" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">About</Link>
          <Link href="/features" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Features</Link>
          <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold">Contact</Link>
        </div>
        {!user ? (
          <Link href="/sign-in">
            <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex gap-5 items-center">
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        )}
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 px-4">
          <div className="absolute inset-y-0 left-0 w-px bg-neutral-200/80 dark:bg-neutral-800/80">
            <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          </div>
          <div className="absolute inset-y-0 right-0 w-px bg-neutral-200/80 dark:bg-neutral-800/80">
            <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-200 mb-6 leading-tight">
              We'd love to hear from you
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Have a question about Medify, need help with your account, or want to explore a partnership? Our team is here to help — reach out and we'll respond within 24 hours.
            </p>
          </motion.div>
        </section>

        {/* Contact cards + form */}
        <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-900">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
                  Contact Information
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Reach us through any of the channels below. For general inquiries, the contact form is the fastest way to get a response.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {contactDetails.map((detail) => (
                  <a
                    key={detail.label}
                    href={detail.href}
                    target={detail.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors shrink-0">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 font-medium uppercase tracking-wide mb-0.5">
                        {detail.label}
                      </p>
                      <p className="text-neutral-700 dark:text-neutral-300 font-medium">{detail.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 font-medium">Follow us</p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-3 rounded-xl bg-white dark:bg-neutral-800 shadow-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 transform rounded-xl bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <IconSend size={18} />
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Quick answers to the questions we hear most often.
              </p>
            </motion.div>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  >
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">{faq.q}</span>
                    <span className="text-xl text-neutral-400 shrink-0">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
