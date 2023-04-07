
const mongoose = require('mongoose')

const roomschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    maxcount :{
        type:Number ,
        required: true
    },
    rent:{
        type:Number ,
        required:true
    },
    destination:{
        type:String,
        required:true
    },

    imgurl:{
        type:Array,
        required:true
    },

    currentbookings:[],

    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
    
    }
},
{
timeStamp : true,
},

{
    collection:"room"
}
)

const roomModel =mongoose.model('room',roomschema);

module.exports=roomModel