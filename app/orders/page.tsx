"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { api } from "@/lib/api";
import type { Order } from "@/types/order";
import { OrderStatus } from "@/types/order";


export default function OrdersPage() {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter()
    const [typeFilter, setTypeFilter] = useState<"all" | "pickup" | "delivery" | "shipping">("all");


    useEffect(() => {
        api("/api/orders")
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to load orders");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const typeButtons: Array<{ key: "all" | "pickup" | "delivery" | "shipping"; label: string; icon: string }> = [
        { key: "all", label: "All", icon: "⭐" },
        { key: "pickup", label: "Pickup", icon: "🛒" },
        { key: "delivery", label: "Delivery", icon: "🚚" },
        { key: "shipping", label: "Shipping", icon: "📦" },
    ];



    // Filter orders
    const filteredOrders = orders
        // STATUS FILTER
        .filter(order =>
            filter === "all" ? true : order.status === filter
        )
        // TYPE FILTER
        .filter(order =>
            typeFilter === "all" ? true : order.orderType === typeFilter
        )
        // SEARCH FILTER
        .filter(order =>
            search.trim() === ""
                ? true
                : order.customerName.toLowerCase().includes(search.toLowerCase()) ||
                order.id.toLowerCase().includes(search.toLowerCase())
        );



    console.log(filteredOrders)

    const filterButtons: Array<"all" | OrderStatus> = [
        "all",
        "created",
        "pending",
        "ready_to_pick",
        "picking",
        "ready",
        "dispensed",
        "delivered",
        "delayed",
        "canceled",
        "expired",
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-white mb-6">
                Orders
            </h1>

            {/* STATUS FILTER BUTTONS */}
            <div className="flex gap-3 mb-4">
                {filterButtons.map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-lg text-zinc-300 hover:bg-zinc-700
                ${filter === type ? "bg-blue-600 text-white" : "bg-zinc-800"}
            `}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {/* TYPE FILTER BUTTONS */}
            <div className="flex gap-3 mb-6">
                {typeButtons.map(btn => (
                    <button
                        key={btn.key}
                        onClick={() => setTypeFilter(btn.key)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-zinc-300 hover:bg-zinc-700
                ${typeFilter === btn.key ? "bg-green-600 text-white" : "bg-zinc-800"}
            `}
                    >
                        <span>{btn.icon}</span>
                        <span>{btn.label}</span>
                    </button>
                ))}
            </div>

            <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg w-full mb-4"
            />

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-800 text-zinc-400 text-sm">
                        <tr>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Type</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-zinc-300 text-sm">
                        {loading && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-8 text-center text-zinc-500"
                                >
                                    Loading orders...
                                </td>
                            </tr>
                        )}

                        {error && !loading && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-8 text-center text-red-400"
                                >
                                    {error}
                                </td>
                            </tr>
                        )}

                        {!loading && !error && filteredOrders.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-8 text-center text-zinc-500"
                                >
                                    No orders found.
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            !error &&
                            filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                                >
                                    <td className="py-3 px-4">
                                        #{order.id.slice(0, 8)}
                                    </td>

                                    <td className="py-3 px-4">
                                        {order.customerName}
                                    </td>

                                    <td className="py-3 px-4">
                                        <StatusBadge status={order.status} />
                                    </td>

                                    <td className="py-3 px-4">
                                        {order.orderType}
                                    </td>

                                    <td className="py-3 px-4">
                                        {new Date(order.createdAt).toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            }
                                        )}
                                    </td>

                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => router.push(`/orders/${order.id}`)}
                                            className="text-blue-400 hover:underline"
                                        >
                                            View
                                        </button>

                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mt-4 gap-2">
                <button className="px-3 py-1 rounded bg-zinc-800 text-zinc-400 hover:bg-zinc-700">
                    Prev
                </button>

                <button className="px-3 py-1 rounded bg-zinc-800 text-zinc-400 hover:bg-zinc-700">
                    Next
                </button>
            </div>
        </div>
    );
}