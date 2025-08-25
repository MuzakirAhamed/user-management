import Button from "./Button"
type UserInput = {
    id: number
    email: string,
    name: string,
    phoneNumber: number
}
type TableProps = {
    data: UserInput[] | undefined,
    isLoading?: boolean,
    isError?: boolean,
    error?: string,
    pageNumber?: number,
    nextPage?: () => void,
    previousPage?: () => void,
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}
const Table = ({ data, isLoading, isError, error, pageNumber, nextPage, previousPage, onEdit, onDelete }: TableProps) => {
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>{error}</p>
    }
    return (
        <div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => {
                            return (<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.id}
                                </th>
                                <td className="px-6 py-4">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4">
                                    {item.phoneNumber}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <Button handleClick={() => onEdit?.(item.id)} label="Edit 📝" type="primary" />
                                        <Button handleClick={() => onDelete?.(item.id)} label="Delete 🗑️" type="secondary" />
                                    </div>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>

                <div className="flex items-center space-x-2 mt-8 float-right">
                    <button disabled={pageNumber == 1} onClick={previousPage} className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Previous
                    </button>
                    <p className="text-xl">{pageNumber}</p>
                    <button disabled={pageNumber == data?.length} onClick={nextPage} className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Table
