export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";


export async function api(path: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { "Content-type": "application/json" },
        ...options
    });
    return res.json()
}