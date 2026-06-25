import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api'

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(null)
    useEffect(()=>{
        API.get('auth/me/')
            .then(res=>{
                setUser(res.data);
            }).catch(()=>{
                setUser(null)
            }).finally(()=>{
                setLoading(false)
            })
    },[]);

    const login = async (username,password) => {
        await API.get('auth/csrf/')
        const res = await API.post('auth/login/',{ username, password })
        setUser(res.data.user)
        return res.data
    };

    const logout = async () => {
        await API.post('auth/logout/')
        setUser(null)
    };

    return(
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);