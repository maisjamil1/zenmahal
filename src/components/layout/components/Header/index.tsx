"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { NAVIGATION_LINKS } from "@/components/layout/utils/constants";
import CartCounter from "@/components/features/ShoppingCart/components/CartCounter";

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
                <span className={"text-purple-600"}>Zen</span>
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
            <CartCounter/>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
