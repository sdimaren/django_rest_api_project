import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import PostDetails from './pages/PostDetails';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NavBar from './components/Navbar';

import { AuthContext } from './context/AuthContextComponent';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth/signup" element={<Signup/>} />
        <Route path="/auth/signin" element={<Signin/>} />
        <Route path="/posts/:id" element={<PostDetails/>}/>
        <Route path="/users/:id" element={<Profile/>}/>  
          { isLoggedIn &&
            <>
              <Route path="/new" element={<NewPost/>} />
            </>
          }
      </Routes>
    </>
  );
}

export default App;
