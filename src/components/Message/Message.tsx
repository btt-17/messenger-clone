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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {MessageProp} from "../Type";

const faThumbsUpPropIcon = faThumbsUp as IconProp; 

const Message: React.FC<MessageProp> = (props) => {
    if (props.type === "icon") { 
        if (props.content === "like") {
            return (
                <FontAwesomeIcon className='chat-option-logo' icon={faThumbsUpPropIcon} /> 
            )
        }
    }
return (
    <span>{props.content}</span>
)
}

export default Message;