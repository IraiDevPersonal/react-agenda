import React from "react";

type Props = {
  children: React.ReactNode;
};

function Main({ children }: Props) {
  return (
    <main className="min-h-dvh w-full">{children}</main>
  );
}

export default Main;
