import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header(){
    const {setUserInfo,userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response =>{
            response.json().then(userInfo =>{
                setUserInfo(userInfo);
                console.log(userInfo);
            });
        });
    }, []);

    function logout(){
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }
    console.log(userInfo);
    const username = userInfo?.username;
    return (
        <header>
            <Link to="/" className="logo">Журнал путешествий</Link>
            <nav>
                {username &&(
                    <>
                        <span style={{color: "orange"}}>Добро пожаловать, {username}</span>
                        <Link to="/create">Написать новый пост</Link>
                        <a onClick={logout}>Выйти</a>
                    </>

                )}
                {!username && (
                    <>
                        <Link to="/login">Вход</Link>
                        <Link to="/register">Регистрация</Link>
                    </>
                )}

            </nav>
        </header>
    );
}
