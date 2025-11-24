import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react"
import { useAuth } from "../context/authContext";
import Layout from "../component/Layout";

    const Home = lazy(() => import('../pages/home'))
    const Login = lazy(() => import('../pages/login'))
    const Register = lazy(() => import('../pages/register'))
    const Welcome = lazy(() => import('../pages/welcome'))
    const Post = lazy(() => import('../pages/post'))
    const MyPost = lazy(() => import('../pages/myPost'))
    const Generator = lazy(() => import('../pages/generator'))

    type RequireAuthTypes = { children: ReactNode,roles?: string[]}

    const RequireAuth = ({ children,roles }: RequireAuthTypes) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }
    
    if (roles && !roles.some((role) => user.roles?.includes(role))) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    )
  }

    return <>{children}</>
    }

    export default function Router() {
    return(
        <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<RequireAuth><Layout /></RequireAuth>}></Route> {/* user logged in but authorized eka adala nh */}
            <Route path="/" element={<Welcome />} />
            <Route path="/post" element={<Post />} />
            <Route path="/my-post" element={ <RequireAuth roles={["admin", "author"]}><MyPost /></RequireAuth>}/> {/* postman eken save krddi dena widihata methanath simple walin denn */}
            <Route path="/generate" element={<Generator />} />

        </Routes>
        </Suspense>
        </BrowserRouter>
    )
}