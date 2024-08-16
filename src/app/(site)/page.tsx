"use client";

import TitleSection from "@/components/landing-page/TitleSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import Banner from "../../../public/home.png";
import Calendar from "../../../public/Feature.png";
import { motion, useAnimation, useInView } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import {
  CLIENTS,
  PRICING_CARDS,
  PRICING_PLANS,
  reviews,
} from "@/lib/constants";

import { TracingBeam } from "@/components/accUi/tracing-beam";
import Link from "next/link";
import Marquee from "@/components/accUi/marquee";
import { ReviewCard } from "@/components/accUi/reviewcard";
import ShineBorder from "@/components/accUi/shineBorder";
import Footer from "@/components/accUi/footer";
import { CustomGlobe } from "@/components/accUi/globe";
import CypressIntro from "@/components/accUi/CypressIntro";

const Home = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref);
  const [showContent, setShowContent] = useState(false);

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cypressVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      {!showContent && <CypressIntro />}
      {showContent && (
        <TracingBeam className="px-8">
          <section className="gap-4 px-4 mt-10 overflow-hidden sm:px-6 sm:flex sm:flex-col md:justify-center md:items-center -z-1 w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="mt-24"
            >
              <TitleSection
                pill="✨ Your Workspace, Perfected"
                title="All-In-One Collaboration and Productivity Platform"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
            >
              <Link href="/signup">
                <Button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-3xl border border-slate-800 bg-[linear-gradient(110deg,#000103 35%,#1b2735 50%,#1e2631 65%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 cursor-pointer mb-14">
                  Get Cypress Free
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="md:mt-[-40px] sm:w-full max-w-[90%] flex justify-center items-center mt-[-40px] relative sm:ml-0 ml-[-10px] -z-1"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
            >
              <div className="w-[50%] blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-22" />

              <ShineBorder
                className="-z-10"
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              >
                <Image
                  src={Banner}
                  alt="Application Banner"
                  className="-z-1 "
                />
              </ShineBorder>
              <div className="bottom-0 top-[40%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-1"></div>
            </motion.div>
          </section>

          <section className="relative">
            <motion.div
              className="overflow-hidden flex after:content[''] after:dark:from-brand-dark after:to-transparent after:from-background after:bg-gradient-to-l after:right-0 after:bottom-0 after:top-0 after:w-20 after:z-10 after:absolute before:content[''] before:dark:from-brand-dark before:to-transparent before:from-background before:bg-gradient-to-r before:left-0 before:top-0 before:bottom-0 before:w-20 before:absolute before:z-10"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
            >
              {[...Array(2)].map((arr) => (
                <div key={uuidv4()} className="flex flex-nowrap animate-slide">
                  {CLIENTS.map((client) => (
                    <div
                      key={client.alt}
                      className="relative w-[200px] m-20 shrink-0 flex items-center"
                    >
                      <Image
                        src={client.logo}
                        alt={client.alt}
                        width={200}
                        className="object-contain max-w-none"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </section>

          <section className="px-4 sm:px-6 flex justify-center items-center flex-col">
            <div className="w-[30%] blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-22" />
            <motion.div
              id="Feature"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
            >
              <TitleSection
                title="Chat with AI Assistant"
                subheading="A private and secure chat with your AI assistant to help you with your daily tasks"
                pill="Features"
              />
            </motion.div>
            <motion.div
              className="mt-10 w-full max-w-6xl flex justify-center items-center relative rounded-2xl border-8 border-washed-purple-300 border-opacity-10"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
            >
              <Image
                src={Calendar}
                alt="Banner"
                className="object-cover rounded-2xl"

                // Adjust size as needed for mobile responsiveness
              />
            </motion.div>
          </section>

          <section className="flex flex-col-reverse md:flex-row justify-between items-center mt-10 px-4 md:px-8 lg:px-16">
            <motion.div
              className="flex items-center justify-start flex-col md:items-start md:text-left text-center mb-8 md:mb-0"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Access your documents anywhere in the World
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl text-gray-600">
                Easily manage, organize, and access all your documents with our
                powerful and intuitive Workspace.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
            >
              <CustomGlobe className="h-[200px] md:h-[300px] w-[200px] md:w-[300px] transform md:translate-x-1/2" />
            </motion.div>
          </section>

          <section className="relative ">
            <div className="w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/20 -z-10 top-56 mt-10" />
            <motion.div
              className="mt-20 px-4 sm:px-6 flex flex-col overflow-x-hidden overflow-visible"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
            >
              <TitleSection
                title="Trusted by All"
                subheading="Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs"
                pill="Testimonials"
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                viewport={{ once: true }}
              >
                <Marquee
                  pauseOnHover
                  className="[--duration:30s]"
                  id="testimonials"
                >
                  {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                  {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
              </motion.div>

              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </motion.div>
          </section>

          <section className="mt-20 px-4 sm:px-6 py-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
            >
              <Footer />
            </motion.div>
          </section>
        </TracingBeam>
      )}
    </>
  );
};

export default Home;
