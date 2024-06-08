
import {Link} from "react-router-dom";
export default function Comment({_id, text, createdAt, author}){

    return (
        <div className="post">
            <div className="texts">
                <p className="info">
                    <a className="author">{author?.username}</a>
                    <time>{createdAt}</time>
                </p>
                <p className="summary">{text}</p>
            </div>
        </div>
    );
}


