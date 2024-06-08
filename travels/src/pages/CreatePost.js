import ReactDOM from "react-dom/client";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ]
};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];
export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post',{
            method: 'POST',
            body: data,
            credentials: 'include',

        });
        if (response.ok){
            setRedirect(true);
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <form onSubmit={createNewPost} method="POST">
            <input type="title"
                   placeholder={'Заголовок'}
                   value={title}
                   onChange={ev => setTitle(ev.target.value)} required/>
            <input type="summary"
                   placeholder={'Описание'}
                   value={summary}
                   onChange={ev => setSummary(ev.target.value)} />
            <input type="file"
                   onChange={ev => setFiles(ev.target.files)} />
            <ReactQuill
                value={content}
                onChange={newValue => setContent(newValue)}
                module={modules}
                formats={formats}/>
            <button style={{marginTop:'5px'}} type="submit">Опубликовать</button>
            {/*<textarea name="" id="" cols="30" rows="10"></textarea>*/}
        </form>
    );
}