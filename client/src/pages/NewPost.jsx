import { useState, useContext, useEffect } from "react"
import { createPost } from "../api/posts"
import { AuthContext } from '../context/AuthContextComponent';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
    const [post, setPost] = useState('');
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      console.log(user);
    }, [user])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        await createPost(post, user.id);
        setMessage('Successfully created a new post!');
        setPost('');
        // Set a timeout for 1500 ms (1.5 secs) before redirect
        setTimeout(() => {
            navigate('/');
        }, 1500);
    } catch (error) {
        setMessage('Failed to create a new post: ' + error.message);
    }
}

    return (
        <div className="new-post-container">
            <h1 className="profile-username">New post</h1>
            <hr className="separator" />
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-field">
                  <label>Post</label>
                  <textarea 
                    rows="10"
                    cols="50"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}></textarea>
                </div>
              </div>

              <button className="submit-button">Submit</button>
            </form>
        </div>
    )
}