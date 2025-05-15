"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { NAVIGATION_LINKS } from "@/components/layout/utils/constants";

const Header = () => {
  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {NAVIGATION_LINKS.map((route) => (
                    <Link
                      key={route.label}
                      href={route.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-2xl font-bold ">
                <span className={"text-blue-500"}>Zen</span>
                <span className="text-2xl font-bold text-gray-800 ">mahal</span>
              </h1>
            </Link>
          </div>
          <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:block">
            {NAVIGATION_LINKS.map((route) => (
              <Button asChild variant="ghost" key={route.label}>
                <Link
                  key={route.label}
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div>
            <div className="relative">
              <ShoppingCart
                className={"mr-2 cursor-pointer text-primary-gray-500 w-6 h-6"}
              />
              <span className="bg-blue-500 text-white rounded-full absolute top-[-6px] right-0 w-5 h-5 flex justify-center items-center text-[12px]">
                1
              </span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
