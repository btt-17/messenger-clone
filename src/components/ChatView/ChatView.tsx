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
import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';


const faCirclePlusPropIcon = faCirclePlus as IconProp;
const faCameraPropIcon = faCamera as IconProp;
const faImagePropIcon = faImage as IconProp;
const faMicrophonePropIcon = faMicrophone as IconProp;
const faThumbsUpPropIcon = faThumbsUp as IconProp; 
const faTableColumnsPropIcon = faTableColumns as IconProp;
const faPaperPlanePropIcon = faPaperPlane as IconProp;


interface ChatViewProps {
    id: string | null,
    username: string | null,
}


type MessageProp = {
    content: string,
    from: string,
}

const ChatView: React.FC<ChatViewProps>  = (props) =>  {
    const date = new Date();
    const [userMessage, setUserMessage] = useState('');
   
    const [messages, setMessages] = useState<MessageProp[]>([]);

    useEffect(() => {
        const keyDownHandler = (event: { key: string; preventDefault: () => void; }) => {
          console.log('User pressed: ', event.key);
    
          if (event.key === 'Enter') {
            event.preventDefault();
    
            // 👇️ call submit function here
            handleSendMessage();
          }
        };

      }, []);

    const handleSendMessage = () => {
        // dummy_messages.push([userMessage,"sender"]);
        if (userMessage !== '') {
            setMessages(messages => [...messages, {content: userMessage, from: "sender"}])
            setUserMessage("");
        }
    }

    const ref = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        console.log(ref);
        if (  ref?.current ) {
            ref?.current?.scrollIntoView();
        }
        
    }, [messages.length])

   

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
                        <div className='avatar'> </div>
                    </div>
                    <div className='chat-name'>{props.username}</div>
                </div>
            </div> 
            <div className='chat-content' >
                <div className='list-message' >
                    {
                        messages.map((item,index) => (
                            <div key={index} className={item.from} ref={ref}>
                                <div className="image">
                                    <div className='avatar'>
                                    </div>
                                </div>
                                <span>{item.content}</span>
                            </div>
                        ))
                    }
                </div>
                <div id="anchor" ></div>
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
                        <input type='text' placeholder='Aa' value={userMessage} onChange={(e) => setUserMessage(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage()
                            }
                        }}></input>
                    </div>

                   <div className='option' >
                        {button}
                   </div>

            </div>
        </div>
    )
}

export default ChatView;