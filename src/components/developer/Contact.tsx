"use client";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  const { elementRef, isVisible } = useScrollReveal();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="mx-auto flex flex-col items-center justify-center gap-10 py-0 px-4 max-w-7xl"
      id="contact"
    >
      <div className="text-center space-y-4">
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
        >
          Establish <span className="text-green-500">Connection</span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-400 font-mono text-sm max-w-lg mx-auto mb-10 leading-relaxed"
        >
          &gt; Ready to start a new session? Initialize a handshake below and I&apos;ll respond with an ACK as soon as possible.
        </motion.p>
      </div>

      <motion.div
        variants={itemVariants}
        className="w-full flex justify-center"
      >
        <ContactForm />
      </motion.div>
    </motion.div>
  );
}
