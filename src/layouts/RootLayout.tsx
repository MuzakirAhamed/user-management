import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

const RootLayout = () => {
  const theme = useContext(ThemeContext)
  return (
    <div className={`${theme?.theme == "dark" ? "bg-slate-950 text-white" : "bg-white text-black"}`}>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default RootLayout
