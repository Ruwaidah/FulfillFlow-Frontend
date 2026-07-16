"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { Order, ActivityWithOrder } from "@/types/order";
import { ActivityItem } from "@/components/ActivityItem";


export default function ActivityPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        api("/api/orders")
            .then((data: Order[]) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error("Failed to load activity:", error);
                setError("Failed to load activity");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const activities = useMemo<ActivityWithOrder[]>(() => {
        return orders
            .flatMap((order) =>
                (order.activities ?? []).map((activity) => ({
                    ...activity,
                    orderId: order.id,
                    orderStatus: order.status,
                    orderType: order.orderType,
                    customerName: order.customerName,
                }))
            )
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            );
    }, [orders]);

    if (loading) {
        return (
            <div className="p-6 text-zinc-300">
                Loading activity...
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

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold text-white">
                Activity Log
            </h1>

            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <h2 className="text-xl font-medium text-white mb-4">
                    Recent Activity
                </h2>

                {activities.length === 0 ? (
                    <p className="text-zinc-400">
                        No recent activity.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {activities.map((activity) => (
                            <ActivityItem
                                key={activity.id}
                                activity={activity}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

