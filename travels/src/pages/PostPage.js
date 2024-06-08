import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {UserContext} from "../UserContext";
import Comment from "../Comment";

export default function PostPage(){
     const [postInfo,setPostInfo] = useState(null);
     const {userInfo} = useContext(UserContext);
     const {id} = useParams();
     const[comments, setComments] = useState([]);
     const[commentText,setCommentText] = useState('');
     const [commentSend, setCommentSend] = useState(false);
     useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(postInfo => {
                setPostInfo(postInfo);
            })
            .catch(error => {
                console.error('Failed to fetch post:', error);
            });
     }, [id]);
    useEffect(() => {
        fetch('http://localhost:4000/comment?post='+id).then(response => {
            response.json().then(comments => {
                setComments(comments);

            });
        });
    }, [id,commentSend]);
    async function createComment(ev){

        ev.preventDefault();
        const response = await fetch('http://localhost:4000/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: commentText,
                post: id // Ensure this is the correct post ID
            }),
            credentials: 'include',
        });
        if (response.ok){
            setCommentSend(true);
        }
    }
     if (!postInfo) return '';
    return(
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{postInfo.createdAt}</time>
            <div className="author">by @{postInfo.author?.username}</div>
            {userInfo?.id === postInfo.author?._id && (
            // {userInfo.id === postInfo.author?.id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Редактировать пост</Link>
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: postInfo.content}}/>
            <div className="commentHolder">
                {
                    comments.map((comment,index) => {
                        return (<Comment {...comment} key={index}/>);
                    })
                }
            </div>
            {userInfo?.id !== undefined ? (
                <form onSubmit={createComment} method="POST">
                    <textarea placeholder="Оставить комментарий" value={commentText} onChange={ev => {setCommentText(ev.target.value);setCommentSend(false)}} required></textarea>

                    <button type="submit" >Отправить</button>
                </form>
            ): <Link to={'/login'}>Войдите, чтобы оставить комментарий</Link>
            }
        </div>
    );
}

