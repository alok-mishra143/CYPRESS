"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../../public/cypresslogo.svg";
import { motion } from "framer-motion";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Header = () => {
  const [Yvalue, setYvalue] = useState(0);
  const [path, setPath] = useState("#products");

  useEffect(() => {
    const handleScroll = () => {
      setYvalue(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "#",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "#",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "#",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "#",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "#",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "#",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  return (
    <nav className="max-w-7xl fixed top-4 mx-auto inset-x-0 z-50 w-[95%] lg:w-full">
      <div className=" lg:block w-full ">
        <motion.div
          animate={{
            width: Yvalue > 100 ? "80%" : "100%",
            backgroundColor: Yvalue > 100 ? "#130b16e1 " : "transparent",
          }}
          transition={{
            duration: 0.4,
          }}
          className={`flex relative justify-between  items-center px-4 py-3 rounded-full mx-auto backdrop-blur-3xl bg-[#130b16e1] `}
        >
          <div className="flex flex-row gap-2 items-center">
            <Link
              className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20 "
              href="/"
            >
              <Image src={Logo} alt="Cypress Logo" width={25} height={25} />
              <span className="text-white font-bold">Cypress</span>
            </Link>
            <div className="">
              <NavigationMenu className="hidden md:block ">
                <NavigationMenuList className="gap-2">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      onClick={() => setPath("#resources")}
                      className={cn(
                        {
                          "dark:text-white": path === "#resources",
                          "dark:text-white/70": path !== "#resources",
                          "font-normal": true,
                          "text-lg": true,
                        },
                        "bg-transparent"
                      )}
                    >
                      Introduction
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        className="grid
                gap-3
                p-6
                md:w-[400px]
                ld:w-[500px]
                lg:grid-cols-[.75fr_1fr]
                bg-[#030014ba]
                "
                      >
                        <li className="row-span-3 flex items-center justify-center">
                          <span
                            className=" flex items-center justify-center text-xl font-semibold 
                  "
                          >
                            Welcome
                          </span>
                        </li>
                        <ListItem href="#" title="who are we">
                          mordern collobrative document editor
                        </ListItem>
                        <ListItem href="#" title="why to choose us">
                          Advance UI and AI features
                        </ListItem>
                        <ListItem href="#" title="some extra information">
                          We are the best in the market
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={() => setPath("#Feature")}
                      href="#Feature"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        {
                          "dark:text-white bg-black": path === "#testimonials",
                          "dark:text-white/70": path !== "#testimonials",
                          "font-normal": true,
                          "text-lg": true,
                        },
                        "bg-transparent cursor-pointer"
                      )}
                    >
                      Feature
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={() => setPath("#testimonials")}
                      href="#testimonials"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        {
                          "dark:text-white bg-black": path === "#testimonials",
                          "dark:text-white/70": path !== "#testimonials",
                          "font-normal": true,
                          "text-lg": true,
                        },
                        "bg-transparent cursor-pointer"
                      )}
                    >
                      Testimonial
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <Link
              className="group hover:-translate-y-0.5 active:scale-[0.98] relative z-10 bg-transparent hover:border-secondary hover:bg-blue-500 border border-transparent text-white text-sm md:text-sm transition font-medium duration-200 rounded-md px-4 py-2 sm:flex items-center justify-center underline hidden "
              href="/signup"
            >
              Sign-up
            </Link>

            <Link href={"/login"}>
              <Button className="group hover:-translate-y-0.5 active:scale-[0.98] bg-secondary relative z-10  border border-secondary text-white  text-sm md:text-sm transition font-medium duration-200 rounded-md px-4 py-2 flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF60_inset,_0px_1px_0px_0px_#FFFFFF60_inset] bg-blue-700 hover:bg-blue-600">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
