export default function Navbar() {
    return (
        <header className="w-full bg-white dark:bg-zinc-900 shadow p-4 flex justify-between items-center transition-colors duration-300">
            <h1 className="text-lg font-medium text-gray-900 dark:text-white">
                Welcome, Ruwaidah
            </h1>

            <div className="flex items-center gap-4">
                <span className="text-gray-600 dark:text-gray-300">
                    Team Lead
                </span>

                <div className="w-10 h-10 bg-gray-300 dark:bg-zinc-700 rounded-full" />
            </div>
        </header>
    )
}
