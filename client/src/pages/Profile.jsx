import { useCallback, useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import { getProfile, editProfile, deleteProfile } from "../api/users";
import Post from "../components/Post";
import { AuthContext } from "../context/AuthContextComponent";
import { deletePost } from "../api/posts";

export default function Profile() {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    handle: ''
  });

  const { user } = useContext(AuthContext);

  const getPosts = useCallback(async () => {
    setLoading(true);
    const result = await getProfile(params.id);
    setProfile(result);
    setLoading(false);
  }, [params.id]);
  
  useEffect(() => {
    getPosts();
  }, [getPosts, refresh]);
  
  const handleDeleteUser = useCallback(() => {
    if(window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      deleteProfile(user.id, localStorage.getItem('token')).then(() => {
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      });
    }
  }, [user.id]);
  
  const handleDeletePost = useCallback(async (postId) => {
    await deletePost(postId, localStorage.getItem('token'));
    setRefresh(prev => !prev); 
  }, []);
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, handle } = userData;
    editProfile(user.id, username, handle, email, password, user.username).then(() => {
      setRefresh(prev => !prev);
      setShowModal(false);
    });
  };

  const handleShowModal = () => {
    setUserData({
      username: profile.username,
      email: profile.email,
      password: '',
      handle: profile.handle
    });
    setShowModal(true);
  };

  return (
    <div className="profile">
      { showModal && 
        <div className="modal-container">
          <div className="modal-content-container">
            <h2 className="modal-heading">Edit Profile</h2>
            <form className="edit-form" onSubmit={handleEditSubmit}>
              <input className="edit-input" type="text" placeholder="Username" value={userData.username} onChange={e => setUserData({...userData, username: e.target.value})} />
              <input className="edit-input" type="text" placeholder="Handle" value={userData.handle} onChange={e => setUserData({...userData, handle: e.target.value})} />
              <input className="edit-input" type="email" placeholder="Email" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} />
              <input className="edit-input" type="password" placeholder="New Password" value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})} />
              <button className="edit-save-button">Save</button>
              <button className="edit-cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
            <button className="edit-delete-account-button" onClick={handleDeleteUser}>Delete Account</button>
          </div>
        </div>
      }
      <h1 className="profile-username">{profile?.username}</h1>
      <pre className="profile-handle">{profile?.handle}</pre>
      { user.id === profile.id && <button onClick={handleShowModal} className="edit-account-button">Edit Account</button> }
      <hr className="separator"/>
      <div className="profile-posts-container">
        { loading ? (
          <></>
        ) : (
          profile?.posts?.length > 0 ? (
            profile.posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                text={post.text}
                date={post.date}
                username={profile.username}
                userid={profile.id}
                onDelete={handleDeletePost}
              />
            ))
          ) : (
            <div className="flex-center">
              {
                user.id === profile.id ?
                <>
                  <p>You don't have any posts yet!</p>
                  <Link to="/new">Create a new post</Link>
                </>
                :
                (<p>This user doesn't have any posts yet!</p>)
              }
            </div>
          )
        )}
      </div>
    </div>
    );
}