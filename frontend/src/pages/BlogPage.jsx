import { useEffect,useState } from "react"
import Post from "../components/Post"


const BlogPage = () => {
  const [posts,setPosts]=useState([])
  useEffect(() => { 
    fetch('http://localhost:4000/getallposts').then(
      response => {
        response.json().then(posts => {
          setPosts(posts)
          console.log(posts)
        })
      }
    )
  },[])
  return (
    <div>
      {posts.length > 0 && posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
      
    </div>
  )
}

export default BlogPage
