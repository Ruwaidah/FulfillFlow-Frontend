import type { OrderStatus } from "@/types/order";

const statusStyles: Record<OrderStatus, string> = {
    created: "bg-emerald-500/20 text-emerald-300",
    pending: "bg-yellow-500/20 text-yellow-400",
    ready_to_pick: "bg-orange-500/20 text-orange-400",
    picking: "bg-blue-500/20 text-blue-400",
    ready: "bg-purple-500/20 text-purple-400",
    dispensed: "bg-cyan-500/20 text-cyan-400",
    out_for_delivery: "bg-sky-500/20 text-sky-400",
    shipped: "bg-indigo-500/20 text-indigo-400",
    delivered: "bg-green-500/20 text-green-400",
    delayed: "bg-amber-500/20 text-amber-300",
    canceled: "bg-red-500/20 text-red-400",
    expired: "bg-rose-500/20 text-rose-400",
};

export default function StatusBadge({
    status,
}: {
    status: OrderStatus;
}) {
    const label = status
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");

    return (
        <span
            className={`px-2 py-1 rounded-md text-xs ${statusStyles[status]}`}
        >
            {label}
        </span>
    );
}