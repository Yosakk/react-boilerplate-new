import { cn } from "@/_helper/twMerge";
import type { JSX } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Content container inside AppShell.Main.
 * Fills available height, supports overflow scroll.
 */
const Container: React.FC<ContainerProps> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 min-h-0 w-full overflow-auto bg-background",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
