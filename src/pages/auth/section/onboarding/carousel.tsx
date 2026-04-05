import { useEffect, useState } from "react";
import { cn } from "@/_helper/twMerge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  CarouselDots,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";
import { AuthSlides } from "@/data/images";

const OnboardingCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="flex flex-col items-center p-4 bg-white">
      <Carousel
        className="relative w-full"
        opts={{ loop: true, align: "center", containScroll: "trimSnaps" }}
        autoPlay
        autoPlayDelay={3500}
        pauseOnHover
        setApi={setApi}
      >
        <CarouselContent>
          {AuthSlides.map((s, i) => (
            <CarouselItem key={s.name} className="basis-full">
              <div
                className={cn(
                  "transition-opacity duration-700",
                  selectedIndex === i
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                )}
                aria-hidden={selectedIndex !== i}
              >
                <div
                  className="
                    mx-auto flex items-center justify-center
                   
                  "
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    className="max-h-full max-w-full object-contain"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                </div>

                <div className="text-center mb-6 min-h-[96px] md:min-h-[112px] flex flex-col justify-center">
                  <p className="pb-2 font-semibold font-poppins xl:text-2xl text-xl bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent text-left md:text-center">
                    {t(`onboarding.welcomeCarousel.title.${i + 1}`)}
                  </p>
                  <p className="font-normal font-poppins xl:text-xl text-md text-neutral-medium text-left md:text-center">
                    {t(`onboarding.welcomeCarousel.subtitle.${i + 1}`)}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots className="absolute -bottom-6 left-1/2 -translate-x-1/2" />
      </Carousel>
    </div>
  );
};

export default OnboardingCarousel;
