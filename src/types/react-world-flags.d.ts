declare module "react-world-flags" {
  import type { ImgHTMLAttributes, ReactNode } from "react";

  type FlagProps = ImgHTMLAttributes<HTMLImageElement> & {
    code?: string;
    fallback?: ReactNode;
  };

  export default function Flag(props: FlagProps): ReactNode;
}
