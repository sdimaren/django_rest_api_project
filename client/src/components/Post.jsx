import React, { useContext } from 'react'
import { Link } from "react-router-dom"; 
import { AuthContext } from '../context/AuthContextComponent';

function Post({ id, userid, text, date, username, handle = null, onDelete }) {

    const { user, isLoggedIn } = useContext(AuthContext)
    const newDate = new Date(date); 
    const readableDate = newDate.toLocaleString();
    
    return (
        <div className="post-container">
          <h3 className="post-header">
          <span className="username">{username}</span>
          <Link to={handle ? `/users/${username}` : '#'} className="handle-link">
          {handle && `${handle}`}
          </Link>
          </h3>
            <p className="post-text">
             {text}
            </p>
            <p className="post-date">{readableDate}</p>
            <div className="flex-row">
              <Link key={id} to={`/posts/${id}`} className="view-post">View post</Link>
              {
              user && user.id === userid  && isLoggedIn ?
              <button
                className="delete-button" 
                onClick={() => onDelete(id)}
              >
              Delete
              </button> 
                : 
                <div style={{marginLeft: 'auto'}}/>
              }
            </div>
          </div>
    );
}
export default Post;