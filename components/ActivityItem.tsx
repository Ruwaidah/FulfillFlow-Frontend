import StatusBadge from "./StatusBadge";
import { ActivityWithOrder } from "@/types/order";
import { useRouter } from "next/navigation";


export function ActivityItem({
    activity,
}: {
    activity: ActivityWithOrder;
}) {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() =>
                router.push(`/orders/${activity.orderId}`)
            }
            className="
                w-full
                text-left
                bg-zinc-900
                border
                border-zinc-800
                rounded-xl
                overflow-hidden
                hover:border-blue-500/50
                hover:bg-zinc-800/40
                transition
            "
        >
            <div className="flex">
                <div className="w-1 bg-blue-500" />

                <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-white font-semibold">
                                {activity.action}
                            </p>

                            <p className="text-zinc-400 text-sm mt-1">
                                {activity.customerName}
                            </p>

                            <div className="flex items-center gap-2 mt-2">
                                <p className="text-zinc-500 text-xs">
                                    Order #{activity.orderId.slice(0, 8)}
                                </p>

                                <span className="text-zinc-700">
                                    •
                                </span>

                                <span className="text-xs text-zinc-400 capitalize">
                                    {activity.orderType}
                                </span>
                            </div>
                        </div>

                        <StatusBadge
                            status={activity.orderStatus}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-800">
                        <p className="text-zinc-500 text-sm">
                            {new Date(
                                activity.createdAt
                            ).toLocaleString()}
                        </p>

                        {activity.user?.name && (
                            <p className="text-sm text-zinc-400">
                                Associate:{" "}
                                <span className="text-white">
                                    {activity.user.name}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </button>
    );
}