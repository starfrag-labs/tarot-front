import { memo, useRef } from "react";

export default memo(function Message({
  message,
  visible = true,
}: {
  message: string;
  visible?: boolean;
}) {
  const messageRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={messageRef}
      style={{ display: visible ? "block" : "none" }}
      className="font-flower-island text-lg sm:text-xl px-4 text-white animate-fade-in"
    >
      {message.split("\n").map((line, lineNumber) => (
        <p key={`${lineNumber}-${line}`} className="text-center">
          {line}
        </p>
      ))}
    </div>
  );
});
