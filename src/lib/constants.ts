import client1 from "../../public/client1.png";
import client2 from "../../public/client2.png";
import client3 from "../../public/client3.png";
import client4 from "../../public/client4.png";
import client5 from "../../public/client5.png";

export const CLIENTS = [
  { alt: "client1", logo: client1 },
  { alt: "client2", logo: client2 },
  { alt: "client3", logo: client3 },
  { alt: "client4", logo: client4 },
  { alt: "client5", logo: client5 },
];

export const reviews = [
  {
    name: "Alok",
    username: "@alok☑️",
    body: "Cypress has been a game-changer for our team. With its reliable end-to-end testing, we catch bugs early, leading to faster development cycles and improved collaboration.",
    img: "https://avatar.vercel.sh/alice",
  },
  {
    name: "Ajit",
    username: "@ajit",
    body: "I used to spend hours debugging frontend issues, but Cypress simplified everything. Now, I'm more productive, and my colleagues can trust our code thanks to Cypress.",
    img: "https://avatar.vercel.sh/bob",
  },
  {
    name: "Rakesh",
    username: "@rakesh",
    body: "Cypress has transformed the way we work. Our QA and development teams are on the same page, and our productivity has skyrocketed. It's a must-have tool.",
    img: "https://avatar.vercel.sh/charlie",
  },
  {
    name: "David",
    username: "@david",
    body: "I was skeptical at first, but Cypress exceeded my expectations. Our project timelines have improved, and collaboration between teams is seamless.",
    img: "https://avatar.vercel.sh/david",
  },
  {
    name: "Ella",
    username: "@ella",
    body: "Cypress made writing and running tests a breeze. Our team's productivity has never been higher, and we're delivering more reliable software.",
    img: "https://avatar.vercel.sh/ella",
  },
  {
    name: "Frank",
    username: "@frank",
    body: "Thanks to Cypress, we've eliminated testing bottlenecks. Our developers and testers collaborate effortlessly, resulting in quicker releases.",
    img: "https://avatar.vercel.sh/frank",
  },
  {
    name: "Grace",
    username: "@grace",
    body: "Cypress has improved our development process significantly. We now have more time for innovation, and our products are of higher quality.",
    img: "https://avatar.vercel.sh/grace",
  },
];

export const PRICING_CARDS = [
  {
    planType: "Free Plan",
    price: "0",
    description: "Limited block trials  for teams",
    highlightFeature: "",
    freatures: [
      "Unlimited blocks for teams",
      "Unlimited file uploads",
      "30 day page history",
      "Invite 5 guests",
    ],
  },
  {
    planType: "Pro Plan",
    price: "11.99",
    description: "Billed annually. $17 billed monthly",
    highlightFeature: "Everything in free +",
    freatures: [
      "Unlimited blocks for teams",
      "Unlimited file uploads",
      "1 year day page history",
      "Invite 10 guests",
    ],
  },
];

export const PRICING_PLANS = { proplan: "Pro Plan", freeplan: "Free Plan" };

export const MAX_FOLDERS_FREE_PLAN = 10;
