import { useAuth } from "@/contexts/AuthContext";

export default function AdminOnly({ children }) {
    const { user } = useAuth()

    if (!user?.admin) return null
    return children;
}