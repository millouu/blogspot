import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { format } from "date-fns";
import {UserContext} from "../context/UserContext";
const PostPage = () => {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const [postInfo, setPostInfo] = useState(null); // Create a state variable to store the post
  useEffect(() => {
    // Fetch the post with the given ID from the backend
    fetch(`http://localhost:4000/getpost/${id}`).then((response) => {
      response.json().then((post) => {
        setPostInfo(post);
      });
    });
  }, []);
  const { userInfo } = useContext(UserContext);
  if (!postInfo) return <p>Loading...</p>; // If the post is not loaded yet, show a loading indicator
  return (
    <div className='flex flex-col'>
      <div className='mb-5 max-h-96 overflow-hidden rounded-md'>
        <img
          src={`http://localhost:4000/${postInfo.coverImage}`}
          alt=''
          className='w-full h-auto object-cover'
        />
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='mb-2'>{postInfo.title}</h1>
        {userInfo.id === postInfo.author._id && (
          <button className='rounded-sm py-1 px-3 bg-slate-950 text-white'>
            <Link to={`/editpost/${postInfo._id}`}>Edit Post</Link>
          </button>
        )}
      </div>
      <div className='mb-5 flex gap-10 items-center text-lg uppercase text-gray-700'>
        <span>{postInfo.author.username}</span>
        <time>{format(new Date(postInfo.createdAt), "MMM d,yyyy HH:mm")}</time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
    </div>
  );
};

export default PostPage;
