import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import HomePage from "@/components/Home/HomePage";
import { SelectModel } from "@/components/gemini-model";

export default function Page() {
  return (
    (<SidebarProvider>
      {/* <AppSidebar /> */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 sticky top-0 left-0 w-full bg-background z-[99999]">
          <div className="flex items-center gap-2 px-4">
            {/* <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" /> */}
            <p className="text-sm text-sidebar-primary-foreground">Start your journey with</p>
            <SelectModel />
          </div>
        </header>

        <HomePage />
      </SidebarInset>
    </SidebarProvider>)
  );
}
