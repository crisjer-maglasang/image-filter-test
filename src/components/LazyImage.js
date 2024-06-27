import React, { useRef, useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

const LazyImage = ({ src, alt, title }) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasIntersected(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px 50px 0px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full h-full flex">
      {!isLoaded && hasIntersected && (
        <Oval
          visible={true}
          height={20}
          width={20}
          color="#FFFFFF"
          ariaLabel="oval-loading"
          wrapperClass="flex items-center justify-center absolute inset-0"
        />
      )}
      <div className="flex flex-col items-center justify-stretch text-center w-full">
        <img
          ref={imgRef}
          src={hasIntersected ? src : ""}
          alt={alt}
          loading="lazy"
          onLoad={handleImageLoad}
          className={`w-32 h-32 ${!isLoaded && "opacity-0"}`}
        />
        <div className="text-white">{title}</div>
      </div>
    </div>
  );
};

export default LazyImage;
