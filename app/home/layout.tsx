"use client";

import { ReactNode } from "react";

function HomeLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div>{children}</div>;
}

export default HomeLayout;
