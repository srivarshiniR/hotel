
const mongoose = require('mongoose')

const roomtypeschema = mongoose.Schema({

    hotel_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    max_member :{
        type:String,
        required: true
    },
    rent:{
        type:Number ,
        required:true
    },
     bed:{
        type:String ,
        required:true
    },

    currentbookings:[],

    type:{
        type:String,
        required:true
    },
},
{
timeStamp : true,
},

{
    collection:"roomtype"
}
)

const roomtypeModel =mongoose.model('roomtype',roomtypeschema);

module.exports=roomtypeModel