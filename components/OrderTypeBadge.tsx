import type { OrderType } from "@/types/order";

const orderTypeStyles: Record<OrderType, string> = {
    pickup: "bg-blue-500/20 text-blue-400",
    delivery: "bg-green-500/20 text-green-400",
    shipping: "bg-purple-500/20 text-purple-400",
};

export default function OrderTypeBadge({
    orderType,
}: {
    orderType: OrderType;
}) {
    const label =
        orderType.charAt(0).toUpperCase() +
        orderType.slice(1);

    return (
        <span
            className={`px-2 py-1 rounded-md text-xs ${orderTypeStyles[orderType]}`}
        >
            {label}
        </span>
    );
}