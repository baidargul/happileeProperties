"use client";

import React, { useRef, useEffect, PropsWithChildren } from "react";

// Assuming you have a Carousel library similar to Fancybox
// Replace this with your actual Carousel library import
import { Carousel as NativeCarousel } from "@fancyapps/ui";

interface Props {
  options?: Record<string, any>; // Customize this based on your carousel's options
}

const CarouselWrapper = (props: PropsWithChildren<Props>) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const options = props.options || {};

    if (container) {
      // Initialize the carousel with the container and options
      const carouselInstance = new NativeCarousel(container, options);

      return () => {
        // Clean up carousel instance
        carouselInstance.destroy();
      };
    }
  }, [props.options]);

  return <div id="myCarousel" className="f-carousel" ref={containerRef}>{props.children}</div>;
};

export default CarouselWrapper;
