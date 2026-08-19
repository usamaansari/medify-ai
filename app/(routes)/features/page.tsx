"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  IconMicrophone,
  IconFileAnalytics,
  IconBrain,
  IconHistory,
  IconShieldLock,
  IconDownload,
  IconStethoscope,
  IconCoin,
  IconCheck,
} from "@tabler/icons-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <IconMicrophone size={36} />,
    title: "AI Voice Consultations",
    description:
      "Speak naturally with an AI doctor agent powered by Vapi and OpenAI. Describe your symptoms, get follow-up questions, and receive a structured consultation — just like a real appointment.",
    badge: "Core Feature",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  {
    icon: <IconFileAnalytics size={36} />,
    title: "Medical Record Uploads",
    description:
      "Upload PDFs or images of your medical documents. Medify extracts the content via OCR and PDF parsing, stores it securely, and makes it instantly searchable in your dashboard.",
    badge: "Upload",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  },
  {
    icon: <IconBrain size={36} />,
    title: "AI-Powered Summaries",
    description:
      "Every uploaded record is automatically summarized by GPT. Get a clear, structured breakdown of diagnoses, medications, and recommendations — without wading through medical jargon.",
    badge: "AI",
    badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  },
  {
    icon: <IconHistory size={36} />,
    title: "Full Consultation History",
    description:
      "Every session is saved. Browse past consultations, re-read AI-generated reports, and track how your symptoms have evolved over time — all from one organized timeline.",
    badge: "History",
    badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
  {
    icon: <IconStethoscope size={36} />,
    title: "Specialist Suggestions",
    description:
      "After each consultation, Medify uses AI to recommend the most relevant medical specialist for your condition — helping you take the right next step toward proper care.",
    badge: "Smart",
    badgeColor: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  },
  {
    icon: <IconDownload size={36} />,
    title: "PDF Export",
    description:
      "Download any AI-generated summary as a beautifully formatted PDF report. Share it with your doctor, store it for records, or print it for offline reference.",
    badge: "Export",
    badgeColor: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  },
  {
    icon: <IconShieldLock size={36} />,
    title: "Secure & Private",
    description:
      "Your health data belongs to you. All records are stored under your authenticated account, files are hosted on Cloudinary with signed access, and your identity is protected by Clerk.",
    badge: "Security",
    badgeColor: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  },
  {
    icon: <IconCoin size={36} />,
    title: "Credit-Based Usage",
    description:
      "Use Medify at your own pace with a transparent credit system. Start with free credits and top up only when you need more consultations — no surprise charges.",
    badge: "Billing",
    badgeColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  },
];

const highlights = [
  "Available 24 / 7 — no waiting rooms",
  "Voice-first, hands-free consultations",
  "Supports PDF and image medical documents",
  "AI summaries in seconds, not hours",
  "Specialist referral guidance built-in",
  "One-click PDF export of every report",
  "End-to-end authenticated data storage",
  "Transparent credit-based pricing",
];

export default function FeaturesPage() {
  const { user } = useUser();

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
          <Link href="/features" className="text-blue-600 dark:text-blue-400 font-semibold">Features</Link>
          <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Contact</Link>
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
              Platform Features
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-200 mb-6 leading-tight">
              Everything you need for smarter healthcare
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              From AI-powered voice consultations to intelligent document analysis, Medify brings together the tools that put your health data to work for you.
            </p>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${feature.badgeColor}`}>
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">{feature.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Highlights strip */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                Built to be the best
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                A quick look at what sets Medify apart from generic health information sites.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white dark:bg-neutral-800 rounded-xl px-5 py-4 shadow-sm border border-neutral-100 dark:border-neutral-700"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <IconCheck size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                How it works
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                A simple three-step process to get from concern to clarity.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Sign in & choose a doctor",
                  desc: "Create an account, pick an AI specialist that matches your concern — general practitioner, cardiologist, neurologist, and more.",
                },
                {
                  step: "02",
                  title: "Consult via voice or upload",
                  desc: "Start a live voice session or upload existing medical documents. Medify handles the rest — transcription, OCR, parsing, and AI analysis.",
                },
                {
                  step: "03",
                  title: "Get your report",
                  desc: "Receive a structured AI-generated report with findings, recommendations, and suggested next steps — ready to download as PDF.",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-md"
                >
                  <span className="text-7xl font-black text-neutral-100 dark:text-neutral-700 absolute top-4 right-6 select-none">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-3 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed relative z-10">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Start your first consultation today
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg mx-auto">
              No credit card required to get started. Sign up in seconds and explore everything Medify has to offer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/sign-up">
                <button className="transform rounded-lg bg-black px-8 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Get Started Free
                </button>
              </Link>
              <Link href="/contact">
                <button className="transform rounded-lg border border-neutral-300 dark:border-neutral-700 px-8 py-3 font-medium text-neutral-700 dark:text-neutral-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-500">
                  Contact Sales
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
