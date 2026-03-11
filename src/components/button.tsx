import Link from "next/link";
import { type MouseEventHandler, memo } from "react";

export default memo(function Button({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-20 h-11 bg-black shadow-custom-button text-white content-center text-center rounded-lg"
    >
      {href ? (
        <Link href={href} className="full-size flex-center">
          {children}
        </Link>
      ) : (
        children
      )}
    </button>
  );
});
