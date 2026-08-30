
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar/app-sidebar"
import { LoadingProvider } from "@/context/LoadingContext"
import Loading from "@/components/Loading/Loading"



export default function Layout({ children }: LayoutProps<"/">) {
    return <>
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-gray-50 dark:bg-gray-950">
                <LoadingProvider>
                    <Loading />
                    {children}
                </LoadingProvider>
            </main>
        </SidebarProvider>
    </>
}
