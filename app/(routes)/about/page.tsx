"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandLinkedin, IconHeartHandshake, IconShieldCheck, IconBulb, IconUsers } from "@tabler/icons-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Usama Zafar Ansari",
    position: "Chief Executive Officer",
    image: "/Usama_ProfilePic.png",
    linkedin: "https://linkedin.com/in/usama-zafar-ansari-906651192",
    description:
      "Leading AI innovation with 10+ years of software development experience. Passionate about merging technology and compassionate care.",
  },
  {
    name: "Alex Chen",
    position: "Head of AI Engineering",
    image: "/Team3.png",
    linkedin: "https://linkedin.com/in/alex-chen-ai",
    description:
      "Expert in machine learning and healthcare technology solutions. Architecting the AI backbone that powers every consultation.",
  },
  {
    name: "Dr. Maria Rodriguez",
    position: "VP of Product Strategy",
    image: "/Team2.jpg",
    linkedin: "https://linkedin.com/in/maria-rodriguez-healthtech",
    description:
      "Bridging the gap between clinical healthcare needs and cutting-edge technology solutions for patients worldwide.",
  },
];

const values = [
  {
    icon: <IconHeartHandshake size={32} />,
    title: "Patient-First",
    description:
      "Every decision we make starts with the patient. We design for real people navigating real health concerns.",
  },
  {
    icon: <IconShieldCheck size={32} />,
    title: "Privacy & Security",
    description:
      "Your health data is sacred. We use industry-standard encryption and never sell your personal information.",
  },
  {
    icon: <IconBulb size={32} />,
    title: "Continuous Innovation",
    description:
      "Healthcare never stands still, and neither do we. We ship meaningful improvements every sprint.",
  },
  {
    icon: <IconUsers size={32} />,
    title: "Inclusive Access",
    description:
      "Quality healthcare guidance should not be a privilege. Medify is built to be accessible to everyone, everywhere.",
  },
];

export default function AboutPage() {
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
          <Link href="/about" className="text-blue-600 dark:text-blue-400 font-semibold">About</Link>
          <Link href="/features" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Features</Link>
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
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-200 mb-6 leading-tight">
              Healthcare, reimagined for the AI era
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Medify was founded on a simple belief: every person deserves instant, intelligent, and compassionate healthcare guidance — no matter the hour or location. We combine the power of large language models, voice AI, and clinical insight to make that a reality.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
                Our Mission
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-4">
                To democratize access to quality healthcare information by building AI-powered medical voice agents that anyone can consult, anytime — delivering empathetic, accurate, and structured guidance at scale.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We believe that the first conversation about a health concern should be easy, private, and helpful. Medify fills the gap between symptom awareness and a formal doctor visit, reducing anxiety and enabling smarter decisions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/Medify1.png"
                alt="Medify platform preview"
                width={700}
                height={450}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Values */}
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
                What We Stand For
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                Our values guide every product decision, every line of code, and every conversation our AI agents have.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">{value.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                Meet the Team
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                The passionate experts behind Medify's AI-powered healthcare revolution
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative mb-6 w-[180px] h-[180px] mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-2 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={176}
                      height={176}
                      className="rounded-2xl object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-1">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3">{member.position}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">{member.description}</p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                      <IconBrandLinkedin size={20} />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                  </div>
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
              Ready to experience Medify?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg mx-auto">
              Join thousands of users getting smarter, faster healthcare guidance every day.
            </p>
            <Link href="/sign-up">
              <button className="transform rounded-lg bg-black px-8 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Get Started Free
              </button>
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
