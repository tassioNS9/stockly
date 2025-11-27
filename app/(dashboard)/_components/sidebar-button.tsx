import { usePathname } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

interface SidebarButtonProps {
  children: React.ReactNode;
  href: string;
}

const SidebarButton = ({ children, href }: SidebarButtonProps) => {
  const pathName = usePathname();
  return (
    <Button
      variant={pathName === href ? "secondary" : "ghost"}
      className="flex justify-start gap-2"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
