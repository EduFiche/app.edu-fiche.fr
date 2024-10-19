import { cn } from "@/lib/utils";

interface Header1Props extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const Header1: React.FC<Header1Props> = ({ children, ...props }) => {
  return (
    <h1
      {...props}
      className={cn("text-2xl font-bold text-center", props.className)}
    >
      {children}
    </h1>
  );
};
