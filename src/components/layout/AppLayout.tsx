"use client";
import type { ReactNode } from "react";
import Header from "@/components/layout/components/Header";
import Footer from "@/components/layout/components/Footer";


type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
