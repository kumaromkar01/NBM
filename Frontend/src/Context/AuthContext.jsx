import { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import { userVerify } from "../services/services.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));


    useEffect(() => {
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        userVerify(token)
            .then(setUser)
            .catch(() => {
                localStorage.removeItem('token');
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, [token]);

    return <>
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    </>
}

export const useAuth = () => { return useContext(AuthContext); }