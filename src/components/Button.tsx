type ButtonProps = {
    label: string,
    handleClick?: () => void,
    type: "primary" | "secondary"
}
const Button = ({ label, handleClick, type }: ButtonProps) => {
    return (
        <button onClick={handleClick} type="button" className={`px-3 py-2 text-xs font-medium text-center ${type == "primary" ? "text-white bg-blue-700 hover:bg-blue-800" : "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800"} rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>{label}</button>
    )
}

export default Button
