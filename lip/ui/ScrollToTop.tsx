// // "use client";
// // import { useEffect, useState } from "react";
// // import { ArrowUp } from "lucide-react";

// // const ScrollToTop = () => {
// //   const [scrollPercent, setScrollPercent] = useState(0);
// //   const [visible, setVisible] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const scrollTop = window.scrollY;
// //       const docHeight =
// //         document.documentElement.scrollHeight - window.innerHeight;
// //       const scrolled = (scrollTop / docHeight) * 100;
// //       setScrollPercent(Math.round(scrolled));

// //       setVisible(scrollTop > 100);
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const scrollToTop = () => {
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   // circle progress calculation
// //   const radius = 24; // radius of circle
// //   const circumference = 2 * Math.PI * radius;
// //   const offset = circumference - (scrollPercent / 100) * circumference;

// //   return (
// //     <button
// //       onClick={scrollToTop}
// //       className={`cursor-pointer fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center bg-white text-primary  shadow-lg  transition-opacity duration-300 ${
// //         visible ? "opacity-100" : "opacity-0 pointer-events-none"
// //       }`}
// //     >
// //       <svg className="absolute w-16 h-16 -rotate-90" viewBox="0 0 60 60">
// //         <circle
// //           className="text-primary"
// //           strokeWidth="4"
// //           stroke="currentColor"
// //           fill="transparent"
// //           r={radius}
// //           cx="30"
// //           cy="30"
// //           strokeDasharray={circumference}
// //           strokeDashoffset={offset}
// //         />
// //       </svg>
// //       <div className="flex flex-col items-center justify-center relative">
// //         <ArrowUp size={20} />
// //         <span className="text-xs font-semibold">{scrollPercent}%</span>
// //       </div>
// //     </button>
// //   );
// // };

// // export default ScrollToTop;


// "use client";
// import { useEffect, useState } from "react";
// import { ArrowUp } from "lucide-react";

// const ScrollToTop = () => {
//   const [scrollPercent, setScrollPercent] = useState(0);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const scrolled = (scrollTop / docHeight) * 100;
//       setScrollPercent(Math.round(scrolled));

//       setVisible(scrollTop > 100);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const radius = 24;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (scrollPercent / 100) * circumference;

//   return (
//     <button
//       onClick={scrollToTop}
//       className={`fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-opacity duration-300 ${
//         visible ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       {/* Background Circle */}
//       <svg className="absolute w-16 h-16 -rotate-90" viewBox="0 0 60 60">
//         <circle
//           stroke="rgba(255,255,255,0.2)"
//           strokeWidth="4"
//           fill="transparent"
//           r={radius}
//           cx="30"
//           cy="30"
//         />
//         {/* Animated Circle */}
//         <circle
//           stroke="white"
//           strokeWidth="4"
//           fill="transparent"
//           r={radius}
//           cx="30"
//           cy="30"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           style={{ transition: "stroke-dashoffset 0.3s ease-out" }}
//         />
//       </svg>

//       {/* Arrow + Percentage */}
//       <div className="flex flex-col items-center justify-center relative">
//         <ArrowUp size={20} />
//         <span className="text-xs font-semibold">{scrollPercent}%</span>
//       </div>
//     </button>
//   );
// };

// export default ScrollToTop;


"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(Math.round(scrolled));

      setVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollPercent / 100) * circumference;

  // Dynamic color gradient from red -> yellow -> green
  const getColor = () => {
    if (scrollPercent < 50) return "#f87171"; // red-400
    if (scrollPercent < 80) return "#facc15"; // yellow-400
    return "#34d399"; // green-400
  };

  return (
    <button
      onClick={scrollToTop}
      className={`cursor-pointer fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background Circle */}
      <svg className="absolute w-16 h-16 -rotate-90" viewBox="0 0 60 60">
        <circle
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="4"
          fill="transparent"
          r={radius}
          cx="30"
          cy="30"
        />
        {/* Animated Gradient Circle */}
        <circle
          stroke={getColor()}
          strokeWidth="4"
          fill="transparent"
          r={radius}
          cx="30"
          cy="30"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.3s ease-out, stroke 0.3s ease" }}
        />
      </svg>

      {/* Arrow + Percentage */}
      <div className="flex flex-col items-center justify-center relative bg-primary-hover w-12 h-12 rounded-full text-white">
        <ArrowUp size={20} />
        <span className="text-xs font-semibold">{scrollPercent}%</span>
      </div>
    </button>
  );
};

export default ScrollToTop;
