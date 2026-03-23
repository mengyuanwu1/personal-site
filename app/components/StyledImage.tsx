import type { ComponentPropsWithoutRef } from "react";

type StyledImageProps = ComponentPropsWithoutRef<"img"> & {
  frameClassName?: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function StyledImage({ frameClassName, className, ...props }: StyledImageProps) {
  return (
    <div className={joinClasses("toned-image-frame", frameClassName)}>
      <img {...props} className={joinClasses("toned-image", className)} />
    </div>
  );
}
