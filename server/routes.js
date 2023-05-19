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

module.exports = router