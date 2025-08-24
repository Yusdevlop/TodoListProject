import '../css/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import { auth, db } from "../config/Firebase";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { GoogleAuthProvider } from "firebase/auth";
import {  doc, setDoc } from 'firebase/firestore';


const provider = new GoogleAuthProvider();

function LoginPage() {
    const [email,setEmail]= useState<string>("");
    const [password,setPassword]= useState<string>("");
    const [username,setUsername]= useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
  
    const login= async()=>{
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const user = response.user;
        if(user){
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate("/TodoList");
        }, 1000);
            
            const contact = doc(db,"contact", email);
            const contactObj = {
                id: user.uid,
                email: email,
                password: password
            };
        setDoc(contact,contactObj)
            toast.success(`Uğurla Giriş Etdin! Xoş gəldin ${username}`);
            setEmail("");
            setPassword("");
            setUsername("");
         }
      } catch (error) {
        toast.error("Giriş Uğursuz oldu! Email və ya şifrə səhvdir.");
      }
    }

    const loginFromGoogle= async ()=>{
      try {
        const response = await signInWithPopup(auth,provider);
        const user = response.user;
        if(user){
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate("/TodoList");
        }, 1000);
            toast.success(`Uğurla Giriş Etdin! Xoş gəldin ${user.displayName}`);
            setEmail("");
            setPassword("");
            setUsername("");
         }
      } catch (error) {
        
      }

    }
      
  return (
    
     <div className="containerLogin">
      <div className="containerBox">
        <div className="login">
          <h1>Login</h1>
        </div>

        <div className="inputbox">
          <input
           
            className="inputbox1"
            type="text"
            placeholder="Username"
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="inputbox">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            className="inputbox1"
            type="email"
            placeholder="Email"
            required
          />
          <i className="fa fa-envelope"></i>
        </div>

        <div className="inputbox">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="loginPassword"
            className="inputbox2"
            type="password"
            placeholder="Password"
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <div className="remember-forgot">
            <div className='checkbox-container'>
                <input type="checkbox" className="checkboxLogin" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
          
          <div>
             <a className="forgot" href="#">
                Forgot Password?
            </a>
          </div>
         
        </div>

        <div className="btn">
          <button onClick={login} disabled={loading} id="loginSubmitButton" className="submitbox" type="submit">
            Login
          </button>
           {loading && (
                    
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                      <CircularProgress />
                    </Box>
                  )}
        <button onClick={loginFromGoogle} id="loginForGoogle" type="button">
            <FaGoogle className="googleIcon" />
            <span className="btnText">ilə daxil ol</span>
        </button>

     
        </div>

        <div className="donthaveaccount">
          <p>
            Don't have an account?{" "}
             <Link className="register" to="/signup">
                Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
