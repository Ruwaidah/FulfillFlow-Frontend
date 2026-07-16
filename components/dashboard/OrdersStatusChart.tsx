"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { ChartDataItem } from "@/lib/dashboard";

type OrdersStatusChartProps = {
    data: ChartDataItem[];
};

export default function OrdersStatusChart({
    data,
}: OrdersStatusChartProps) {
    return (
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h2 className="text-xl font-medium text-white mb-4">
                Orders by Status
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke="#ccc"
                        angle={-35}
                        textAnchor="end"
                        height={100}
                    />

                    <YAxis stroke="#ccc" />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#18181b",
                            border: "1px solid #3f3f46",
                            borderRadius: "8px",
                            color: "#f4f4f5",
                        }}
                        labelStyle={{
                            color: "#f4f4f5",
                        }}
                        itemStyle={{
                            color: "#60a5fa",
                        }}
                        cursor={{
                            fill: "rgba(63, 63, 70, 0.35)",
                        }}
                    />

                    <Bar
                        dataKey="value"
                        fill="#3b82f6"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}