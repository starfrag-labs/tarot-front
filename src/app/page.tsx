"use client";

import { redirect } from "next/navigation";
import { useCallback, useState } from "react";
import Message from "../components/message";

const messages = [
  "안녕하세요, 타로마스터입니다.",
  "고민이 있으신가요?\n마음을 가다듬고, 질문을 생각해주세요.",
  "이제 카드를 섞겠습니다. 당신의 오늘에 행운이 깃들길 바랍니다.",
];

export default function Home() {
  const [messageIndex, setMessageIndex] = useState(0);

  const handleClick = useCallback(() => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex((prev) => prev + 1);
    } else {
      redirect("/select");
    }
  }, [messageIndex]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="grid grid-rows-[20px_1fr_20px] full-size items-center justify-items-center pt-20 pb-20 gap-16 min-h-screen font-flower-island w-full cursor-pointer bg-transparent border-none"
    >
      <main className="flex flex-col w-full gap-8 row-start-2 items-center">
        {messages.map((message) => (
          <Message
            key={message}
            message={message}
            visible={messageIndex === messages.indexOf(message)}
          />
        ))}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center" />
    </button>
  );
}
