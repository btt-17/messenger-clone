import './MainView.css';
import  {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faComment, faVideo, faUserGroup, faClone } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ChatView from '../ChatView/ChatView';


const faCommentPropIcon = faComment as IconProp;
const faVideoPropIcon = faVideo as IconProp;
const faUserGroupPropIcon = faUserGroup as IconProp;
const faClonePropIcon = faClone as IconProp;


function MainView() {
    const [active, setActive] = useState(false);
    const handleClick = () => {
        setActive(!active);
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem("authenticated","false");
        navigate("/login");
    }

    if (localStorage.getItem("authenticated") !== "true"){
        return <Navigate replace to="/login" />
    } else {
        return (
            <div>
                <div className='view-container'>
                    <div className='chat-list'>
                        <button onClick={handleLogout}>Logout </button>
                    </div>
                    <div className='chat-view'>
                        <ChatView />
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