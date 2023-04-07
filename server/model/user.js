const mongoose = require('mongoose')



const userschema=mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        address: String,
        number: String,
        adhar: String,
        // isActive: {type:Boolean,default:true},
        // isDeleted: {type:Boolean,default:false}
},
{
    collection:"user"
}

)

module.exports=mongoose.model('user',userschema)