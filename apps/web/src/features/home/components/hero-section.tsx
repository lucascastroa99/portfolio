import memoji from "@repo/assets/images/symbol.webp";
import {
  pages_home_aboutMe,
  pages_home_contactMe,
  pages_home_greetingPrefix,
  pages_home_presentation,
  pages_home_typing,
} from "@repo/i18n/messages";
import { Button } from "@repo/ui/shadcn/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { TypewriterComponent } from "./typewriter";

function HeroSection() {
  return (
    <div className="relative flex flex-1 items-center justify-center px-4 py-12 md:py-6">
      <div className="container mx-auto max-w-6xl 2xl:max-w-7xl">
        <div className="flex flex-col items-center gap-6 md:gap-8 xl:gap-10 2xl:gap-12">
          <div className="flex w-full flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-center md:gap-2 lg:gap-4 xl:gap-6 2xl:gap-8">
            <div className="flex justify-center md:justify-end">
              <img
                src={memoji}
                alt="Personal Memoji"
                width={300}
                height={300}
                className="object-contain md:h-100 md:w-100 2xl:h-137.5 2xl:w-137.5"
              />
            </div>

            <div className="space-y-6 text-center md:text-left 2xl:space-y-8">
              <div className="flex flex-col gap-1 2xl:gap-2">
                <span className="font-normal text-lg text-muted-foreground sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                  {pages_home_greetingPrefix()}
                </span>
                <h1 className="whitespace-nowrap font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                  Lucas Castro
                </h1>
              </div>

              <div className="flex flex-col gap-2 2xl:gap-3">
                <span className="text-muted-foreground text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl">
                  {pages_home_typing()}
                </span>
                <span className="font-bold text-primary text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl">
                  <TypewriterComponent />
                </span>
              </div>
            </div>
          </div>

          <div className="flex max-w-3xl flex-col items-center gap-6 text-center 2xl:max-w-4xl 2xl:gap-8">
            <p className="text-base text-muted-foreground sm:text-lg lg:text-xl 2xl:text-2xl">
              {pages_home_presentation()}
            </p>

            <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row 2xl:gap-6">
              <Button asChild size="lg" className="w-full sm:w-auto 2xl:px-8 2xl:py-6 2xl:text-lg">
                <Link to="/about">
                  {pages_home_aboutMe()}
                  <ArrowRight className="ml-2 h-5 w-5 2xl:h-6 2xl:w-6" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group relative w-full transition-all duration-300 before:absolute before:inset-0 before:scale-100 before:rounded-md before:border-2 before:border-primary before:opacity-0 before:transition-all before:duration-300 hover:before:scale-105 hover:before:opacity-100 sm:w-auto 2xl:px-8 2xl:py-6 2xl:text-lg"
              >
                <Link to="/contact">
                  <Mail className="mr-2 h-5 w-5 2xl:h-6 2xl:w-6" />
                  {pages_home_contactMe()}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroSection };
