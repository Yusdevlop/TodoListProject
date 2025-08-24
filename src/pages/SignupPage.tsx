import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css"; 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../config/Firebase";

function Signup() {
  const [email,setEmail]= useState<string>("");
  const [password,setPassword]= useState<string>("");
  const [username,setUsername]= useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const register= async()=>{
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      if(user){
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/TodoList");
      }, 1000);
          toast.success(`Uğurla Qeydiyat Olundu! Xoş gəldin ${username}`);
          
          setEmail("");
          setPassword("");
          setUsername("");
       }
    } catch (error) {
      toast.error("Qeydiyat zamanı xəta baş verdi.");
    }
  }
  return (
    
    <div className="contaniersignup">
      <div className="contanierbox">
        <div className="signup">
          <h1>Sign Up</h1>
        </div>

        <div className="inputbox">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="userNameInput"
            className="inputbox1"
            type="text"
            placeholder="Username"
          />
          <i className="bx bxs-user"></i>
        </div>

        <div className="inputbox">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="gmailInput"
            className="inputbox1"
            type="text"
            placeholder="Gmail"
          />
          <i className="fa fa-envelope"></i>
        </div>

        <div className="inputbox">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="passwordInput"
            className="inputbox2"
            type="password"
            placeholder="Password"
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

       

        <div className="btn">
          <button onClick={ register} disabled={loading} id="submitbox" className="sumbitbox" type="submit">
            Sign Up
          </button>
        </div>
         {loading && (
          
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        <div className="youhaveaccount">
          <p>
            You have an account?{" "}
            <Link className="register" to="/">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
