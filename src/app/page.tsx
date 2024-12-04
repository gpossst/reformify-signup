"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { FaArrowRight, FaChevronDown, FaCheck } from "react-icons/fa";
import Head from "next/head";
import LaunchAnnouncement from "@/components/LaunchAnnouncement";

export default function Home() {
  const [init, setInit] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted || !email) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      particles: {
        color: {
          value: "#ef6461",
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
        number: {
          density: {
            enable: true,
            area: 1400,
          },
          value: 140,
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false,
          },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.03,
            opacity: 0.8,
          },
        },
      },
    }),
    []
  );

  return (
    <>
      <Head>
        <title>
          Reformify - Simple Form API for Developers | Easy Form Management
        </title>
        <meta
          name="description"
          content="Reformify provides a simple, affordable form API for developers. Create unlimited forms with all features included. Perfect for apps, feedback forms, and help requests."
        />
        <meta
          name="keywords"
          content="form api, form management, developer tools, web forms, api forms, simple forms"
        />
        <meta
          property="og:title"
          content="Reformify - Simple Form API for Developers"
        />
        <meta
          property="og:description"
          content="Create and manage forms easily with Reformify's simple API. Affordable pricing with all features included."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://utfs.io/f/STFL4gpOFkcntBKcL5dVbQDo8T7RmK6aH09S5z4fXAqCGNPB"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reformify - Simple Form API for Developers"
        />
        <meta
          name="twitter:description"
          content="Create and manage forms easily with Reformify's simple API. Affordable pricing with all features included."
        />
        <link rel="canonical" href="https://reformify.com" />
      </Head>
      <div className="w-full">
        {init && (
          <Particles
            id="tsparticles"
            className="fixed inset-0 pointer-events-none"
            options={{
              ...particlesOptions,
              particles: {
                ...particlesOptions.particles,
                // @ts-expect-error - particlesOptions is typed incorrectly
                move: {
                  ...particlesOptions.particles.move,
                  direction: "none",
                },
              },
            }}
          />
        )}
        <div className="flex flex-col items-center gap-8 font-merriweather justify-center min-h-screen px-4 sm:px-6 md:px-8">
          <LaunchAnnouncement />
          <img
            src="https://utfs.io/f/STFL4gpOFkcntBKcL5dVbQDo8T7RmK6aH09S5z4fXAqCGNPB"
            alt="Reformify Logo"
            className="w-12 sm:w-14 md:w-16 absolute top-4 sm:top-6 md:top-8 left-1/2 pt-12 -translate-x-1/2"
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-fredoka font-bold text-center leading-tight tracking-tight relative z-10 max-w-5xl">
            Make forms easy.
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex w-[90%] max-w-[500px] p-3 sm:p-4 rounded-xl items-center bg-foreground/90 backdrop-blur-sm z-50 border-accent border-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <input
              placeholder="Join the waitlist"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => {
                e.target.classList.add("placeholder-fade-out");
                setTimeout(() => {
                  e.target.placeholder = "Enter your email";
                  e.target.classList.remove("placeholder-fade-out");
                  e.target.classList.add("placeholder-fade-in");
                }, 200);
              }}
              onBlur={(e) => {
                e.target.classList.add("placeholder-fade-out");
                setTimeout(() => {
                  e.target.placeholder = "Join the Reformify waitlist";
                  e.target.classList.remove("placeholder-fade-out");
                  e.target.classList.add("placeholder-fade-in");
                }, 200);
              }}
              type="email"
              disabled={submitted}
              aria-label="Email signup for Reformify waitlist"
              className="flex-1 h-full text-lg sm:text-xl md:text-2xl font-merriweather-sans bg-transparent focus:outline-none text-foreground px-2 sm:px-3 md:px-4 cursor-text placeholder:text-background/70 placeholder-fade-in [&.placeholder-fade-out]:placeholder:opacity-0 [&.placeholder-fade-in]:placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-200 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={submitting || submitted || !email}
              className="p-2 sm:p-3 bg-accent rounded-lg text-lg sm:text-xl hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              aria-label="Submit email for waitlist"
            >
              {submitted ? <FaCheck /> : <FaArrowRight />}
            </button>
          </form>
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 animate-bounce cursor-pointer hover:text-accent transition-colors">
            <FaChevronDown
              className="text-2xl sm:text-3xl md:text-4xl"
              aria-label="Scroll down for more information"
            />
          </div>
        </div>
        <div className="w-full">
          <svg
            className="relative z-10 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            aria-hidden="true"
          >
            <path
              fill="var(--foreground)"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
          <div className="bg-[var(--foreground)] relative z-20 text-background">
            <div className="flex flex-col md:flex-row px-4 sm:px-6 md:px-24 py-12 sm:py-16 md:py-32 justify-between items-center max-w-7xl mx-auto gap-8 sm:gap-10 md:gap-12">
              <img
                src="https://utfs.io/f/STFL4gpOFkcnBmOh8X1RwMS74yxKeDvdaC08VYptEgrbcz6n"
                alt="Form API illustration showing simple integration"
                className="w-full md:w-[40%] object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col items-center md:items-end gap-4 sm:gap-5 md:gap-6 max-w-xl">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-fredoka font-bold leading-tight tracking-tight relative z-10 text-center md:text-right">
                  Simple, easy form API.
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl font-merriweather text-center md:text-right">
                  Send data to our backend using pre-made POST requests.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row px-4 sm:px-6 md:px-24 py-12 sm:py-16 md:py-32 justify-between items-center max-w-7xl mx-auto gap-8 sm:gap-10 md:gap-12">
              <div className="flex flex-col items-center md:items-start gap-4 sm:gap-5 md:gap-6 max-w-xl">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-fredoka font-bold leading-tight tracking-tight relative z-10 text-center md:text-left">
                  Full features, always.
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl font-merriweather text-center md:text-left">
                  We charge based on your form usage, nothing else. You&apos;ll
                  always have all features.
                </p>
              </div>
              <img
                src="https://utfs.io/f/STFL4gpOFkcnR7EEdf95aljqWn2NMKmBDXUcdJZArLsi86Ox"
                alt="Feature comparison showing all features included"
                className="w-full md:w-[40%] object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex px-4 sm:px-8 md:px-24 py-16 sm:py-24 md:py-32 justify-center items-center">
              <div className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8 max-w-4xl">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-fredoka font-bold leading-tight tracking-tight text-center relative z-10">
                  Why?
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl font-merriweather text-center leading-relaxed px-4">
                  Current form solutions are complex, expensive, and don&apos;t
                  lend themselves to very simple forms. We&apos;re here for the
                  ones developing apps, taking feedback, and responding to help
                  requests. The form shouldn&apos;t be your focus, your project
                  should!
                </p>
              </div>
            </div>
            <div className="flex px-4 sm:px-8 md:px-24 py-16 sm:py-24 md:py-32 justify-center items-center">
              <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 max-w-6xl w-full">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-fredoka font-bold leading-tight tracking-tight text-center relative z-10">
                  Pricing
                </h2>
                <div className="relative w-full flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-7 md:gap-8 px-4 sm:px-5 md:px-6">
                  <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 p-6 sm:p-7 md:p-8 bg-background text-foreground rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[500px]">
                    <h3 className="text-3xl sm:text-3xl md:text-4xl font-fredoka font-bold">
                      Free
                    </h3>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold">
                      $0
                    </div>
                    <ul className="flex flex-col gap-3 sm:gap-3 md:gap-4 text-lg sm:text-xl md:text-xl font-merriweather text-center">
                      <li>50 submissions</li>
                      <li>Unlimited forms</li>
                      <li>All features included</li>
                    </ul>
                  </div>
                  <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 flex flex-col items-center gap-3 sm:gap-3 md:gap-4 p-4 sm:p-5 md:p-6 bg-accent text-foreground rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[300px]">
                    <div className="text-2xl sm:text-2xl md:text-3xl font-fredoka font-bold">
                      +$5
                    </div>
                    <div className="text-lg sm:text-lg md:text-xl font-merriweather text-center">
                      per additional 1000 submissions
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8 py-16 sm:py-24 md:py-32">
              <h2 className="text-3xl sm:text-4xl md:text-8xl font-fredoka font-bold text-center px-4 md:px-12 leading-tight tracking-tight relative z-10 max-w-5xl">
                Ready to get started?
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex w-[90%] max-w-[500px] p-3 sm:p-4 rounded-xl items-center bg-background/90 backdrop-blur-sm z-50 border-accent border-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <input
                  placeholder="Join the waitlist"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => {
                    e.target.classList.add("placeholder-fade-out");
                    setTimeout(() => {
                      e.target.placeholder = "Enter your email";
                      e.target.classList.remove("placeholder-fade-out");
                      e.target.classList.add("placeholder-fade-in");
                    }, 200);
                  }}
                  onBlur={(e) => {
                    e.target.classList.add("placeholder-fade-out");
                    setTimeout(() => {
                      e.target.placeholder = "Join the Reformify waitlist";
                      e.target.classList.remove("placeholder-fade-out");
                      e.target.classList.add("placeholder-fade-in");
                    }, 200);
                  }}
                  type="email"
                  disabled={submitted}
                  aria-label="Email signup for Reformify waitlist"
                  className="flex-1 h-full text-lg sm:text-xl md:text-2xl font-merriweather-sans bg-transparent focus:outline-none text-background px-2 sm:px-3 md:px-4 cursor-text placeholder:text-background/70 placeholder-fade-in [&.placeholder-fade-out]:placeholder:opacity-0 [&.placeholder-fade-in]:placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-200 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={submitting || submitted || !email}
                  className="p-2 sm:p-3 bg-accent rounded-lg text-lg sm:text-xl hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  aria-label="Submit email for waitlist"
                >
                  {submitted ? <FaCheck /> : <FaArrowRight />}
                </button>
              </form>
            </div>
            <footer className="flex flex-col items-center gap-1 pb-6 sm:pb-7 md:pb-8 px-4">
              <a
                href="/legal"
                className="text-accent font-fredoka text-base sm:text-lg hover:underline"
              >
                Legal
              </a>
              <div className="text-center font-fredoka text-base sm:text-lg">
                This is a website by{" "}
                <a
                  href="https://garrett.one"
                  className="text-accent hover:underline"
                >
                  Garrett Post
                </a>
                .{" "}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
