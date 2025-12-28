import HomeWithFAQ from "./components/HomeWithFAQ";
import WhatWithInteraction from "./components/WhatWithInteraction";
import WhyWithInteraction from "./components/WhyWithInteraction";
import WhoWithInteraction from "./components/WhoWithInteraction";
import PricingWithInteraction from "./components/PricingWithInteraction";
import "./styles/globals.css";
import "./styles/responsive.css";
import "./styles/components-responsive.css";
import { useEffect, useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "what" | "why" | "who" | "pricing"
  >("home");
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive scaling for smaller screens
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const designWidth = 1440;

      if (viewportWidth <= 768) {
        setIsMobile(true);
        setScale(1);
      } else {
        setIsMobile(false);
        if (viewportWidth < designWidth) {
          setScale(viewportWidth / designWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Listen for navigation clicks
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const linkText = target.textContent?.toLowerCase().trim();

      if (linkText === "what") {
        setCurrentPage("what");
        window.scrollTo(0, 0);
      } else if (linkText === "why") {
        setCurrentPage("why");
        window.scrollTo(0, 0);
      } else if (linkText === "who") {
        setCurrentPage("who");
        window.scrollTo(0, 0);
      } else if (linkText === "numbers") {
        setCurrentPage("pricing");
        window.scrollTo(0, 0);
      } else if (linkText === "home" || target.closest('[data-name*="logo"]')) {
        setCurrentPage("home");
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener("click", handleNavClick);
    return () => document.removeEventListener("click", handleNavClick);
  }, []);

  return (
    <div style={{ width: "100%", overflowX: "hidden", backgroundColor: "#111", minHeight: "100vh" }}>
      <div 
        className="responsive-container"
        style={{
          width: isMobile ? "100%" : "1440px",
          transform: isMobile ? "none" : `scale(${scale})`,
          transformOrigin: "top center",
          margin: isMobile ? "0" : "0 auto"
        }}
      >
        {currentPage === "home" ? (
          <HomeWithFAQ />
        ) : currentPage === "what" ? (
          <WhatWithInteraction />
        ) : currentPage === "why" ? (
          <WhyWithInteraction />
        ) : currentPage === "who" ? (
          <WhoWithInteraction />
        ) : (
          <PricingWithInteraction />
        )}
      </div>
    </div>
  );
}
