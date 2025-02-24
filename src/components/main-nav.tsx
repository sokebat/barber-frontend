"use client";
import Link from "next/link";
import { Menu, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Store", href: "/our-store" },
  { name: "Book Appointment", href: "/book" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pl-1 pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center" onClick={() => {}}>
                <span className="font-bold">LuxeCuts & Spa</span>
              </Link>
            </div>
            <nav className="mt-4 flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-7 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold lg:inline-block">
            LuxeCuts & Spa
          </span>
        </Link>
        <nav className="hidden gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                0
              </span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button className="hidden lg:inline-flex">Book Now</Button>
        </div>
      </div>
    </header>
  );
}
