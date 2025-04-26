"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import "./../index.css";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import useMetadata from "../Hooks/Meta";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Send the form data to the Express server
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitError(
        "There was an error submitting your form. Please try again."
      );
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  useDocumentTitle("Contact");

  const metadata = useMetadata({
    title: "Contact",
    description:
      "Get in touch with Sean Blackwell for web development projects, freelance work, or collaboration opportunities.",
    keywords:
      "contact Sean Blackwell, hire web developer, freelance web development, react developer contact",
    ogTitle: "Contact Sean Blackwell - Let's Build Something Beautiful",
    ogDescription:
      "Get in touch with me to discuss your web development needs and how we can work together",
    ogImage: "https://sean-blackwell.com/assets/cartoonIcon.svg",
    ogUrl: "https://sean-blackwell.com/contact",
    canonicalUrl: "https://sean-blackwell.com/contact",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Sean Blackwell",
      description: "Contact page for Sean Blackwell, front-end developer",
      url: "https://sean-blackwell.com/contact",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-816-808-1513",
        email: "bwellsean@gmail.com",
        contactType: "customer service",
      },
    },
  });

  return (
    <>
      {metadata}
      <section
        id="contact"
        className="py-16 md:py-24 bg-[var(--c-emerald)] w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 text-[var(--c-cream)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Say Hello!</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Lets build something beautiful
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-[var(--c-font-light)] mb-6">
                Talk to me! I'm just a chill guy.
              </h3>

              {submitSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <p>
                    Thank you for your message! We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="text-[var(--c-font-light)] dark:[var(--c-font-light)]"
                >
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-font-accent)]"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-[var(--c-font-light)] font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-font-accent)]
                    required"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-[var(--c-font-light)] font-medium mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-font-accent)]"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-[var(--c-font-light)] font-medium mb-2"
                    >
                      What do you want to build? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-font-accent)]"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[var(--c-green)] text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-[var(--c-font-accent)] hover:text-[var(--c-font-light)] cursor-pointer hover:transtransition-colors hover:animate-bounce hover:duration-300 w-full flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:ease-in-out"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>

                  {submitError && (
                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      <p>{submitError}</p>
                    </div>
                  )}
                </form>
              )}
            </div>

            <div>
              <div className="bg-[var(--c-green)] text-white rounded-lg shadow-md p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <a href="tel:8168081513">
                    <div className="flex items-start mt-2">
                      <Phone className="h-6 w-6 mr-4 mt-1" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-blue-100">(816)808-1513</p>
                      </div>
                    </div>
                  </a>
                  <div className="flex items-start mt-2">
                    <Mail className="h-6 w-6 mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-blue-100">
                        <a href="mailto:bwellsean@gmail.com">
                          bwellsean@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
