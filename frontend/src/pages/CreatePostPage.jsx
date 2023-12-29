import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState("")
  const [redirect, setRedirect] = useState(false); // this is to redirect the user to the home page after login

    const modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
  ]
  const handleCreatePost =async (e) => { 
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("file", coverImg);
    const res=await fetch("http://localhost:4000/createpost", {
      method: "POST",
      body: formData
    })
    if (res.ok)
    {
      setRedirect(true);
    }
  }
  if (redirect)
  { 
    return <Navigate to="/"/>
    }
    return (
    <div>
          <form action="" className='flex flex-col w-3/4 mx-auto gap-5' onSubmit={handleCreatePost}>
              <input type="text" placeholder={'Title'} value={title} onChange={e=>{setTitle(e.target.value)}} />
              <input type="text" placeholder="Summary" value={summary} onChange={e=>{setSummary(e.target.value)}}/>
          <input type="file" onChange={e=>{setCoverImg(e.target.files[0])}} />
            <ReactQuill value={content} onChange={newContent=>{setContent(newContent)}} modules={modules} formats={formats}/>
              <button className='rounded-sm p-3 bg-slate-950 text-white' type='submit'>Create Post</button>
      </form>
    </div>
  )
}

export default CreatePostPage
