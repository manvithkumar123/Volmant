import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import "./LoginPage.css"
const LoginPage = () => {
  const [signup, setSignup] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [admin,setadmin]=useState(false)
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login/login', { Username: email, Password: password }, { withCredentials: true });
      if (response.data.adminlogin) {
        setadmin(true);
        setUsername("Manvith");
        setLoggedIn(true);
        localStorage.setItem("role", "admin");
        localStorage.setItem("userId", response.data._id || "");
        navigate("/Dashboard"); // Navigate admin to dashboard
        return;
      }

      if (response.status === 200) {
        alert("login Sucessfull");
        setLoggedIn(true);
        setUsername(email);
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("role", "user"); // Set role as user
        setadmin(false); // Ensure admin is false for normal users
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };
  useEffect(() => {
    document.body.style.overflow=signup?"hidden":"auto"
  }, [signup]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/login/signup', { Username: email, Password: password });
      alert('User created');
      setSignup(false);
      setEmail("");
      setPassword("")
    } catch (error) {
      alert('Error creating user');
    }
  };
  useEffect(() => {
    // Check authentication status on component mount to persist login state
    axios.get("/api/login/check-auth", { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          setLoggedIn(true);
          setUsername(res.data.username);
          if (res.data.isAdmin) {
            setadmin(true);
            localStorage.setItem("role", "admin");   // admin role
            localStorage.setItem("userId", res.data.user?.userid || "");
          } else {
            setadmin(false);
            localStorage.setItem("role", "user");    // user role
            localStorage.setItem("userId", res.data.user?.userid || "");
          }
        } else {
          setLoggedIn(false);
          setadmin(false);
          localStorage.removeItem("role");
          localStorage.removeItem("userId");
        }
      })
      .catch(err => {
        console.log("User not logged in", err);
        setLoggedIn(false);
        setadmin(false);
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
      });
  }, []);

  // Logout handler to clear localStorage and update state
  const handleLogout = (e) => {
    e.preventDefault();
    axios.get("/api/login/logout", { withCredentials: true })
      .then(() => {
        setLoggedIn(false);
        setadmin(false);
        setUsername('');
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        navigate("/"); // Optionally navigate to home or login page after logout
      })
      .catch(err => {
        console.log("Logout error", err);
      });
  }

  return (
    <div className="Login_page">
      {loggedIn ? (
        <div className="welcome_page">
          <div className="login_card">
          <i className="fa-solid fa-user"></i>
          <h2>Welcome, {username}</h2>
          {admin ?(null):
          <form action="" id='form_login_sucess'>
            <button onClick={()=>{navigate("/Cartpage")}}>View Cart</button>
          </form>
          }
          {/* Updated logout button to use handleLogout */}
          <form onSubmit={handleLogout} id='form_login_sucess' method='get'>
            <button>Logout</button>
          </form>
          {admin?(
            <h5>Signed as Admin(Manvith) </h5>
          ): 
          <h5>Signed as User <br/>if You are Admin please Use your credientials to login </h5>
          }
          </div>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="login_container">
            <h2 id='login'>LOGIN</h2>
            <p style={{marginTop:"40px"}}>Email</p>
            <input type="text" name='Username' placeholder='Enter Email' autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
            <p style={{marginTop:'10px'}}>Password</p>
            <input type="password" name='Password' placeholder='password' autoComplete="off"  onChange={(e) => setPassword(e.target.value)} />
            <button style={{cursor:"pointer"}}>SUBMIT</button>
            <a id='newuser' onClick={() => setSignup(true)} style={{cursor:'pointer'}}>New user sign up?</a>
          </div>
        </form>
      )}
      {signup ?
      <div className='signup_page'>
        <form onSubmit={handleSignup}>
          <div className="signup_container">
            <div className="text_close">
            <h1>Signup</h1>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setSignup(false)}}  height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>
            <p style={{marginTop:"40px"}}>Email</p>
            <input type='text'  autoComplete='off' required name='Username' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <p style={{marginTop:'10px'}}>Password</p>
            <input type="password"  autoComplete='off'  required name='Password'   placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <p id='hash_text'>Dont worry password will be saved in hash</p>
            <button style={{cursor:"pointer"}}>SUBMIT</button>
          </div>
        </form>
      </div>
      :null}
      {admin ? (null):
      <div className="suggestions">
        <div className="product_card"></div>
        <div className="product_card"></div>
        <div className="product_card"></div>
      </div>
}
    </div>
  )
}

export default LoginPage
