import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Table from "../components/Table"
import { useUsers } from "../hooks/useUsers"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import SearchInput from "../components/SearchInput"

const Index = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [pageNumber, setpageNumber] = useState(1)
    const [searchValue, setSearchValue] = useState<string>("")
    const { data, isLoading, isError, error } = useUsers(pageNumber, searchValue);
    const handleEdit = (id: number) => {
        navigate(`/users/edit/${id}`)
    }
    const deleteData = (id: number) => {
        return axios.delete(`http://localhost:3000/users/${id}`)
    }
    const deleteMutation = useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        }
    })
    const handleDelete = (id: number) => {
        deleteMutation.mutate(id)
    }

    const handleNextPage = () => {
        setpageNumber((page) => page + 1)
    }

    const handlePreviousPage = () => {
        setpageNumber((page) => page - 1)
    }

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // queryClient.invalidateQueries({ queryKey: ["users", pageNumber, searchValue] })
    }
    return (
        <div className="m-6 flex flex-col space-y-6">
            <div className="flex justify-between px-8">
                <p className="text-xl font-semibold">Users</p>
                <Button type="primary" label="Create" handleClick={() => navigate("create")} />
            </div>
            <div>
                <div className="m-6"><SearchInput searchValue={searchValue} handleSearchInput={handleSearchInput} handleSearch={handleSearchSubmit} /></div>
                <Table data={data} isLoading={isLoading}
                    isError={isError}
                    error={error?.message}
                    pageNumber={pageNumber}
                    nextPage={handleNextPage}
                    previousPage={handlePreviousPage}
                    onEdit={handleEdit}
                    onDelete={handleDelete} />
            </div>
        </div>
    )
}

export default Index
