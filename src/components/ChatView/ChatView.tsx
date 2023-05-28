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
import React, {useEffect, useState, useRef} from 'react';
import {ReactComponent as MessengerDefaultLogo} from '../assests/icons8-facebook-messenger.svg'
import api from '../api';
import socket from '../socket'
import {MessageProp, ChatViewProps, socketUpdateProp} from "../Type";
import Message from "../Message/Message";

const faCirclePlusPropIcon = faCirclePlus as IconProp;
const faCameraPropIcon = faCamera as IconProp;
const faImagePropIcon = faImage as IconProp;
const faMicrophonePropIcon = faMicrophone as IconProp;
const faThumbsUpPropIcon = faThumbsUp as IconProp; 
const faTableColumnsPropIcon = faTableColumns as IconProp;
const faPaperPlanePropIcon = faPaperPlane as IconProp;




const ChatView: React.FC<ChatViewProps>  = (props) =>  {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState<MessageProp[]>([]);
    const [inputHeight, setInputHeight] = useState(20);
    const [socketUpdate, setSocketUpdate] = useState([""]);


    useEffect(() => {
        socket.emit("checkMessage", props.chatRoomId);
        let i = 0;
        const listener =  (data:any) => {
            const message  = Object.values(data)[0] as socketUpdateProp  ;

            if (!socketUpdate.includes(message._id)){
               
                console.log( socketUpdate.length,  socketUpdate.includes(message._id))
                i += 1;
                console.log(i);
                socketUpdate.push(message._id)

               
                if (message.from !== props.userid) {
                     setMessages(messages => [...messages, {content: message.content, from: "receive", type: message.type}])
                }
            }

           
        }
        socket.on("messageChange", listener);
      
   
        // return () => { socket.off("messageChange",listener) }
    }, [messages])
  
    useEffect(() => {
        // props.socket.on("checkMessage", ("")=> {console.log("check socket")});
        // console.log(props.socket);

        setMessages([]);
        if (props.chatRoomId !== ""){
            const getMessages = async() => {
                const res = await api.get('/api/chatRoom/messages', {
                    params: {
                        chatId: props.chatRoomId,
                    },
                    withCredentials: true,
                })

                for (let i = 1; i < res.data.data.length; i ++) {
                    let message = res.data.data[i];
                    if (message.from === props.userid) {
                        setMessages(messages => [...messages, {content: message.content, from: "sender", type: message.type}])
                    } else {
                        setMessages(messages => [...messages, {content: message.content, from: "receive", type: message.type}])
                    }
                }
            }
    
            getMessages();
        }
        
    },[props.chatRoomId])
    //[props.chatRoomId])



    const handleSendMessage = (type: string) => {
        if (userMessage.replace(/\s/g, '').length || type==="icon"){ // check if the input contains spaces only
            
            const sendMessages = async() => {
                if (type === "string"){
                    setMessages(messages => [...messages, {content: userMessage, from: "sender", type: type}])
                    setUserMessage("")
                    await api.post('/api/chatRoom/messages', {
                        chatId: props.chatRoomId,
                        content: userMessage,
                        from: props.userid,
                        type: type,
                    })
                } 
                if (type === "icon"){
                    setMessages(messages => [...messages, {content: "like", from: "sender", type: type}])
                    await api.post('/api/chatRoom/messages', {
                        chatId: props.chatRoomId,
                        content: "like",
                        from: props.userid,
                        type: type,
                    })
                }
                
            }

            sendMessages();
        }
    }


    const ref = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        if (  ref?.current ) {
            ref?.current?.scrollIntoView();
        }
        
    }, [messages.length])

    const textareaRef = useRef<null | HTMLTextAreaElement>(null);

    useEffect(() => {
        // console.log(textareaRef.current?.scrollHeight)
        let h  = textareaRef.current?.scrollHeight || 20 ;
        const trows = Math.ceil(h / 20) - 1; 
       
    }, [userMessage])

    // const editMessage = (e: any) => {
    //     setUserMessage(e.target.value)
    // }   

    let button;
    if (userMessage === "") {
        button = <FontAwesomeIcon className='chat-option-logo' icon={faThumbsUpPropIcon} onClick={() => handleSendMessage("icon")}/>   ;
    } else {
        button = <FontAwesomeIcon className='chat-option-logo' icon={faPaperPlanePropIcon} onClick={() => handleSendMessage("string")}/>   ;
    }


    if (props.chatRoomId === "") {
        return (
            <div>
                 < MessengerDefaultLogo className='default-app-logo'/>
            </div>
        )
    } else {
        return (
            <div>
                <div className='chat-head'>
                    <div className="chat-info">
                        <div className='option' >
                            <FontAwesomeIcon className='chat-option-logo' icon={faTableColumnsPropIcon} />   
                        </div>
                        <div className="image">
                            <div className='avatar' style={{backgroundImage: `url(`+props.chatAvatar+`)`}}> </div>
                        </div>
                        <div className='chat-name'>{props.chatRoomName}</div>
                    </div>
                </div> 
                <div className='chat-content' >
                    <div className='list-message' >
                        {
                            messages.map((item,index) => (
                                <div key={index} className={item.from} ref={ref}>
                                    <div className="image">
                                        <div className='avatar' style={{backgroundImage: `url(`+props.chatAvatar+`)`}}>
                                        </div>
                                    </div>
                                    {/* <span>{item.content}</span> */}
                                    {/* {renderMessage(item.content, item.type)} */}
                                   <Message content={item.content} from={item.from} type={item.type}/>
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

                    <div className="message-input"  >
                            <textarea  ref={textareaRef}   style={{height: inputHeight+"px", maxHeight: "60px"}}  placeholder='Aa' value={userMessage} onChange={(e) => setUserMessage(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    handleSendMessage("string")
                                }


                            }}></textarea>
                        </div>

                    <div className='option' >
                            {button}
                    </div>

                </div>
            </div>
        )
    }
}

export default ChatView;