import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/posts';

export default function PostDetails() {
  const [postData, setPostData] = useState({})
  const { id } = useParams()

  const newDate = new Date(postData.date); 
  const readableDate = newDate.toLocaleString(); 

  useEffect(()=> {
    getPost(id).then(setPostData)
  }, [id])

  return (
    <div className="post-details">
      { postData.author && 
        <>
          <h2 className="post-title">Post</h2>
          <p className="author-handle">{postData.author.handle}</p>
          <p className="post-text">{postData.text}</p>
          <p className="post-date">{readableDate}</p> 
        </>
      }
    </div>
  );
}