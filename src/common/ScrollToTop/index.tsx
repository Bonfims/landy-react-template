import { useCallback, useEffect, useState } from "react";
import { ScrollUpContainer } from "./styles";

import ScrollTopSvg from "./icon";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    const offsetFromTop = window.scrollY;

    if (!showScroll && offsetFromTop > 350) {
      setShowScroll(true);
    } else if (offsetFromTop <= 350) {
      setShowScroll(false);
    }
  }, [showScroll]);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [checkScrollTop]);

  const scrollUp = () => {
    const element = document.getElementById("intro") as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <ScrollUpContainer onClick={scrollUp} show={showScroll} style={{ color: "var(--primary-color)" }}>
      <ScrollTopSvg width="20px" height="20px" />
    </ScrollUpContainer>
  );
};

export default ScrollToTop;
