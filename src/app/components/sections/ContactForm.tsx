"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", question: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: wire this up to a real backend endpoint once we add a
    // contact/inquiries table — for now this just simulates a submission.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", phone: "", question: "" });
  };

  return (
    <section className="px-4 md:px-8 mt-20">
      <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-foreground">
        Any Questions?
      </h2>

      <div className="mt-8 flex flex-col md:flex-row gap-10">
        <form onSubmit={handleSubmit} className="flex-1 max-w-md space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-muted rounded-full px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your telephone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-muted rounded-full px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
          <textarea
            name="question"
            placeholder="Your question"
            value={formData.question}
            onChange={handleChange}
            required
            rows={5}
            className="w-full bg-transparent border border-muted rounded-3xl px-5 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent-blue text-foreground font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>

          {isSubmitted && (
            <p className="text-accent-orange text-sm">
              Thanks — we'll get back to you shortly.
            </p>
          )}
        </form>

        <div className="flex-1 flex flex-col justify-between">
          <p className="text-muted leading-relaxed max-w-sm">
            Write to us and we will be sure to answer all your questions and
            give you a comprehensive consultation.
          </p>

          <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden self-end mt-8">
            
          </div>
        </div>
      </div>
    </section>
  );
}