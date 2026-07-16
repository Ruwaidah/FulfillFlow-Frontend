"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { ChartDataItem } from "@/lib/dashboard";

type OrdersTypeChartProps = {
    data: ChartDataItem[];
};

const COLORS = [
    "#3b82f6",
    "#10b981",
    "#8b5cf6",
];

const EMPTY_COLOR = "#3f3f46";

export default function OrdersTypeChart({
    data,
}: OrdersTypeChartProps) {
    const total = data.reduce(
        (sum, item) => sum + item.value,
        0
    );

    const isEmpty = total === 0;

    const chartData = isEmpty
        ? [
            {
                name: "No orders",
                value: 1,
            },
        ]
        : data;

    return (
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h2 className="text-xl font-medium text-white mb-4">
                Orders by Type
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={40}
                        label={!isEmpty}
                        stroke="none"
                    >
                        {chartData.map((item, index) => (
                            <Cell
                                key={item.name}
                                fill={
                                    isEmpty
                                        ? EMPTY_COLOR
                                        : COLORS[
                                        index %
                                        COLORS.length
                                        ]
                                }
                            />
                        ))}
                    </Pie>

                    {!isEmpty && (
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
                        />
                    )}
                </PieChart>
            </ResponsiveContainer>

            {isEmpty && (
                <p className="text-center text-zinc-500 text-sm -mt-8">
                    No orders for the selected dates.
                </p>
            )}
        </div>
    );
}