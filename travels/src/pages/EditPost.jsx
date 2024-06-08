import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";

export default function EditPost(){
    const{id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [cover, setCover]=useState('');
    const [redirect, setRedirect] = useState(false);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;


    useEffect(() => {
        fetch(`${backendUrl}/post/`+id)
            .then(response =>{
                response.json().then(postInfo =>{
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                    // setFiles(postInfo.files);
                    });
            });
    }, []);
    async function updatePost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post',{
            method: 'PUT',
            body: data,
            credentials: 'include',
        }).catch(reason => {alert(reason)});
        // try{
        //     const response = await fetch('http://localhost:4000/post',{
        //         method: 'PUT',
        //         body: data,
        //         credentials: 'include',
        //     })
        // }catch(e){
        //     response.ok = true;
        // }

        if (response?.ok) {
             setRedirect(true);
         }
    }
    if(redirect){
        return <Navigate to={'/post/'+id}/>
    }

    return(
        <form onSubmit={updatePost} method="POST">
            <input type="title"
                   placeholder={'Title'}
                   value={title}
                   onChange={ev => setTitle(ev.target.value)} required/>
            <input type="summary"
                   placeholder={'Summary'}
                   value={summary}
                   onChange={ev => setSummary(ev.target.value)} />
            <input type="file"
                   onChange={ev => setFiles(ev.target.files)}/>
            <Editor onChange={setContent} value={content} />
            <button style={{marginTop:'5px'}} type="submit">Обновить пост</button>
            {/*<textarea name="" id="" cols="30" rows="10"></textarea>*/}
        </form>
    );
}