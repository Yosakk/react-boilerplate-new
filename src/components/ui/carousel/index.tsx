import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/_helper/twMerge";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  autoPlay?: boolean;
  autoPlayDelay?: number;  // ms
  pauseOnHover?: boolean;
};

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used within a <Carousel />");
  return ctx;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(function Carousel(
  {
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    autoPlay = false,
    autoPlayDelay = 3500,
    pauseOnHover = true,
    ...props
  },
  ref
) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      align: opts?.align ?? "start",
      axis: orientation === "horizontal" ? "x" : "y",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    plugins
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const onSelect = React.useCallback((embla: CarouselApi) => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (orientation === "horizontal") {
        if (e.key === "ArrowLeft") { e.preventDefault(); scrollPrev(); }
        if (e.key === "ArrowRight") { e.preventDefault(); scrollNext(); }
      } else {
        if (e.key === "ArrowUp") { e.preventDefault(); scrollPrev(); }
        if (e.key === "ArrowDown") { e.preventDefault(); scrollNext(); }
      }
    },
    [orientation, scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  // Fallback autoplay (aktif jika tidak memasang plugin autoplay)
  React.useEffect(() => {
    if (!api || !autoPlay) return;
    const usingPlugin = Array.isArray(plugins) && plugins.length > 0;
    if (usingPlugin) return;

    let timer: number | undefined;
    const tick = () => {
      if (!isHovering && document.visibilityState === "visible") api.scrollNext();
      timer = window.setTimeout(tick, autoPlayDelay);
    };
    timer = window.setTimeout(tick, autoPlayDelay);
    return () => { if (timer) window.clearTimeout(timer); };
  }, [api, autoPlay, autoPlayDelay, isHovering, plugins]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        autoPlay,
        autoPlayDelay,
        pauseOnHover,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        onMouseEnter={pauseOnHover ? () => setIsHovering(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setIsHovering(false) : undefined}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CarouselContent({ className, ...props }, ref) {
    const { carouselRef, orientation } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  }
);

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CarouselItem({ className, ...props }, ref) {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        )}
        {...props}
      />
    );
  }
);

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  function CarouselPrevious({ className, variant = "outline", size = "icon", ...props }, ref) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  }
);

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  function CarouselNext({ className, variant = "outline", size = "icon", ...props }, ref) {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  }
);

const CarouselDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CarouselDots({ className, ...props }, ref) {
    const { api } = useCarousel();
    const [selected, setSelected] = React.useState(0);
    const [snaps, setSnaps] = React.useState<number[]>([]);

    React.useEffect(() => {
      if (!api) return;
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
      const onSelect = () => setSelected(api.selectedScrollSnap());
      api.on("select", onSelect);
      api.on("reInit", onSelect);
      return () => {
        api.off("select", onSelect);
        api.off("reInit", onSelect);
      };
    }, [api]);

    if (!snaps.length) return null;

    return (
      <div ref={ref} className={cn("flex items-center justify-center gap-3", className)} {...props}>
        {snaps.map((_, i) => {
          const isActive = selected === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive}
              className={cn(
                "transition-all duration-300 rounded-full",
                !isActive && "h-2.5 w-2.5 bg-neutral-200 hover:bg-neutral-300",
                isActive && "h-2.5 w-10 bg-gradient-to-b from-[#177C62] to-[#3AC4A0] shadow-sm"
              )}
            />
          );
        })}
      </div>
    );
  }
);

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
};
