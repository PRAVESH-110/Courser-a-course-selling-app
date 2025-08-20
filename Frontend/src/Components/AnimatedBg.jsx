import { useEffect } from "react";
import gsap from "gsap";

const AnimatedBackground = () => {
  useEffect(() => {
    gsap.to("#ripple-overlay", {
      backgroundPosition: "200% -200%",   // move diagonally one way
      duration: 4,
      repeat: -1,
      yoyo: true, // 🔥 reverses direction instead of restarting
      ease: "power2.inOut"
    });
  }, []);

  return null;
};

export default AnimatedBackground;
