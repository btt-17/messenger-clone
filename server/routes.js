const express = require("express");
const router = express.Router();
const database = require('./database');

router.post('/api/login', async(req,res) => {
    const dbConnect = database.getDb();
    const data = await dbConnect.collection("Users"). find({
        mail: req.body.mail,
        password: req.body.password,
    }).toArray() ;


    if (data.length === 0) {
        res.status(200).json({status: "Your username or password is wrong!"});
        console.log("Your username or password is wrong!", req.body.mail, req.body.password)
    }

    if (data.length !== 0){
        res.status(200).json({status: "successfully", data: JSON.stringify(data)})
        console.log("successfully")
    }

})

router.get('/api/chatRoomsId', async(req,res) => {
    const dbConnect = database.getDb();
    const data = await dbConnect.collection("Users"). find({
        id: req.query.id,
    }).toArray() ;

    if (data.length !== 0 ) { 
        res.status(200).json({data: data[0].chatroom});
    }
})

router.get('/api/chatRoomName', async(req,res) => {
    const dbConnect = database.getDb();
    const chatRoomData = await dbConnect.collection("Chatroom"). find({
        id: req.query.chatId,
    }).toArray() ;

    const userIds = chatRoomData[0].users;
    var userIdforChat = ""

    if (userIds.length === 1) { 
        userIdforChat = userIds[0];
    } else {
        for (let i = 0; i < userIds.length; i ++) {
            if (userIds[i] !== req.query.userId) {
                userIdforChat = userIds[i];
            }
        }
    }

    const userData = await dbConnect.collection("Users"). find({
        id: userIdforChat,
    }).toArray() ;

    if (userData.length !== 0 ) { 
        res.status(200).json({
            data: userData[0].username,
            avatar: userData[0].avatar,
        });
    }
})

router.get('/api/chatRoom/messages', async(req,res) => {
    const dbConnect = database.getDb();
    const chatRoomData = await dbConnect.collection("Chatroom").find({
        id: req.query.chatId,
    }).toArray() ;
    const messages = chatRoomData[0].messages;
    res.status(200).json({
        data: messages
    });
})

router.post('/api/chatRoom/messages', async(req,res) => {
    const dbConnect = database.getDb();
    const log = await dbConnect.collection("Chatroom").updateOne(
        { id: req.body.chatId },
        {$push: {messages: {content: req.body.content, from: req.body.from}} }
    ) ;

 
    
    res.status(200).json({
        data: "sent"
    });
})


module.exports = router