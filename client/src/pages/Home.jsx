import { useEffect, useState, useContext } from 'react'
import { getPosts } from '../api/posts'
import Post from '../components/Post'
import { AuthContext } from '../context/AuthContextComponent';
import { Link } from "react-router-dom";

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    setLoading(true);
    getPosts()
      .then(setPosts)
      .finally(()=> setLoading(false));
  }, [])

  return (
    <div className="posts-container">
      <h1 className="profile-username">Posts</h1>
      <hr className="separator" />

      {
        loading ?
          <div/>
          :
          posts.length > 0 ? 
            posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                text={post.text}
                author={post.author}
                date={post.date}
                handle={post.author.handle}
                username={post.author.username}
              />
            ))
          :
            <p>No posts available. 
              {isLoggedIn &&
                  <span> <Link to="/new">Create a new post here!</Link></span>
              }
            </p>
      }
    </div>
  );
  
}