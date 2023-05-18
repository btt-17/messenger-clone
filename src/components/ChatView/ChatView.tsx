import './ChatView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCirclePlus, 
    faCamera, 
    faImage, 
    faMicrophone, 
    faThumbsUp, 
    faTableColumns,
    faPaperPlane,  
} from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, {useState} from 'react';

const faCirclePlusPropIcon = faCirclePlus as IconProp;
const faCameraPropIcon = faCamera as IconProp;
const faImagePropIcon = faImage as IconProp;
const faMicrophonePropIcon = faMicrophone as IconProp;
const faThumbsUpPropIcon = faThumbsUp as IconProp; 
const faTableColumnsPropIcon = faTableColumns as IconProp;
const faPaperPlanePropIcon = faPaperPlane as IconProp;


const dummy_messages = [
   ["example 1", "sender"],
   ["example 2", "sender"],
   ["example 3", "receiver"],
   ["longer example 4", "sender"],
]



const ListMessage = () => (
    <div className='list-message'>
      {dummy_messages.map(item => (
        <div key={item[0]} className={item[1]}>
            <div className="image">
                <div className='avatar'>
                </div>
            </div>
            <span>{item[0]}</span>
        </div>
      ))}
    </div>
  );

function ChatView () {
    const [userMessage, setUserMessage] = useState('');
    const handleSendMessage = () => {
        dummy_messages.push([userMessage,"sender"]);
        console.log(dummy_messages);
        setUserMessage("");
        ListMessage();
    }

    let button;
    if (userMessage === "") {
        button = <FontAwesomeIcon className='chat-option-logo' icon={faThumbsUpPropIcon} />   ;
    } else {
        button = <FontAwesomeIcon className='chat-option-logo' icon={faPaperPlanePropIcon} onClick={handleSendMessage}/>   ;
    }

    return (
        <div>
            <div className='chat-head'>
                <div className="chat-info">
                    <div className='option' >
                        <FontAwesomeIcon className='chat-option-logo' icon={faTableColumnsPropIcon} />   
                    </div>
                    <div className="image">
                        <div className='avatar'>

                        </div>
                    </div>
                    <div className='chat-name'>Test bot 1</div>
                </div>
            </div> 
            <div className='chat-content'>
               <ListMessage></ListMessage>
            </div>
            <div className='send-message'>
                    <div className='option' >
                        <FontAwesomeIcon className='chat-option-logo' icon={faCirclePlusPropIcon} />   
                   </div>

                   <div className='option' >
                        <FontAwesomeIcon className='chat-option-logo' icon={faCameraPropIcon} />   
                   </div>

                   <div className='option' >
                        <FontAwesomeIcon className='chat-option-logo' icon={faImagePropIcon} />   
                   </div>

                   <div className='option' >
                        <FontAwesomeIcon className='chat-option-logo' icon={faMicrophonePropIcon} />   
                   </div>

                   <div className="message-input">
                        <input type='text' placeholder='Aa' value={userMessage} onChange={(e) => setUserMessage(e.target.value)}></input>
                    </div>

                   <div className='option' >
                        {/* <FontAwesomeIcon className='chat-option-logo' icon={faThumbsUpPropIcon} />    */}
                        {button}
                   </div>

            </div>
        </div>
    )
}

export default ChatView;