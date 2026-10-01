"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StatusBadge from "@/components/StatusBadge";
import { api } from "@/lib/api";

import type {
    Order,
    OrderStatus,
} from "@/types/order";

const ORDERS_PER_PAGE = 25;

export default function OrdersPage() {
    const router = useRouter();

    const [filter, setFilter] = useState<
        "all" | OrderStatus
    >("all");

    const [typeFilter, setTypeFilter] = useState<
        "all" | "pickup" | "delivery" | "shipping"
    >("all");

    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        api<Order[]>("/api/orders")
            .then((data: Order[]) => {
                console.log(
                    "FRONTEND ORDERS:",
                    data.slice(0, 5)
                );

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

    const typeButtons: Array<{
        key:
        | "all"
        | "pickup"
        | "delivery"
        | "shipping";
        label: string;
        icon: string;
    }> = [
            {
                key: "all",
                label: "All",
                icon: "⭐",
            },
            {
                key: "pickup",
                label: "Pickup",
                icon: "🛒",
            },
            {
                key: "delivery",
                label: "Delivery",
                icon: "🚚",
            },
            {
                key: "shipping",
                label: "Shipping",
                icon: "📦",
            },
        ];

    const filterButtons: Array<
        "all" | OrderStatus
    > = [
            "all",
            "created",
            "pending",
            "ready_to_pick",
            "picking",
            "ready",
            "dispensed",
            "out_for_delivery",
            "shipped",
            "delivered",
            "delayed",
            "canceled",
            "expired",
        ];

    const filteredOrders = orders
        .filter((order) =>
            filter === "all"
                ? true
                : order.status === filter
        )
        .filter((order) =>
            typeFilter === "all"
                ? true
                : order.orderType === typeFilter
        )
        .filter((order) => {
            const searchValue = search
                .trim()
                .toLowerCase();

            if (!searchValue) {
                return true;
            }

            return (
                order.customerName
                    .toLowerCase()
                    .includes(searchValue) ||
                order.id
                    .toLowerCase()
                    .includes(searchValue)
            );
        });

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredOrders.length /
            ORDERS_PER_PAGE
        )
    );

    const startIndex =
        (currentPage - 1) * ORDERS_PER_PAGE;

    const endIndex =
        startIndex + ORDERS_PER_PAGE;

    const paginatedOrders = filteredOrders.slice(
        startIndex,
        endIndex
    );

    function resetPage() {
        setCurrentPage(1);
    }

    function formatStatusLabel(
        status: string
    ) {
        return status
            .split("_")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-white">
                    Orders
                </h1>

                <p className="text-sm text-zinc-400">
                    {filteredOrders.length}{" "}
                    {filteredOrders.length === 1
                        ? "order"
                        : "orders"}
                </p>
            </div>

            {/* STATUS FILTERS */}
            <div className="flex gap-3 mb-4 flex-wrap">
                {filterButtons.map((type) => (
                    <button
                        key={type}
                        onClick={() => {
                            setFilter(type);
                            resetPage();
                        }}
                        className={`
                            px-4
                            py-2
                            rounded-lg
                            text-sm
                            transition
                            ${filter === type
                                ? "bg-blue-600 text-white"
                                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                            }
                        `}
                    >
                        {formatStatusLabel(type)}
                    </button>
                ))}
            </div>

            {/* TYPE FILTERS */}
            <div className="flex gap-3 mb-6 flex-wrap">
                {typeButtons.map((btn) => (
                    <button
                        key={btn.key}
                        onClick={() => {
                            setTypeFilter(btn.key);
                            resetPage();
                        }}
                        className={`
                            px-4
                            py-2
                            rounded-lg
                            flex
                            items-center
                            gap-2
                            text-sm
                            transition
                            ${typeFilter === btn.key
                                ? "bg-green-600 text-white"
                                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                            }
                        `}
                    >
                        <span>{btn.icon}</span>
                        <span>{btn.label}</span>
                    </button>
                ))}
            </div>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search by customer name or order ID..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    resetPage();
                }}
                className="
                    px-4
                    py-2.5
                    bg-zinc-800
                    text-zinc-200
                    border
                    border-zinc-700
                    rounded-lg
                    w-full
                    mb-4
                    focus:outline-none
                    focus:border-blue-500
                "
            />

            {/* TABLE */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-800 text-zinc-400 text-sm">
                            <tr>
                                <th className="py-3 px-4">
                                    Order ID
                                </th>

                                <th className="py-3 px-4">
                                    Customer
                                </th>

                                <th className="py-3 px-4">
                                    Type
                                </th>

                                <th className="py-3 px-4">
                                    Status
                                </th>

                                <th className="py-3 px-4">
                                    Placed At
                                </th>

                                <th className="py-3 px-4">
                                    Scheduled For
                                </th>

                                <th className="py-3 px-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-zinc-300 text-sm">
                            {loading && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-10 text-center text-zinc-500"
                                    >
                                        Loading orders...
                                    </td>
                                </tr>
                            )}

                            {error && !loading && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-10 text-center text-red-400"
                                    >
                                        {error}
                                    </td>
                                </tr>
                            )}

                            {!loading &&
                                !error &&
                                filteredOrders.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-10 text-center text-zinc-500"
                                        >
                                            No orders found.
                                        </td>
                                    </tr>
                                )}

                            {!loading &&
                                !error &&
                                paginatedOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                                    >
                                        <td className="py-3 px-4 font-medium text-zinc-200">
                                            #{order.id.slice(0, 8)}
                                        </td>

                                        <td className="py-3 px-4">
                                            {order.customerName}
                                        </td>

                                        <td className="py-3 px-4 capitalize">
                                            {order.orderType}
                                        </td>

                                        <td className="py-3 px-4">
                                            <StatusBadge
                                                status={order.status}
                                            />
                                        </td>

                                        <td className="py-3 px-4 whitespace-nowrap">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </td>

                                        <td className="py-3 px-4 whitespace-nowrap">
                                            {order.scheduledFor
                                                ? new Date(
                                                    order.scheduledFor
                                                ).toLocaleString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                    }
                                                )
                                                : "Not scheduled"}
                                        </td>

                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/orders/${order.id}`
                                                    )
                                                }
                                                className="text-blue-400 hover:text-blue-300 hover:underline"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PAGINATION */}
            {!loading &&
                !error &&
                filteredOrders.length > 0 && (
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-zinc-500">
                            Showing{" "}
                            {startIndex + 1}–
                            {Math.min(
                                endIndex,
                                filteredOrders.length
                            )}{" "}
                            of{" "}
                            {
                                filteredOrders.length
                            }{" "}
                            orders
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() =>
                                    setCurrentPage(
                                        (page) =>
                                            Math.max(
                                                page - 1,
                                                1
                                            )
                                    )
                                }
                                disabled={
                                    currentPage === 1
                                }
                                className="
                                    px-4
                                    py-2
                                    rounded-lg
                                    bg-zinc-800
                                    text-zinc-300
                                    hover:bg-zinc-700
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >
                                Prev
                            </button>

                            <span className="text-sm text-zinc-400">
                                Page{" "}
                                <span className="text-white">
                                    {currentPage}
                                </span>{" "}
                                of {totalPages}
                            </span>

                            <button
                                onClick={() =>
                                    setCurrentPage(
                                        (page) =>
                                            Math.min(
                                                page + 1,
                                                totalPages
                                            )
                                    )
                                }
                                disabled={
                                    currentPage ===
                                    totalPages
                                }
                                className="
                                    px-4
                                    py-2
                                    rounded-lg
                                    bg-zinc-800
                                    text-zinc-300
                                    hover:bg-zinc-700
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
}