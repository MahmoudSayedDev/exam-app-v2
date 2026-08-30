"use client"


import { Fragment } from "react"
import Link from "next/link"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useSidebar } from "@/components/ui/sidebar"
import { DynamicIcon } from "lucide-react/dynamic"


type BreadcrumbItem = {
    label: string
    href?: string
    styleClass?: string
}

type CustomBreadcrumbProps = {
    items: BreadcrumbItem[]
}


export function CustomBreadcrumb({ items, }: CustomBreadcrumbProps) {

    const { toggleSidebar } = useSidebar()


    return (
        <div className="w-full flex items-center gap-3 p-3 shadow">
            <button onClick={toggleSidebar} className=" cursor-pointer">
                <DynamicIcon name="layout-grid"/>
            </button>

            <Breadcrumb>
                <BreadcrumbList>
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1

                        return (
                            <Fragment key={`${item.label}-${index}`}>
                                {index > 0 && <BreadcrumbSeparator />}

                                <BreadcrumbItem>
                                    {isLast || !item.href ? (
                                        <BreadcrumbPage className={item.styleClass}>{item.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink render={<Link href={item.href} />}>
                                            {item.label}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
