import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import UserForm from "../components/UserForm"

type UserInput = {
  email: string,
  name: string,
  phoneNumber: number
}
const Create = () => {
  const navigate = useNavigate()
  const storeDatas = async (data: UserInput) => {
    const response = await axios.post('http://localhost:3000/users', data)
    return response.data
  }
  const createMutation = useMutation({
    mutationFn: storeDatas,
    onSuccess: () => {
      navigate("/users")
    }
  })
  const handleStore = (data: UserInput) => {
    createMutation.mutate(data)
  }
  return (
    <div className="m-6 flex flex-col space-y-4">
      <p className="text-xl font-semibold">Create User</p>
      <div>
        <UserForm onSubmit={handleStore} isLoading={createMutation.isPending} />
      </div>
    </div>
  )
}

export default Create
