
import moongose from "mongoose"


const taskSchema=new moongose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:["todo","in-progress,done","done"]
    },
    priority:{
        type:String,
        enum:["low","medium","high"]
    },

},  {timestamps:true},)


export default moongose.model("task",taskSchema)