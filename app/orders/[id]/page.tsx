"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import StatusBadge from "@/components/StatusBadge";
import OrderTypeBadge from "@/components/OrderTypeBadge";

import type { Order } from "@/types/order";

export default function OrderDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = React.use(params);

    const router = useRouter();

    const [order, setOrder] = useState<Order | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api(`/api/orders/${id}`)
            .then(setOrder)
            .catch((error) => {
                console.error("Failed to load order:", error);
                setError("Failed to load order");
            });
    }, [id]);

    if (error) {
        return (
            <div className="p-6 text-red-400">
                {error}
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-6 text-zinc-300">
                Loading order...
            </div>
        );
    }

    const activities = order.activities ?? [];
    const pickAssignments = order.pickAssignments ?? [];

    return (
        <div className="p-6">
            <div className="flex justify-start mb-6">
                <button
                    onClick={() => router.push("/orders")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Back to Orders
                </button>
            </div>

            <h1 className="text-2xl font-semibold text-white mb-6">
                Order #{order.id.slice(0, 6)}
            </h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
                <h2 className="text-xl text-white mb-4">
                    Order Information
                </h2>

                <p className="text-zinc-300 mb-2">
                    <strong>Customer:</strong>{" "}
                    {order.customerName}
                </p>

                <p className="text-zinc-300 mb-2">
                    <strong>Order Type:</strong>{" "}
                    <OrderTypeBadge orderType={order.orderType} />
                </p>

                <p className="text-zinc-300 mb-2">
                    <strong>Status:</strong>{" "}
                    <StatusBadge status={order.status} />
                </p>

                <p className="text-zinc-300 mb-2">
                    <strong>Priority:</strong>{" "}
                    {order.priority}
                </p>

                <p className="text-zinc-300 mb-2">
                    <strong>Dispensed By:</strong>{" "}
                    {order.dispenser?.name ?? "Not dispensed yet"}
                </p>

                <p className="text-zinc-300 mb-2">
                    <strong>Created:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
                <h2 className="text-xl text-white mb-4">
                    Pick Assignments
                </h2>

                {pickAssignments.length === 0 && (
                    <p className="text-zinc-400">
                        No pick assignments yet.
                    </p>
                )}

                <div className="space-y-3">
                    {pickAssignments.map((pick) => (
                        <div
                            key={pick.id}
                            className="border border-zinc-800 rounded-lg p-4 bg-zinc-800/50"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-white font-medium">
                                        {pick.area
                                            .charAt(0)
                                            .toUpperCase() +
                                            pick.area.slice(1)}
                                        {" #"}
                                        {pick.sequence}
                                    </p>

                                    <p className="text-zinc-400 text-sm mt-1">
                                        Associate:{" "}
                                        {pick.associate?.name ??
                                            "Unassigned"}
                                    </p>
                                </div>

                                <span className="text-zinc-300 text-sm">
                                    {pick.status
                                        .split("_")
                                        .map(
                                            (word) =>
                                                word
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                word.slice(1)
                                        )
                                        .join(" ")}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-xl text-white mb-4">
                    Activity Timeline
                </h2>

                {activities.length === 0 && (
                    <p className="text-zinc-400">
                        No activity yet.
                    </p>
                )}

                <ul className="space-y-3">
                    {activities.map((act) => (
                        <li
                            key={act.id}
                            className="border border-zinc-800 rounded-lg p-3 bg-zinc-800/50"
                        >
                            <p className="text-zinc-300">
                                <strong>{act.action}</strong>
                            </p>

                            {act.user?.name && (
                                <p className="text-zinc-400 text-sm mt-1">
                                    By: {act.user.name}
                                </p>
                            )}

                            <p className="text-zinc-500 text-sm">
                                {new Date(
                                    act.createdAt
                                ).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}