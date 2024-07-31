const mongoose=require('mongoose');
const ConnecttoDB=async ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log(`The database is connected to ${conn.connection.host}`)
    })
    .catch((error)=>{
        console.log("Database is not connected");
    })
}
module.exports=ConnecttoDB;