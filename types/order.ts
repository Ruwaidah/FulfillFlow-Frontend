export type OrderType =
    | "pickup"
    | "delivery"
    | "shipping";

export type OrderStatus =
    | "created"
    | "pending"
    | "ready_to_pick"
    | "picking"
    | "ready"
    | "dispensed"
    | "out_for_delivery"
    | "shipped"
    | "delivered"
    | "delayed"
    | "canceled"
    | "expired";

export type PickArea =
    | "ambient"
    | "chilled"
    | "frozen"
    | "oversized";

export type PickStatus =
    | "ready_to_pick"
    | "picking"
    | "completed"
    | "canceled";

export type UserSummary = {
    id: string;
    name: string;
};

export type PickAssignment = {
    id: string;

    area: PickArea;
    sequence: number;
    status: PickStatus;

    startedAt: string | null;
    completedAt: string | null;

    associateId: string | null;
    associate: UserSummary | null;
};

export type Activity = {
    id: string;
    action: string;
    fromStatus: string | null;
    toStatus: string | null;
    createdAt: string;

    userId: string | null;

    user?: UserSummary | null;
};

export type ActivityWithOrder = Activity & {
    orderId: string;
    orderStatus: Order["status"];
    orderType: Order["orderType"];
    customerName: string;
};

export type Order = {
    id: string;
    customerName: string;

    orderType: OrderType;
    status: OrderStatus;
    priority: string;

    createdAt: string;
    updatedAt: string;

    pickAssignments?: PickAssignment[];

    dispenserId: string | null;
    dispenser?: UserSummary | null;
    dispensedAt: string | null;

    activities?: Activity[];
};