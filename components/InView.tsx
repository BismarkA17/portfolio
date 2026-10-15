"use client";
import { useEffect, useRef, useState } from "react";

/** Adds `onClass` once the element scrolls into view. Used to start
 *  animations that mean something (a chart drawing, a pipeline lighting up),
 *  not to fade content in. */
export default function InView({
  as: Tag = "div",
  className = "",
  onClass = "on",
  children,
  ...rest
}: { as?: any; className?: string; onClass?: string; children: React.ReactNode } & Record<string, any>) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`${className} ${on ? onClass : ""}`.trim()} {...rest}>{children}</Tag>;
}
