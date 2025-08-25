import Button from "./Button"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
type UserInput = {
    email: string,
    name: string,
    phoneNumber: number
}
type FormProps = {
    initialValues?: UserInput,
    isLoading?: boolean,
    onSubmit: (data: UserInput) => void
}
const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.number().typeError("Phone number must be a number").required(),
})
const UserForm = ({ initialValues, isLoading, onSubmit }: FormProps) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<UserInput>({
        resolver: yupResolver(schema),
        defaultValues: initialValues || { name: "", email: "", phoneNumber: undefined }
    })

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" {...register("name")} name="name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                <p className="text-red-500 text-sm mt-2">{errors.name?.message}</p>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" {...register("email", { required: true })} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="number" {...register("phoneNumber", { valueAsNumber: true })} name="phoneNumber" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  />
                <label htmlFor="phoneNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                <p className="text-red-500 text-sm mt-2">{errors.phoneNumber?.message}</p>
            </div>
            <div className="flex space-x-3">
                <button disabled={isLoading} type="submit">Save</button>
                <Button label="Cancel" handleClick={() => navigate('/users')} type="secondary" />
            </div>
        </form>

    )
}

export default UserForm
