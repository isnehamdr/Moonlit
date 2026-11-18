
import { useEffect, useState } from "react";

const BackToTop = ({
  whatsappNumber = "9779800000000",
  whatsappMessage = "Hello! I would like to know more about your services.",
  whatsappImage = "/images/whatsapp.png",
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3">

      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full
          bg-slate-900 text-white shadow-lg transition-all duration-300
          hover:-translate-y-1 hover:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        aria-label="Chat with us on WhatsApp"
        className="flex h-14 w-14 items-center justify-center
        rounded-full transition-all duration-300
        hover:scale-110"
      >
        <img
          src={whatsappImage}
          alt="WhatsApp"
          className="h-full w-full rounded-full object-contain"
        />
      </button>

    </div>
  );
};

export default BackToTop;
