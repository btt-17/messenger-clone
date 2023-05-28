type MessageProp = {
    content: string,
    from: string,
    type: string,
}


interface ChatViewProps {
    userid: string | null,
    username: string | null,
    chatRoomId: string | null,
    chatRoomName: string | null,
    chatAvatar:string | null,
}

type socketUpdateProp = {
    content: string,
    from: string,
    type: string,
    _id: string
}

type ChatRoomProp = {
    id: String,
    name: String,
}



export type {MessageProp, ChatViewProps, socketUpdateProp, ChatRoomProp }