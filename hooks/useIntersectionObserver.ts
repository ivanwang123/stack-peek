import React from "react";

type PropType = {
  target: any;
  onIntersect: any;
  root?: any;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
};

export default function useIntersectionObserver(props: PropType) {
  const {
    target,
    onIntersect,
    root,
    threshold = 1.0,
    rootMargin = "0px",
    enabled = true,
  } = props;

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
}
