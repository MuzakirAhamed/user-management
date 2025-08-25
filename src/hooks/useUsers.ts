import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"

type UserInput = {
    id: number
    email: string,
    name: string,
    phoneNumber: number
}
export const useUsers = (page: number, searchValue: string) => {
    return useQuery<UserInput[]>({
        queryKey: ["users", page, searchValue],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/users/?_limit=5&_page=${page}&q=${searchValue}`);
            return data;
        },
        placeholderData: keepPreviousData
    });
};

export const useUser = (id: number) => {
    return useQuery<UserInput>({
        queryKey: ["users", id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/users/${id}`)
            return data
        }
    })
}
