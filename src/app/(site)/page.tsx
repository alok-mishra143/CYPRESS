import TitleSection from "@/components/landing-page/TitleSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

import Banner from "../../../public/home.png";
import Calendar from "../../../public/cal.png";

import {
  CLIENTS,
  PRICING_CARDS,
  PRICING_PLANS,
  reviews,
} from "@/lib/constants";
import { randomUUID } from "crypto";
import CustomCard from "@/components/landing-page/CustomCard";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TracingBeam } from "@/components/accUi/tracing-beam";
import Link from "next/link";
import Marquee from "@/components/accUi/marquee";
import { ReviewCard } from "@/components/accUi/reviewcard";
import ShineBorder from "@/components/accUi/shineBorder";
import Footer from "@/components/accUi/footer";

const Home = () => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <>
      <TracingBeam className="px-8">
        <section className="gap-4 px-4 mt-10 overflow-hidden sm:px-6 sm:flex sm:flex-col md:justify-center md:items-center -z-1 w-full">
          <div className="mt-24">
            <TitleSection
              pill="✨ Your Workspace, Perfected"
              title="All-In-One Collaboration and Productivity Platform"
            />
          </div>

          <Link href="/signup">
            <Button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-3xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 cursor-pointer mb-14">
              Get Cypress Free
            </Button>
          </Link>

          <div className="md:mt-[-40px] sm:w-full max-w-[750px] flex justify-center items-center mt-[-40px] relative sm:ml-0 ml-[-10px] -z-1 ">
            <ShineBorder className="" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
              <Image src={Banner} alt="Application Banner" className="-z-1 " />
            </ShineBorder>
            <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-1"></div>
          </div>
        </section>

        <section className="relative">
          <div className="overflow-hidden flex after:content[''] after:dark:from-brand-dark after:to-transparent after:from-background after:bg-gradient-to-l after:right-0 after:bottom-0 after:top-0 after:w-20 after:z-10 after:absolute before:content[''] before:dark:from-brand-dark before:to-transparent before:from-background before:bg-gradient-to-r before:left-0 before:top-0 before:bottom-0 before:w-20 before:absolute before:z-10 ">
            {[...Array(2)].map((arr) => (
              <div
                key={randomUUID()}
                className="flex flex-nowrap animate-slide"
              >
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
          </div>
        </section>
        <section className="px-4 sm:px-6 flex justify-center items-center flex-col">
          <div className="w-[30%] blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-22" />
          <TitleSection
            title="Keep track of your meetings all in one place"
            subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner"
            pill="Features"
          />
          <div className="mt-10 max-w-[450px] flex justify-center items-center relative sm:ml-0 rounded-2xl border-8 border-washed-purple-300 border-opacity-10">
            <Image src={Calendar} alt="Banner" className="rounded-2xl" />
          </div>
        </section>

        <section className="relative">
          <div className="w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/20 -z-10 top-56" />
          <div className="mt-20 px-4 sm:px-6 flex flex-col overflow-x-hidden overflow-visible">
            <TitleSection
              title="Trusted by All"
              subheading="Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs"
              pill="Testimonials"
            />

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

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </section>

        <section className="mt-20 px-4 sm:px-6 py-4">
          <Footer />
        </section>
      </TracingBeam>
    </>
  );
};

export default Home;
