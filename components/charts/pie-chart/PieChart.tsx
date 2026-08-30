"use client"

import React from 'react'
import { Pie, PieChart } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

// const chartData = [
//     { label: "chrome", count: 275, fill: "#00BC7D" },
//     { label: "safari", count: 200, fill: "#EF4444" }
// ]

const chartConfig = {} satisfies ChartConfig

type ChartDataItem = {
    label: string
    count: number
    fill: string
}

type PieChartProps = {
    chartData: ChartDataItem[]
}

export default function Piechart({ chartData }: PieChartProps) {
    return (

        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-62.5 w-full"

        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="label"
                    innerRadius={60}
                />
            </PieChart>
        </ChartContainer>
    )
}
