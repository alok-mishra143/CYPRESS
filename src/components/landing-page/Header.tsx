"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/cypresslogo.svg";

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
import { HoverBorderGradient } from "../accUi/hoverborderButton";

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
  const [path, setPath] = useState("#products");
  return (
    <>
      <header
        className="p-5
      flex
      justify-center
      items-center
      z-50
      fixed
     sm:jusitfy-between
     w-full
      -mt-10
      bg-primary/30
      backdrop-blur-md  
     
      
      

  "
      >
        <Link
          href={"/"}
          className="w-full flex gap-2
        justify-left items-center"
        >
          <Image src={Logo} alt="Cypress Logo" width={25} height={25} />
          <span
            className="font-semibold
          dark:text-white
        "
          >
            Cypress.
          </span>
        </Link>
        <NavigationMenu className="hidden md:block ">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuTrigger
                onClick={() => setPath("#resources")}
                className={cn(
                  {
                    "dark:text-white": path === "#resources",
                    "dark:text-white/70": path !== "#resources",
                    "font-normal": true,
                    "text-xl": true,
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
              <NavigationMenuTrigger
                className={cn(
                  {
                    "dark:text-white bg-black": path === "#pricing",
                    "dark:text-white/70": path !== "#pricing",
                    "font-normal": true,
                    "text-xl": true,
                  },
                  "bg-transparent"
                )}
              >
                Pricing
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4  md:grid-row-2  ">
                  <ListItem title="Pro Plan" href={"#"}>
                    Unlock full power with collaboration.
                  </ListItem>
                  <ListItem title={"free Plan"} href={"#"}>
                    Great for teams just starting out.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuContent>
                <ul
                  className="grid w-[400px]
              gap-3
              p-4
              md:w-[500px]
              md:grid-cols-2 
              lg:w-[600px]
              "
                >
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
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
                    "text-xl": true,
                  },
                  "bg-transparent cursor-pointer"
                )}
              >
                Testimonial
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <aside
          className="flex
        w-full
        gap-2
        justify-end
      "
        >
          <Link href={"/login"}>
            {/* <Button variant="btn-secondary" className=" p-1 hidden sm:block">
              Login
            </Button> */}

            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>Login {"  >"}</span>
            </HoverBorderGradient>
          </Link>
        </aside>
      </header>
    </>
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
            "group block select-none space-y-1 font-medium leading-none"
          )}
          {...props}
        >
          <div className="text-white text-sm font-medium leading-none">
            {title}
          </div>
          <p
            className="group-hover:text-white/70
            line-clamp-2
            text-sm
            leading-snug
            text-white/40
          "
          >
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
