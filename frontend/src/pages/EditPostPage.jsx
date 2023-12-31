import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [redirect, setRedirect] = useState(false); // this is to redirect the user to the home page after login
  const { id } = useParams(); // Access the 'id' parameter from the URL

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  //get the existing post data
  useEffect(() => {
    fetch(`http://localhost:4000/getpost/${id}`).then((response) => {
      response.json().then((post) => {
        setTitle(post.title);
        setSummary(post.summary);
        setContent(post.content);
      });
    });
  }, []);

  const handleEditPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    if (coverImg) {
      formData.set("file", coverImg);
    }
    const res = await fetch(`http://localhost:4000/editpost/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });
    if (res.ok) {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <div>
      <form
        action=''
        className='flex flex-col w-3/4 mx-auto gap-5'
        onSubmit={handleEditPost}>
        <h1 className='text-2xl font-semibold'>Edit Post</h1>
        <input
          type='text'
          placeholder={"Title"}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Summary'
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
        <input
          type='file'
          onChange={(e) => {
            setCoverImg(e.target.files[0]);
          }}
        />
        <ReactQuill
          value={content}
          onChange={(newContent) => {
            setContent(newContent);
          }}
          modules={modules}
          formats={formats}
        />
        <button
          className='rounded-sm p-3 bg-slate-950 text-white'
          type='submit'>
          Edit Post
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
