import './ChatList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBars, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';


const faBarsPropIcon = faBars as IconProp;
const faPenToSquarePropIcon = faPenToSquare as IconProp;
const faMagnifyingGlassPropIcon = faMagnifyingGlass as IconProp

function ChatList () {
    return (
        <div>
            <div className='chat-list-header'>
                <FontAwesomeIcon className='logo' icon={faBarsPropIcon} />   
                <div className='text'>Chats</div>
                <FontAwesomeIcon className='logo' icon={faPenToSquarePropIcon} />   
            </div>
            <div className="search-bar">
                <FontAwesomeIcon className='logo' icon={faMagnifyingGlassPropIcon} />   
                <input type='text' placeholder='Search' ></input>
            </div>
        </div>
    )
}

export default ChatList;