type DashboardCardProps = {
    label: string;
    value: number;
};

export default function DashboardCard({
    label,
    value,
}: DashboardCardProps) {
    return (
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <p className="text-zinc-400 text-sm">
                {label}
            </p>

            <p className="text-2xl font-semibold text-white mt-1">
                {value}
            </p>
        </div>
    );
}