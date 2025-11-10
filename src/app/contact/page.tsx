'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Try again later.');
      console.error(error);
    }
  };

  return (
    <section 
      id="contact-us"
      className="max-w-7xl mx-auto px-6 md:px-10 pt-5 md:pt-12 pb-20">
        <Toaster position="top-right" />

      {/* ===== HEADING ===== */}
      <div className="text-center mb-14">
        <div className="w-12 h-1 bg-[#F05A28] mx-auto mb-4 rounded-full"></div>
        <p className="text-[#F05A28] tracking-wide font-medium mb-2">
          We’d love to hear from you
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
          Stay Connected
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Have questions or need help? Our dedicated support team is ready to
          assist you! Reach out to us for prompt and friendly support.
        </p>
      </div>

      {/* ===== GRID SECTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* === LEFT: MAP + INFO === */}
        <div>
          {/* Google Map */}
          <div id="contact-location" className="w-full h-[350px] rounded-xl overflow-hidden shadow-md mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.553128562737!2d75.0587419!3d16.4981501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc733d74442dd73%3A0xc5dc809103745a69!2sJ.%20V.%20MANDAL&#39;S%20POLYTECHNIC%20TERDAL!5e0!3m2!1sen!2sin!4v1762674260000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Reach Us + Socials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-gray-700 pt-10">
            {/* Reach Us */}
            <div id="contact-address">
              <h3 className="font-semibold uppercase text-gray-900 mb-4 tracking-wide text-sm">
                Reach Us Through
              </h3>
              <p className="mb-3 flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-[#F05A28]" />
                J. V. MANDAL'S POLYTECHNIC,<br />
                Gurukul Garden Rd, Campus,<br />
                Terdal, Karnataka 587315
              </p>
              <p className="mb-3 flex items-center gap-2">
                <Phone size={16} className="text-[#F05A28]" />
                +91–831–2404040, 2404555
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-[#F05A28]" />
                jvmpolytechnic@gmail.com
              </p>
            </div>

            {/* Socials */}
            <div id="social-media">
              <h3 className="font-semibold uppercase text-gray-900 mb-4 tracking-wide text-sm">
                Social Networks
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#F05A28] transition"
                  >
                    <Facebook size={16} /> Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#F05A28] transition"
                  >
                    <Twitter size={16} /> Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#F05A28] transition"
                  >
                    <Instagram size={16} /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#F05A28] transition"
                  >
                    <Linkedin size={16} /> Linkedin
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* === RIGHT: CONTACT FORM === */}
        <div id="contact-form" className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h3 className="font-semibold text-lg mb-6">Send us a Message</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Your name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Your email
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Your message (optional)
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#F05A28] text-white px-6 py-2 rounded-lg hover:bg-[#d94d1f] transition w-full md:w-auto"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
