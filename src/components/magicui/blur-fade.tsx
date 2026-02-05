import { useEffect, useRef, useState } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  inView?: boolean;
  duration?: number;
  yOffset?: number;
  blur?: string;
}

export default function BlurFade({
  children,
  delay = 0,
  inView = false,
  duration = 0.6,
  yOffset = 20,
  blur = "10px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!inView);

  useEffect(() => {
    if (!inView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : `blur(${blur})`,
        transform: isVisible ? "translateY(0)" : `translateY(${yOffset}px)`,
        transition: `all ${duration}s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
