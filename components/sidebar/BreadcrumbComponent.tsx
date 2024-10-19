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

  // Moved labels mapping outside of the render method for better performance
  const labels: { [key: string]: string } = {
    toto: "toto",
    tata: "Tata",
    // Add more mappings as needed
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const label =
            labels[segment] ||
            segment.charAt(0).toUpperCase() + segment.slice(1);
          return (
            <BreadcrumbItem key={href}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
