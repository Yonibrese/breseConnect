// frontend/src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // 🔌 Consume our new global Auth state and router navigation
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // 🔐 Context login handles fetching the CSRF token AND posting credentials
            await login(username, password);
            
            // 🚀 If successful, route straight to the protected dashboard
            navigate('/');
        } catch (err) {
            // Keep the exact error logic we verified earlier
            setError(err.response?.data?.detail || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="card-title text-center mb-4 text-primary fw-bold">breseConnect</h3>
                
                {/* Error Banner Alert */}
                {error && <div className="alert alert-danger py-2 small shadow-sm">{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label small text-muted fw-semibold">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small text-muted fw-semibold">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-2 fw-semibold shadow-sm">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;