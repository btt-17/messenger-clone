import './ChatList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBars, faPenToSquare, faMagnifyingGlass, faVideo } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';


const faBarsPropIcon = faBars as IconProp;
const faPenToSquarePropIcon = faPenToSquare as IconProp;
const faMagnifyingGlassPropIcon = faMagnifyingGlass as IconProp;
const faVideoPropIcon = faVideo as IconProp

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
            <div className='friend-lists'>
                <div className='room'>
                    <div className='image'>
                        <FontAwesomeIcon className='logo' icon={faVideoPropIcon} />   
                    </div>
                    <div className='list-text'>Create room</div>
                </div>

                <div className="room">
                    <div className='image'>
                        <div className='avatar'> </div>
                    </div>
                    <div className='list-text'>user1</div>
                </div>
            </div>
        </div>
    )
}

export default ChatList;