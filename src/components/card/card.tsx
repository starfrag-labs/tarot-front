import Image from "next/image";
import {
  type CSSProperties,
  forwardRef,
  type MouseEventHandler,
  memo,
} from "react";

export default memo(
  forwardRef<
    HTMLImageElement,
    {
      width?: number;
      isMini?: boolean;
      style?: CSSProperties;
      onClick?: MouseEventHandler<HTMLImageElement>;
      scaleAnimation?: boolean;
    }
  >(function Card(
    { width = 120, isMini = false, style, onClick, scaleAnimation = false },
    ref,
  ) {
    const ratio = 1.6;
    const height = width * ratio;
    return (
      <Image
        className={`bg-black ${isMini ? "shadow-card-mini" : "shadow-card"} ${scaleAnimation ? "animate-card-scale" : ""}`}
        ref={ref}
        draggable={false}
        src={"/cardx1.png"}
        alt="Logo"
        width={width}
        height={height}
        style={{ ...style, width: width, height: height }}
        priority
        loading="eager"
        onClick={onClick}
      />
    );
  }),
);
