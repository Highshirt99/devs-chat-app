import React, {useContext} from 'react'
import vid from "../images/vid.png"
import add from "../images/add.png"
import more from "../images/more.png"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from './../context/ChatContext';

const Chat = () => {
  const {data} = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span> { data.user?.displayName }</span>

        <div className="chatIcons">
          <img src={vid} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>

      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat