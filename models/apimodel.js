const mongoose = require('mongoose')

const apiSchema = mongoose.Schema(
    {
        name:{
            type:String
        },
        description:{
            type:String
        },
        status:{
            type:String
        },
        age:{
            type:Number
        },
    }
)

module.exports = mongoose.model('DataInfo', apiSchema)