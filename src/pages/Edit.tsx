import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../hooks/useUsers"
import UserForm from "../components/UserForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
type UserInput = {
  email: string,
  name: string,
  phoneNumber: number
}
const Edit = () => {
  const { id } = useParams<string>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useUser(Number(id))
  const updateDatas = async (data: UserInput) => {
    const response = await axios.put(`http://localhost:3000/users/${id}`, data)
    return response.data
  }
  const updateMutation = useMutation({
    mutationFn: updateDatas,
    onSuccess: () => {
      navigate('/users')
      queryClient.invalidateQueries({ queryKey: ["users", Number(id)] })
    }
  })
  if (isLoading) {
    return <p>Loading data...</p>
  }
  if (isError) {
    return <p>{error?.message}</p>
  }

  const handleUpdate = (data: UserInput) => {
    updateMutation.mutate(data)
  }
  return (
    <div className="m-6 flex flex-col space-y-4">
      <p className="text-xl font-semibold">Edit User</p>
      <div>
        <UserForm initialValues={data} onSubmit={handleUpdate} />
      </div>
    </div>
  )
}

export default Edit
