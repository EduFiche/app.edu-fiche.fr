"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const BreadcrumbComponent = () => {
  const currentPath = usePathname();
  const pathSegments = currentPath.split("/").filter(Boolean); // Split the path and filter out empty segments

  const labels: { [key: string]: string } = {
    app: "Home",
    courses: "Vos cours",
    stats: "Statistiques",
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const label =
            labels[segment] ||
            segment.charAt(0).toUpperCase() + segment.slice(1);
          return (
            <BreadcrumbItem key={href}>
              <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
              <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
