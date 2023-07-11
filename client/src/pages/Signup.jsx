import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from '../api/auth'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('')
  const [handle, setHandle] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(username, handle, email, password);
      const response = await signup(username, handle, email, password);
      console.log(response);

      setMessage('Successfully created a new account! Redirecting...');
      setTimeout(() => {
        navigate('/auth/signin');
      }, 1500);
    } catch(err) {
      setMessage(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="signup-container">
      {message && <p className="error-message">{message}</p>}
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input 
          className="signup-input"
          type="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
          <input 
            className="signup-input"
            type="text"
            placeholder="Handle"
            value={handle}
            onChange={e => setHandle(e.target.value)}
          />
          <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
        <input 
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="signup-button" disabled={loading}>Signup</button>
      </form>
      <span className="signup-alt">
        {'Already a user? '}
        <Link to="/auth/signin">Go to Signin</Link>
        {' instead.'}
      </span>
    </div>
  )
}