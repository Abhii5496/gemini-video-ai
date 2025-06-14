import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import HomePage from "@/components/Home/HomePage.bk";
import { SelectModel } from "@/components/gemini-model";
import Example from "@/components/ui/stylishCard";

export default function Page() {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <Example />
    </SidebarProvider>
  );
}
