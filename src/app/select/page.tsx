"use client";

import { useCallback, useRef, useState } from "react";
import Card from "@/components/card/card";
import Button from "../../components/button";
import Message from "../../components/message";

const SIDE_CARD_COUNT = 9;
const SIDE_CARD_KEYS = Array.from(
  { length: SIDE_CARD_COUNT },
  (_, i) => `side-card-${i}`,
);

export default function Page() {
  const animationDelay = 100;

  const [cardSelected, setCardSelected] = useState(false);
  const [animation, setAnimation] = useState(false);

  const cardsRef = useRef<HTMLDivElement>(null);
  const currentCardRef = useRef<HTMLImageElement>(null);
  const nextCardRef = useRef<HTMLImageElement>(null);
  const prevCardRef = useRef<HTMLImageElement>(null);

  const activateCardSelected = useCallback(() => {
    if (currentCardRef.current) {
      const keyframes = [
        { transform: "scale(1)" },
        { transform: "scale(1.2)" },
      ];
      const options = {
        duration: 300,
        easing: "ease-in-out",
      };
      setAnimation(true);
      currentCardRef.current.animate(keyframes, options);
      currentCardRef.current.style.transform = "scale(1.2)";
      setTimeout(() => {
        setAnimation(false);
      }, options.duration + animationDelay);
    }
    setCardSelected(true);
  }, []);

  const deactivateCardSelected = useCallback(() => {
    if (currentCardRef.current) {
      const keyframes = [
        { transform: "scale(1.2)" },
        { transform: "scale(1)" },
      ];
      const options = {
        duration: 300,
        easing: "ease-in-out",
      };
      setAnimation(true);
      currentCardRef.current.animate(keyframes, options);
      currentCardRef.current.style.transform = "scale(1)";
      setTimeout(() => {
        setAnimation(false);
      }, options.duration + animationDelay);
    }
    setCardSelected(false);
  }, []);

  const moveRight = useCallback(
    (speed: number) => {
      if (cardsRef.current && currentCardRef.current && nextCardRef.current) {
        const cardsKeyframes = [
          { transform: "translateX(0)" },
          { transform: "translateX(calc(-120px - 1.25rem))" }, // card width + gap
        ];
        const prevCardKeyframes = [
          { transform: cardSelected ? "scale(1.2)" : "scale(1)" },
          { transform: "scale(1)" },
        ];
        const currentCardKeyframes = [
          { transform: "scale(1)" },
          { transform: cardSelected ? "scale(1.2)" : "scale(1)" },
        ];
        const options = {
          duration: speed,
          easing: "ease-in-out",
        };
        setAnimation(true);
        cardsRef.current.animate(cardsKeyframes, options);
        currentCardRef.current.animate(prevCardKeyframes, options);
        nextCardRef.current.animate(currentCardKeyframes, options);
        setTimeout(() => {
          setAnimation(false);
        }, options.duration + animationDelay);
      }
    },
    [cardSelected],
  );

  const moveLeft = useCallback(
    (speed: number) => {
      if (cardsRef.current && currentCardRef.current && prevCardRef.current) {
        const cardsKeyframes = [
          { transform: "translateX(0)" },
          { transform: "translateX(calc(120px + 1.25rem))" }, // card width + gap
        ];
        const prevCardKeyframes = [
          { transform: "scale(1)" },
          { transform: cardSelected ? "scale(1.2)" : "scale(1)" },
        ];
        const currentCardKeyframes = [
          { transform: cardSelected ? "scale(1.2)" : "scale(1)" },
          { transform: "scale(1)" },
        ];
        const options = {
          duration: speed,
          easing: "ease-in-out",
        };
        setAnimation(true);
        cardsRef.current.animate(cardsKeyframes, options);
        prevCardRef.current.animate(prevCardKeyframes, options);
        currentCardRef.current.animate(currentCardKeyframes, options);
        setTimeout(() => {
          setAnimation(false);
        }, options.duration + animationDelay);
      }
    },
    [cardSelected],
  );

  const generateMoveInterval = useCallback(
    (speed: number, clientX: number) => {
      let interval: NodeJS.Timeout;
      // move left if clicked on left side of the screen, otherwise move right
      if (clientX < window.innerWidth / 2) {
        interval = setInterval(() => {
          moveLeft(speed);
        }, speed);
      } else {
        interval = setInterval(() => {
          moveRight(speed);
        }, speed);
      }

      return interval;
    },
    [moveLeft, moveRight],
  );

  // hold move
  const holdMoveClick = useCallback(
    (speed: number) => (e: React.MouseEvent) => {
      const clientX = e.clientX;
      const interval = generateMoveInterval(speed, clientX);

      document.addEventListener("mouseup", () => {
        clearInterval(interval);
      });
    },
    [generateMoveInterval],
  );

  const holdMoveTouch = useCallback(
    (speed: number) => (e: React.TouchEvent) => {
      const clientX = e.touches[0].clientX;
      const interval = generateMoveInterval(speed, clientX);

      document.addEventListener("touchend", () => {
        clearInterval(interval);
      });
    },
    [generateMoveInterval],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (animation) return;
      const speed = 300;
      if (e.key === "ArrowLeft") {
        moveLeft(speed);
      } else if (e.key === "ArrowRight") {
        moveRight(speed);
      } else if (e.key === "Enter" || e.key === " ") {
        if (!cardSelected) {
          activateCardSelected();
        }
      }
    },
    [animation, moveLeft, moveRight, cardSelected, activateCardSelected],
  );

  return (
    <div
      className="grid grid-rows-[1fr_2fr_1fr] items-center w-full pt-20 pb-20 gap-16 font-flower-island overflow-x-hidden min-h-screen select-none"
      role="application"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        // prevent multiple clicks
        if (!animation && !cardSelected) {
          activateCardSelected();
        } else if (!animation) {
          const speed = 300;
          if (e.clientX < window.innerWidth / 2) {
            moveLeft(speed);
          } else {
            moveRight(speed);
          }
        }
      }}
      onMouseDown={holdMoveClick(150)}
      onTouchStart={holdMoveTouch(150)}
    >
      <div>
        {cardSelected ? (
          <Message message="이 카드로 선택하시겠습니까?" />
        ) : (
          <Message message="화면을 눌러 카드를 선택을 시작해주세요." />
        )}
      </div>

      <div
        className="flex flex-row h-full flex-center gap-5 py-5"
        ref={cardsRef}
      >
        {SIDE_CARD_KEYS.map((key) => (
          <Card key={key} width={120} isMini scaleAnimation />
        ))}
        <Card ref={prevCardRef} width={120} isMini scaleAnimation />
        <Card
          ref={currentCardRef}
          width={120}
          style={{
            transform: cardSelected ? "scale(1.2)" : "scale(1)",
          }}
          isMini
          scaleAnimation
        />
        <Card ref={nextCardRef} width={120} isMini scaleAnimation />
        {SIDE_CARD_KEYS.map((key) => (
          <Card key={`next-${key}`} width={120} isMini scaleAnimation />
        ))}
      </div>
      <div className="w-full">
        {cardSelected && (
          <div className="flex flex-row w-full justify-around">
            <Button
              href={"/result"}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              YES
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                deactivateCardSelected();
              }}
            >
              NO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
