import { useEffect, useState } from "react";

const breakpoints = {
  "sm": 640, // 40rem
  "md": 768, // 48rem
  "lg": 1024, // 64rem
  "xl": 1280, // 80rem
  "2xl": 1536, // 96rem
  "3xl": 1720, // 96rem
};

type Breakpoints = {
  maxSm: boolean;
  maxMd: boolean;
  maxLg: boolean;
  maxXl: boolean;
  max2xl: boolean;
  max3xl: boolean;
};

function getMatches() {
  const width = window.innerWidth;
  return {
    maxSm: width < breakpoints.sm,
    maxMd: width < breakpoints.md,
    maxLg: width < breakpoints.lg,
    maxXl: width < breakpoints.xl,
    max2xl: width < breakpoints["2xl"],
    max3xl: width < breakpoints["3xl"],
  };
}

export function useBreakpoints(): Breakpoints {
  const [matches, setMatches] = useState<Breakpoints>(() => getMatches());

  useEffect(() => {
    const onResize = () => setMatches(getMatches());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return matches;
}
