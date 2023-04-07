const mongoose = require('mongoose')
const mongourl = ('mongodb+srv://sri:Augusta12@cluster0.lk9wt7k.mongodb.net/hotel')
mongoose.connect(mongourl, {useunifiedtopology : true , useNewurlparser:true})

const connection = mongoose.connection

connection.on('error',()=> {
    console.log('connection failed');
})

connection.on('connected', ()=>{
    console.log('db conneted');
})

module.exports=mongoose