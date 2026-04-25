import { useQuery } from "@tanstack/react-query"

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('https://randomuser.me/api/?results=30&seed;=sipy');
            const data = await response.json();
            return data.results.sort((a: any, b: any) =>
                a.name.last.localeCompare(b.name.last)
            );
        },
    });
};