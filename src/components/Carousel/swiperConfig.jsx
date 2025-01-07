import intro1 from "../../assets/introImages/intro-1.svg";
import intro2 from "../../assets/introImages/intro-2.svg";
import intro3 from "../../assets/introImages/intro-3.svg";
import intro4 from "../../assets/introImages/intro-4.svg";
import intro5 from "../../assets/introImages/intro-5.svg";

export const introSlides = [
  {
    img: intro1,
    title: "Welcome",
    desc: "Explore Happy Insights to effortlessly manage your channels using AI. It helps you analyze comments, likes, and feedback (positive or negative) while automating short replies for better engagement",
  },
  {
    img: intro2,
    title: "Connect Your Social Media Accounts",
    desc: "Seamlessly link your social media platforms to centralize all activity and get ready to manage them from a single dashboard.",
  },
  {
    img: intro3,
    title: "Explore Al-Powered Sentiment Dashboards",
    desc: "Discover Al-generated insights that categorize comments by sentiment (positive, neutral, or negative) for better understanding and strategy.",
  },
  {
    img: intro4,
    title: "Manage Engagement Effortlessly",
    desc: "Filter, review, and respond to comments directly from the dashboard, ensuring efficient and personalized interactions with your audience.",
  },
  {
    img: intro5,
    title: "Gain Insights & Improve Performance",
    desc: "Monitor likes, feedback trends, and overall engagement metrics in real-time to optimize your social media strategy.",
  },
];

export const DashBoardHeaderLeftSlides = [
  {
    img: "/public/illustrators/dashboard-carousel-img-1.svg",
    title: "Channel Management",
    desc: "Effortlessly manage video comments across your channels, including all positive and negative feedback.",
    btnText: "Configure Now",
    btnWidth: "40%", // Define the button width for this slide
  },
  {
    img: "/public/illustrators/dashboard-carousel-img-2.svg",
    title: "Comment Control Hub",
    desc: "Upgrade to effortlessly manage video comments, gain insights, and handle both positive and negative feedback.",
    btnText: "Upgrade To Pro",
    btnWidth: "50%", // Define a different width for this slide
  },
  {
    img: "/public/illustrators/dashboard-carousel-img-3.svg",
    title: "AI Insights: Video Engagement Analysis",
    desc: "Effortlessly manage video comments across your channels, including all positive and negative feedback.",
    btnText: "Explore Now",
    btnWidth: "35%", // Another width value for this slide
  },
];

export const introConfig = {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: `.customNextBtn`, // Reference to the custom next button
    prevEl: `.customPrevBtn`, // Reference to the custom prev button
  },
  pagination: {
    el: `.customPagination`, // Reference to the custom pagination container
    clickable: true,
  },
};

export const DashBoardHeaderLeftConfig = {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: `.customNextBtn`, // Reference to the custom next button
    prevEl: `.customPrevBtn`, // Reference to the custom prev button
  },
  pagination: {
    el: `.customPagination`, // Reference to the custom pagination container
    clickable: true,
  },
  autoplay: {
    delay: 3000, // Time in milliseconds before switching slides
    disableOnInteraction: false, // Keep autoplay running even after user interaction
  },
};
