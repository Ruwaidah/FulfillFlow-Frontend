import type { Order } from "@/types/order";

export type OrderStats = {
    totalOrders: number;

    created: number;
    pending: number;
    readyToPick: number;
    picking: number;
    ready: number;

    dispensed: number;
    outForDelivery: number;
    delivered: number;
    shipped: number;

    delayed: number;
    canceled: number;
    expired: number;

    completed: number;

    pickup: number;
    delivery: number;
    shipping: number;
};

export type ChartDataItem = {
    name: string;
    value: number;
};

export function getOrderStats(
    orders: Order[]
): OrderStats {
    const created = orders.filter(
        (order) => order.status === "created"
    ).length;

    const pending = orders.filter(
        (order) => order.status === "pending"
    ).length;

    const readyToPick = orders.filter(
        (order) => order.status === "ready_to_pick"
    ).length;

    const picking = orders.filter(
        (order) => order.status === "picking"
    ).length;

    const ready = orders.filter(
        (order) => order.status === "ready"
    ).length;

    const dispensed = orders.filter(
        (order) => order.status === "dispensed"
    ).length;

    const outForDelivery = orders.filter(
        (order) => order.status === "out_for_delivery"
    ).length;

    const delivered = orders.filter(
        (order) => order.status === "delivered"
    ).length;

    const shipped = orders.filter(
        (order) => order.status === "shipped"
    ).length;

    const delayed = orders.filter(
        (order) => order.status === "delayed"
    ).length;

    const canceled = orders.filter(
        (order) => order.status === "canceled"
    ).length;

    const expired = orders.filter(
        (order) => order.status === "expired"
    ).length;

    const pickup = orders.filter(
        (order) => order.orderType === "pickup"
    ).length;

    const delivery = orders.filter(
        (order) => order.orderType === "delivery"
    ).length;

    const shipping = orders.filter(
        (order) => order.orderType === "shipping"
    ).length;

    const completed =
        dispensed +
        delivered +
        shipped;

    return {
        totalOrders: orders.length,

        created,
        pending,
        readyToPick,
        picking,
        ready,

        dispensed,
        outForDelivery,
        delivered,
        shipped,

        delayed,
        canceled,
        expired,

        completed,

        pickup,
        delivery,
        shipping,
    };
}

export function getStatusChartData(
    stats: OrderStats
): ChartDataItem[] {
    return [
        {
            name: "Created",
            value: stats.created,
        },
        {
            name: "Pending",
            value: stats.pending,
        },
        {
            name: "Ready to Pick",
            value: stats.readyToPick,
        },
        {
            name: "Picking",
            value: stats.picking,
        },
        {
            name: "Ready",
            value: stats.ready,
        },
        {
            name: "Dispensed",
            value: stats.dispensed,
        },
        {
            name: "Out for Delivery",
            value: stats.outForDelivery,
        },
        {
            name: "Delivered",
            value: stats.delivered,
        },
        {
            name: "Shipped",
            value: stats.shipped,
        },
        {
            name: "Delayed",
            value: stats.delayed,
        },
        {
            name: "Canceled",
            value: stats.canceled,
        },
        {
            name: "Expired",
            value: stats.expired,
        },
    ];
}

export function getTypeChartData(
    stats: OrderStats
): ChartDataItem[] {
    return [
        {
            name: "Pickup",
            value: stats.pickup,
        },
        {
            name: "Delivery",
            value: stats.delivery,
        },
        {
            name: "Shipping",
            value: stats.shipping,
        },
    ];
}