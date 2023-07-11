import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from '../api/auth'
import { AuthContext } from "../context/AuthContextComponent";

export default function Signin() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setIsLoggedIn, setUser } = useContext(AuthContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await signin(text, password)
      console.log(response);
      setIsLoggedIn(true)
      setUser(response.user)
      navigate('/');
      console.log(response);
    } catch (error) {
      console.error('Error during sign in: ', error);
    }
  }

  return (
    <div className="signin-container">
      <h1 className="signin-title">Sign In</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          className="signin-input"
          type="text"
          placeholder="Username or email"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          className="signin-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="signin-button">Signin</button>
      </form>
      <span className="signin-alt">
        {'Already a user? '}
        <Link to="/auth/signup">Go to Signup</Link>
        {' instead.'}
      </span>
    </div>
  )
}