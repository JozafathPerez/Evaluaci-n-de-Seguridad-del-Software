import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { LuLogIn } from "react-icons/lu";
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:3000/login/',
                data: {
                    username: username,
                    password: password
                }
            });
            login(response.data);
            navigate('/home');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert('Usuario invalido');
                } else {
                    console.error(`Error login in (${error.response.status}): \n${error.response.data.message}`);
                }
            } else {
                console.error('Error login in:', error);
            }
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-zinc-800 text-white'>
            <div className='bg-zinc-700 p-8 rounded-3xl'>
                <h2 className='text-2xl mb-4'>Login</h2>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='mb-4 p-2 w-full rounded-lg bg-zinc-800'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='mb-4 p-2 w-full rounded-lg bg-zinc-800'
                />
                <button onClick={handleLogin} className='bg-sky-500 p-2 w-full rounded-lg text-lg'>
                    <LuLogIn className='inline-block mr-3 pb-0.5 text-2xl' />
                    Ingresar
                </button>
            </div>
        </div>
    );
}

export default Login;
