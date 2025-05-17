"use client";
import type { ReactNode } from "react";
import Header from "@/components/layout/components/Header";
import Footer from "@/components/layout/components/Footer";
import { Toaster } from "@/components/ui/sonner";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
        <main
            className="min-h-screen p-4 pb-20"
        >
        {children}
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default AppLayout;
