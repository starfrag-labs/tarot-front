"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { tarotQuery } from "@/api/query";
import Message from "@/components/message";
import Button from "../../components/button";

export default function Page() {
  const executeTarotQuery = useQuery(tarotQuery.execute);

  if (executeTarotQuery.isError) {
    return (
      <div className="flex-center full-size animate-fade-in">
        <Message message="운명을 해석하는 도중 오류가 발생했습니다." />
      </div>
    );
  }

  if (executeTarotQuery.isSuccess) {
    return (
      <div className="grid grid-rows-[1fr_auto_1fr] full-size items-center justify-items-center font-kopub-batang text-[#EBEBEB] text-base">
        <div></div>
        <div className="flex-center flex-col bg-result-card-img bg-cover bg-center bg-no-repeat w-result-card-width h-result-card-height px-6 py-12 animate-fade-in">
          <div className="uppercase text-white text-xl font-flower-island text-center">
            {executeTarotQuery.data?.data.title} (
            {executeTarotQuery.data?.data.titleKR})
          </div>
          <div className="h-7 border-l border-white my-1"></div>
          <div className="flex flex-col w-full overflow-y-hidden gap-7">
            <div className="flex flex-col flex-center gap-1">
              <div className="text-[#D2F9FF] text-lg capitalize">
                keywords
              </div>
              <ul className="flex flex-row flex-center w-full text-[#EBEBEB] whitespace-normal text-center">
                {executeTarotQuery.data?.data.keywords.join(", ")}
              </ul>
            </div>
            <div className="flex-center flex-col w-full overflow-y-hidden gap-1">
              <div className="text-[#D2F9FF] text-lg capitalize">
                advices
              </div>
              <p className="flex flex-col gap-3 w-full overflow-x-clip overflow-y-scroll whitespace-break-spaces text-center text-white h-result-description-height">
                {executeTarotQuery.data?.data.advice}
                <Link href={"/"} className="underline underline-offset-4">
                  돌아가기
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Button>SHARE</Button>
      </div>
    );
  }

  return (
    <div className="flex-center full-size animate-pulse">
      <Message message="당신의 운명을 해석중입니다..." />
    </div>
  );
}
