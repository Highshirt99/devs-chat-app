import React, {useState} from 'react'
import img from "../images/avatar.png"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app, storage, db } from '../firebase';
import { ref , uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import{ FaEye, FaEyeSlash }from "react-icons/fa";
import Swal from 'sweetalert';
import { v4 } from 'uuid';

import {Link, useNavigate} from "react-router-dom"


const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [file, setFile] = useState(null)
  const [showPassword, setShowPassword] = useState(false)


  const navigate = useNavigate()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const auth = getAuth(app);

     await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        Swal(
         "Account succesfully created!",
          "Proceed to login.",
          "success"
        )

        // ...
       if (file === null) return
        
const storageRef = ref(storage, `images/${displayName + v4()}`);

const uploadTask = uploadBytes(storageRef, file);


uploadTask.then( 
  async  (snapshot) => {
   await getDownloadURL(snapshot.ref).then( async (downloadURL) => {
      await updateProfile(userCredential.user, {
        displayName,
        photoURL: downloadURL
      })
     
   await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName,
        email,
        photoURL: downloadURL
      })

      await setDoc(doc(db, "userChats", userCredential.user.uid), {});
      
      navigate("/login")
    });


  }
);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal(
          errorMessage,
          "Try again",
          "error"
        )
        // ..
      });
  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
                <span className='logo'>Devs Chat</span>
                <p className='title'>Register</p>

                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name='displayName' placeholder='Display Name'
                      onChange={(e) => setDisplayName(e.target.value)}
                      required/>
                    <input  type="email" name='email'  placeholder = "Email"
                       onChange={(e) => setEmail(e.target.value)} 
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
                    <label htmlFor="avatar">
                        <img 
                        style={{cursor: "pointer"}}
                        src={img} alt="" width={40} />
                        <span>Add an avatar</span>
                    </label>
                    <input className='d-none'  type="file" id = "avatar" 
                    onChange = {(e) => setFile(e.target.files[0])} />
                    <button className='btn'>Sign up</button>
                </form>

                <p>Already have an account ? <Link
                 style={{color: "purple",
                 textDecoration: "none"}}
                  to = "/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register