import Post from "../Post";
import {useEffect, useState} from "react";
export default function IndexPage() {
    const [posts,setPosts] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        if (search === ''){
            fetch('http://localhost:4000/post').then(response => {
                response.json().then(posts => {
                    setPosts(posts);

                });
            });
        } else{
            fetch('http://localhost:4000/post?search='+search).then(response => {
                response.json().then(posts => {
                    setPosts(posts);

                });
            });
        }

    }, [search]);

    return (
        <div>
            <form className="login">
                <input name="search" type='text' value={search} onChange={ev => setSearch(ev.target.value)} required/>

            </form>
            <div className="postHolder">
                {/*{posts.map(post =>(<Post />))}*/}
                {posts.length > 0 && posts.map( ( post,index) => {
                    return (<Post {...post} key={index}/>);
                })}
            </div>

        </div>
    );
}




