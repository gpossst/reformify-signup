"use client";

import Head from "next/head";
import Link from "next/link";

export default function Legal() {
  return (
    <>
      <Head>
        <title>Legal - Reformify</title>
        <meta
          name="description"
          content="Legal information and privacy policy for Reformify's form management service."
        />
      </Head>
      <div className="min-h-screen py-16 px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-block mb-8 text-accent hover:underline font-fredoka"
          >
            <img
              src="https://utfs.io/f/STFL4gpOFkcntBKcL5dVbQDo8T7RmK6aH09S5z4fXAqCGNPB"
              alt="Reformify Logo"
              className="w-16 absolute top-8 left-1/2 -translate-x-1/2"
            />
          </Link>

          <h1 className="text-5xl pt-12 font-fredoka font-bold mb-12">
            Legal & Privacy
          </h1>

          <section className="mb-12">
            <h2 className="text-3xl font-fredoka font-bold mb-6">
              Privacy Policy
            </h2>
            <div className="space-y-6 font-merriweather-sans">
              <p>
                At Reformify, we take your privacy seriously. This policy
                outlines how we handle your personal information.
              </p>

              <h3 className="text-xl font-fredoka font-bold mt-8 mb-4">
                Data Collection & Usage
              </h3>
              <p>
                We collect only essential information needed to provide our
                service, primarily your email address for account management and
                communications. We also use Vercel Analytics to track the number
                of visitors to our site - this data is anonymous and used solely
                for understanding site traffic.
              </p>

              <h3 className="text-xl font-fredoka font-bold mt-8 mb-4">
                Data Sharing
              </h3>
              <p>
                We do not share, sell, or distribute your personal information
                to third parties. The only exceptions are our use of SendGrid
                for email communications, which requires your email address to
                deliver important service updates and notifications, and Vercel
                Analytics for anonymous visitor counting.
              </p>

              <h3 className="text-xl font-fredoka font-bold mt-8 mb-4">
                Data Security
              </h3>
              <p>
                We implement appropriate security measures to protect your
                information from unauthorized access, alteration, or disclosure.
              </p>

              <h3 className="text-xl font-fredoka font-bold mt-8 mb-4">
                Contact
              </h3>
              <p>
                If you have any questions about our privacy practices, please
                contact us through our website.
              </p>
            </div>
          </section>

          <footer className="text-sm text-foreground/70 font-merriweather-sans">
            Last updated: {new Date().toLocaleDateString()}
          </footer>
        </div>
      </div>
    </>
  );
}
