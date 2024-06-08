import {useState} from "react";
export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    async function register(ev){
        ev.preventDefault();
        const response = await fetch(`${backendUrl}/register`, {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,

        });
        if (response.status === 200){
            alert('registration successful');
        } else{
            alert('registration failed');
        }
    }
    return(
        <form className="register" onSubmit={register} method="POST">
            <h1>Регистрация</h1>
            <input type="text" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} required/>
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} required/>
            <button type="submit">Зарегистрироваться</button>
        </form>

    );
}