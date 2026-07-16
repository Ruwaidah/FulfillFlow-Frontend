"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker, { DateObject } from "react-multi-date-picker";

import { api } from "@/lib/api";
import {
    getOrderStats,
    getStatusChartData,
    getTypeChartData,
} from "@/lib/dashboard";

import DashboardCard from "@/components/dashboard/DashboardCard";
import OrdersStatusChart from "@/components/dashboard/OrdersStatusChart";
import OrdersTypeChart from "@/components/dashboard/OrdersTypeChart";

import type { Order } from "@/types/order";

export default function DashboardPage() {
    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedDates, setSelectedDates] = useState<DateObject[]>([
        new DateObject(),
    ]);

    useEffect(() => {
        api("/api/orders")
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error("Failed to load orders:", error);
                setError("Failed to load orders");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredOrders =
        selectedDates.length === 0
            ? orders
            : orders.filter((order) => {
                const orderDate = formatLocalDate(new Date(order.createdAt));

                const selectedDateStrings = selectedDates.map((date) =>
                    date.format("YYYY-MM-DD")
                );

                return selectedDateStrings.includes(orderDate);
            });

    if (loading) {
        return (
            <div className="p-6 text-zinc-300">
                Loading dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-400">
                {error}
            </div>
        );
    }

    const stats = getOrderStats(filteredOrders);
    const statusData = getStatusChartData(stats);
    const typeData = getTypeChartData(stats);
    console.log(stats)

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">
                    Dashboard
                </h1>

                <button
                    onClick={() => router.push("/orders")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go to Orders
                </button>
            </div>

            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h2 className="text-lg font-medium text-white">
                            Filter by Date
                        </h2>

                        <p className="text-sm text-zinc-500 mt-1">
                            Select one or multiple dates
                        </p>
                    </div>

                    {selectedDates.length > 0 && (
                        <button
                            onClick={() => setSelectedDates([])}
                            className="text-sm text-blue-400 hover:text-blue-300 transition"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <DatePicker
                    multiple
                    value={selectedDates}
                    onChange={(dates) => {
                        setSelectedDates(dates as DateObject[]);
                    }}
                    format="YYYY-MM-DD"
                    calendarPosition="bottom-left"
                    className="dark"
                    inputClass="
                    w-64
                    px-4
                    py-2.5
                    rounded-lg
                    bg-zinc-800
                    border
                    border-zinc-700
                    text-zinc-200
                    placeholder:text-zinc-500
                    focus:outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    transition
                    cursor-pointer"
                    placeholder="Select dates"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard
                    label="Total Orders"
                    value={stats.totalOrders}
                />

                <DashboardCard
                    label="Created"
                    value={stats.created}
                />

                <DashboardCard
                    label="Pending"
                    value={stats.pending}
                />

                <DashboardCard
                    label="Ready to Pick"
                    value={stats.readyToPick}
                />

                <DashboardCard
                    label="Picking"
                    value={stats.picking}
                />

                <DashboardCard
                    label="Ready"
                    value={stats.ready}
                />

                <DashboardCard
                    label="Completed"
                    value={stats.completed}
                />

                <DashboardCard
                    label="Delayed"
                    value={stats.delayed}
                />

                <DashboardCard
                    label="Canceled"
                    value={stats.canceled}
                />

                <DashboardCard
                    label="Expired"
                    value={stats.expired}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrdersStatusChart data={statusData} />

                <OrdersTypeChart data={typeData} />
            </div>

            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <h2 className="text-xl font-medium text-white mb-2">
                    Recent Activity
                </h2>

                <p className="text-zinc-400">
                    Recent order activity will appear here.
                </p>
            </div>
        </div>
    );
}


function formatLocalDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}