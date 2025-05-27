import { useRef, useEffect, useState } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef();
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isIntersecting];
}
