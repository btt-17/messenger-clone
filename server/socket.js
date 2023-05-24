const database = require('./database');
var i = 1
const socket = (socketIO) =>{
    socketIO.on('connection',  (s) => {
        console.log(`${socket.id} user just connected!`);
    
        const dbConnect = database.getDb();
        const collection =  dbConnect.collection("Chatroom")
        const changeStream = collection.watch([], { fullDocument: 'updateLookup' });
  
        s.on('checkMessage', async () => {
            changeStream.on("change", (event) => {
                if (event.operationType === 'update'   ) {
                    console.log(event)
                    const data = Object.values(event.updateDescription.updatedFields)
                    data[0]['_id'] = event._id._data;
                    console.log(data)
                    s.emit("messageChange", data);
                }
            })
            // const next = await changeStream.next();
            // console.log(next)
         
         });

            
    
        s.on('disconnect', () => {{
            console.log("A user disconnected");
        }})
    })   
}

module.exports =  socket;