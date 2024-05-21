import {formatISO9075} from "date-fns";
export default function Post({title, summary, cover, content, createdAt, author}){
    return (
        <div className="post">
            <div className="image">
                {/*<img src={cover} alt=""/>*/}
                <img src={'http://localhost:4000/'+cover} alt=""/>
            </div>
            <div className="texts">
                <h2>{title}</h2>
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

