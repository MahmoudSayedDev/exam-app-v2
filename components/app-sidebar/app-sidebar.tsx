'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { DynamicIcon } from "lucide-react/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {

    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-3 py-3 px-2">
                    <DynamicIcon name="folder-code" className="text-primary" />
                    <h2 className="text-primary font-bold">Exam App</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <nav>
                        <Link className={`link ${pathname.includes('diplomas') ? 'text-primary bg-blue-100 dark:bg-surface-700' : ''} capitalize flex items-center gap-2 mb-2 p-3 text-surface-500 dark:text-surface-100 hover:bg-blue-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple`}
                            href="/diplomas"
                        >
                            <DynamicIcon name="graduation-cap" strokeWidth="1px" />
                            <span>diplomas</span>
                        </Link>

                        <Link
                            className={`link ${pathname.includes('account-settings') ? 'text-primary bg-blue-100 dark:bg-surface-700' : ''} capitalize flex items-center gap-2 mb-2 p-3 text-surface-500 dark:text-surface-100 hover:bg-blue-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple`}
                            href="/account-settings"
                        >
                            <DynamicIcon name="user" strokeWidth="1px" />
                            <span>Account Settings</span>
                        </Link>
                    </nav>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}