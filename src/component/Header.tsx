import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export default function Header() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/login")
  }

  return (
    <header>
      <div>
        <Link to="/home">
          Home
        </Link>
        <Link to="/post">
          Posts
        </Link>
        {(user?.roles?.includes("ADMIN") ||
          user?.roles?.includes("AUTHOR")) && (
          <Link to="/my-post">
            My Posts
          </Link>
        )}
      </div>
      <div>
        <span>{user?.email}</span>
        <button
          onClick={handleLogout}>Logout
        </button>
      </div>
    </header>
  )
}