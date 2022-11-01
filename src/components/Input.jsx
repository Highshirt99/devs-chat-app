import React, {useContext, useState} from 'react'
import sendIcon from "../images/send.png"
import fileIcon from "../images/file.png"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { arrayUnion, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { storage, db } from '../firebase'
import { getDownloadURL, uploadBytesResumable, ref} from 'firebase/storage'
import { v4 } from 'uuid';
import { serverTimestamp } from 'firebase/firestore';



const Input = () => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const {data} = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)

const handleSend = async () => {
        if(img){
            const storageRef = ref(storage, v4())
            const uploadTask = uploadBytesResumable(storageRef, img)
        
uploadTask.then(
  async (snapshot) => {
    await getDownloadURL(snapshot.ref).then( async (downloadURL) => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion(
        {
          id: v4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: downloadURL

        })
    })  
  })
  })

}
        else{
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion(
                {
                  id: v4(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),

                }
              )
             
            }
        )
           
        }

await updateDoc(doc(db, "userChats", currentUser.uid),
{
  [data.chatId + ".lastMessage"] : {
    text,
  },

  [data.chatId + ".date"] : serverTimestamp(),
})
    
await updateDoc(doc(db, "userChats", data.user.uid),
{
  [data.chatId + ".lastMessage"] : {
    text,
  },

  [data.chatId + ".date"] : serverTimestamp(),
})

setText("")
setImg(null)
    
}
  return (
    <div className='input'>
        <input type="text"
        placeholder='Start typing...' 
        onChange = {e => setText(e.target.value)}
        value = {text} />

        <div className="send">
                <label htmlFor="file">
                    <img src={fileIcon} alt=""
                     />
                </label>
                <input type="file" className='d-none' id='file'
                onChange = {e => setImg(e.target.files[0])} />
                <img src= {sendIcon} alt="" 
                onClick={handleSend}/>
        </div>
    </div>
  )
}

export default Input