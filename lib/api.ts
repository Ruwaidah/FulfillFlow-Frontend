export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";




export async function api<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    let res = await fetch(`${API_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        await new Promise((resolve) =>
            setTimeout(resolve, 3000)
        );

        res = await fetch(`${API_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });
    }

    if (!res.ok) {
        throw new Error(
            `API request failed: ${res.status}`
        );
    }

    return res.json();
}