import React, {useState, useEffect} from 'react'
import API from './api'


function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(()=>{
        API.get('auth/csrf/')
            .then(res=>console.log(res.data.detail))
            .catch(err => console.error("failed to create the CSRF token", err));
    },[]);

    const handleLogin = async (e) =>{
        e.preventDefault();
        setError('');
        try{
            const response = await API.post('auth/login/', {username, password});
            console.log(response.data)
            alert(`Welcome Back ${response.data.username}. cookie session established`)
        }catch(err){
            console.error("Login Catch Triggered. Raw Error Object:", err);
            setError(err.response?.data?.detail || "unexpeted error occured")
        }
    };

    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="card-title text-center mb-4 text-primary">breseConnect</h3>
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label small text-muted">Username</label>
                        <input
                            type="text"
                            className='form-control'
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small text-muted">Password</label>
                        <input
                            type='password'
                            className='form-control'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login