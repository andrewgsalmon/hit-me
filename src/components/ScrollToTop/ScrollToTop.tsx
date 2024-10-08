import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const pathname = useLocation();

  useEffect(() => {
    if (!pathname.pathname.includes('home')) {
    window.scrollTo(0,0)
    }
  }, [pathname])

  return null;
}

export default ScrollToTop;
