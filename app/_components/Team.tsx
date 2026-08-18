"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IconBrandLinkedin } from "@tabler/icons-react";

export function Team() {
  const teamMembers = [
    {
      name: "Usama Zafar Ansari",
      position: "Chief Executive Officer",
      image: "/Usama_ProfilePic.png",
      linkedin: "https://linkedin.com/in/usama-zafar-ansari-906651192",
      description: "Leading AI innovation with 10+ years of software development experience"
    },
    {
      name: "Alex Chen",
      position: "Head of AI Engineering",
      image: "/Team3.png", 
      linkedin: "https://linkedin.com/in/alex-chen-ai",
      description: "Expert in machine learning and healthcare technology solutions"
    },
    {
      name: "Dr. Maria Rodriguez",
      position: "VP of Product Strategy",
      image: "/Team2.jpg",
      linkedin: "https://linkedin.com/in/maria-rodriguez-healthtech",
      description: "Bridging the gap between healthcare needs and technology solutions"
    }
  ];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            The passionate experts behind Medify's AI-powered healthcare revolution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative mb-6 w-[200px] h-[200px] flex items-center justify-center mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-2 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={192}
                  height={192}
                  className="rounded-2xl object-cover w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {member.position}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {member.description}
                </p>
                
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
  );
}
