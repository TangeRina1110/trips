import {Link} from "react-router-dom";
export default function Post({_id, title, summary, cover, content, createdAt, author}){
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                {/*<Link to={'/post/id'}>*/}
                {/*/!*<img src={cover} alt=""/>*!/*/}
                    <img src={`${backendUrl}/`+cover} alt=""/>
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a className="author">{author?.username}</a>
                    <time>{createdAt}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}


// export default function Post({post}){
//     return (
//         <div className="post">
//             <div className="image">
//                 <img
//                     src={post.img}
//                     alt=""/>
//             </div>
//             <div className="texts">
//                 <h2>{post.title}</h2>
//                 <p className="info">
//                     <a className="author"></a>
//                     <time>{post.time}</time>
//                 </p>
//                 <p className="summary">{post.summary}</p>
//             </div>
//         </div>
//     )
// }

