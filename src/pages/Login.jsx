import React, {useState} from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import{ FaEye, FaEyeSlash }from "react-icons/fa";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault()
      const auth = getAuth();

signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    await swal(
      "Login successful!",
      "Proceed to the home page.",
      "success"
    )

   navigate("/")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    swal(
      errorMessage,
      "Try again.",
      "error"
    )

    e.target.password.value = ""
  });
  }

  return (
    <div className='formContainer'>
    <div className='formWrapper'>
            <span className='logo'>Devs Chat</span>
            <p className='title'>Login</p>

            <form action=""
            onSubmit={(e) => handleSubmit(e)}>
                <input  type="email" name='email' placeholder = "Email"
                onChange = {(e) => setEmail(e.target.value)} 
                required/>
                <div className="password">
                  <input type= {showPassword ? "text" : "password"} name = "password" placeholder = "Password"
                    onChange = {(e) => setPassword(e.target.value)} 
                    required/>
                   {showPassword ? <FaEye
                    style={{cursor: "pointer",
                    position: "relative",
                    right: "20px"}}
                   onClick={toggleShowPassword}
                   /> : <FaEyeSlash
                   style={{cursor: "pointer",
                   position: "relative",
                   right: "20px"}}
                   onClick={toggleShowPassword} />}
                </div>
                <button className='btn'>Sign in</button>
            </form>

            <p>Have no accout yet ? <Link style={{color: "purple",
          textDecoration: "none"}} to = "/register">Register</Link></p>
    </div>
</div>
)
  
}

export default Login