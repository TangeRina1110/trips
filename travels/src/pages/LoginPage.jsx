import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
   async function login(ev){
       ev.preventDefault();
       const response = await fetch('http://localhost:4000/login', {
         method: 'POST',
         body: JSON.stringify({username, password}),
         headers: {'Content-Type': 'application/json'},
         credentials: 'include',
       }).catch(reason => {alert(reason)});
       if (response.ok){
           response.json().then(userInfo =>{
               setUserInfo(userInfo);
               setRedirect(true);
           });
       } else{
           alert('wrong credentials');
           //alert('registration failed');
       }
   }
   if (redirect) {
       return <Navigate to={'/'} />
   }
    return(
        <div>
            <form className="login" method="POST" onSubmit={login}>
                <h1>Вход</h1>
                <input type="text" placeholder="username" required
                       value={username}
                       onChange={ev => setUsername(ev.target.value)}/>
                <input type="password" placeholder="password" required
                       value={password}
                       onChange={ev => setPassword(ev.target.value)}/>
                <button type="submit">Войти</button>

            </form>
        </div>
    );
}