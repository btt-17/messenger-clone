import './MainView.css';
import  {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faComment, faVideo, faUserGroup, faClone } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ChatView from '../ChatView/ChatView';
// import ChatList from '../ChatList/ChatList';
import api from '../api';
import socket from '../socket';
import {  faBars, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const faBarsPropIcon = faBars as IconProp;
const faPenToSquarePropIcon = faPenToSquare as IconProp;
const faMagnifyingGlassPropIcon = faMagnifyingGlass as IconProp;


const faCommentPropIcon = faComment as IconProp;
const faVideoPropIcon = faVideo as IconProp;
const faUserGroupPropIcon = faUserGroup as IconProp;
const faClonePropIcon = faClone as IconProp;



type ChatRoomProp = {
    id: String,
    name: String,
}

function MainView() {
    
    const [chatRoomsId, setChatRoomsId] = useState(new Set<String>());
    const [chatRooms, setChatRooms] = useState(new Set<string>());
    const [currentSelectedRoomName, setCurrentSelectedRoomName] = useState("");
    const [currentSelectedRoomId, setCurrentSelectedRoomId] = useState("");
    const [currentSelectedRoomAvatar, setCurrentSelectedRoomAvatar] = useState("");

    socket.connect();

 
    let userId = localStorage.getItem("userid") ;
    let userName = localStorage.getItem("username");

    useEffect(() => {
       
        if (chatRoomsId.size === 0) {
        const getChatRoomsIdFromApi = async() => {
            var res = await api.get('/api/chatRoomsId', {
                params: {
                    id: userId,
                },
                withCredentials: true,
            })
            
            for (let i = 0; i < res.data.data.length; i ++ ) {
                setChatRoomsId(chatRoomsId => new Set(chatRoomsId.add(res.data.data[i])));
            }
            
        }
        getChatRoomsIdFromApi();     
    }


        if (chatRoomsId.size !== 0) {
            for (let i = 0; i < chatRoomsId.size; i ++) {
                let chatId = Array.from(chatRoomsId)[i];
            
                const getChatRoomName = async() => {
                    var res = await api.get("/api/chatRoomName", {
                        params: {
                            userId: userId,
                            chatId: chatId,
                        },
                        withCredentials: true,
                    })
            
                    let current_message = res.data.current;
                    
                    if (current_message.from === userId) {
                        current_message.content = "You: " + current_message.content;
                    }
                    console.log(res.data);
                    console.log(current_message.content);
                    setChatRooms(chatRooms => new Set(chatRooms.add(JSON.stringify({
                        id:chatId,
                        name:res.data.data,
                        avatar: res.data.avatar,
                        current: current_message.content,
                    }))))
                }
                getChatRoomName();
            
            } 
            
        }
    },[chatRoomsId]);

    const selectRoom = (roomIndex:any)=> {
        let chatRoom = Array.from(chatRooms.values())[roomIndex];
        let chatRoom_json = JSON.parse(chatRoom);
        setCurrentSelectedRoomName(chatRoom_json.name);
        setCurrentSelectedRoomId(chatRoom_json.id);
        setCurrentSelectedRoomAvatar(chatRoom_json.avatar)
    }
    

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem("authenticated","false");
        localStorage.setItem("userid","");
        localStorage.setItem("useritem","");
        socket.disconnect();
        navigate("/login");
    }




    if (localStorage.getItem("authenticated") !== "true"){
        return <Navigate replace to="/login" />
    } else {
        return (
            <div>
                <div className='view-container'>
                    <div className='chat-list'>
                        {/* <ChatList chatRoomsId={chatRoomsId}></ChatList> */}

                        {/* Chat List */}
                        <div className='chat-list-header'>
                                <FontAwesomeIcon className='logo' icon={faBarsPropIcon} />   
                                <div className='text'>Chats</div>
                                <FontAwesomeIcon className='logo' icon={faPenToSquarePropIcon} />   
                            </div>
                            <div className="search-bar">
                                <FontAwesomeIcon className='logo' icon={faMagnifyingGlassPropIcon} />   
                                <input type='text' placeholder='Search' ></input>
                            </div>
                            <div className='friend-lists'>
                                <div className='room'>
                                    <div className='image'>
                                        <FontAwesomeIcon className='logo' icon={faVideoPropIcon} />   
                                    </div>
                                    <div className='list-text'>Create room</div>
                                </div>

                                {
                                    Array.from(chatRooms.values()).map((item,index) => (
                                        <div key={index} className="room" onClick={() => selectRoom(index)}>
                                             <div className='image'>
                                                <div className='avatar' style={{backgroundImage: `url(`+JSON.parse(item).avatar+`)`}}> 
                                                
                                                </div>
                                            </div>
                                            <div className='list-text'>{JSON.parse(item).name}</div>
                                        </div>
                                    ))
                                    
                                }
                            </div>
                         {/* End of Chat List */}
                         <div className='friend-lists-main'>
                            {
                                Array.from(chatRooms.values()).map((item,index) => (
                                    <div key={index} className="room" onClick={() => selectRoom(index)}>
                                            <div className='image'>
                                            <div className='avatar' style={{backgroundImage: `url(`+JSON.parse(item).avatar+`)`}}> 
                                            
                                            </div>
                                        </div>
                                        <div className='list-text'>
                                            <div className="list-name">{JSON.parse(item).name}</div>
                                            <div className="current-message">{JSON.parse(item).current}</div>
                                        </div>
                                    </div>
                                ))
                                    
                            }
                         </div>

                        <div>
                            <button onClick={handleLogout}>Logout </button>
                        </div>
                    </div>

                     {/* View of Chat room */}
                    <div className='chat-view'>
                        <ChatView userid={userId} username={userName} 
                                chatRoomId={currentSelectedRoomId}  
                                chatRoomName={currentSelectedRoomName}
                                chatAvatar={currentSelectedRoomAvatar}
                         />
                    </div>
                </div>


                <div className='footer-container'>
                   <div className='option' >
                        <FontAwesomeIcon className='logo' icon={faCommentPropIcon} />   
                        <div className='option-name'>Chats</div>
                   </div>

                   <div className='option'>
                        <FontAwesomeIcon className='logo' icon={faVideoPropIcon}  />   
                        <div className='option-name'>Video</div>
                   </div>


                   <div className='option'>
                        <FontAwesomeIcon className='logo' icon={faUserGroupPropIcon}  />   
                        <div className='option-name'>People</div>
                   </div>

                   <div className='option'>
                        <FontAwesomeIcon className='logo' icon={faClonePropIcon}  />   
                        <div className='option-name'>Stories</div>
                   </div>

                </div>
            </div>
        )
    }
}

export default MainView;