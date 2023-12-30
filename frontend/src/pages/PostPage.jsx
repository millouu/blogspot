import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { format } from "date-fns";
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
  if (!postInfo) return <p>Loading...</p>; // If the post is not loaded yet, show a loading indicator
  return (
    <div className="flex flex-col">
      <div className='mb-5 max-h-96 overflow-hidden rounded-md'>
        <img
          src={`http://localhost:4000/${postInfo.coverImage}`}
          alt=''
          className='w-full h-auto object-cover'
        />
      </div>
      <h1 className="mb-2">{postInfo.title}</h1>
      <div className='mb-5 flex gap-10 items-center text-lg font-bold uppercase text-gray-700'>
        <span>{postInfo.author.username}</span>
        <time>{format(new Date(postInfo.createdAt), "MMM d,yyyy HH:mm")}</time>
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
    </div>
  );
};

export default PostPage;
