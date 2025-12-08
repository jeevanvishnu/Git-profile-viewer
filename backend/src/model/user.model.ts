import mongoose, { Schema } from "mongoose";


type Iuser ={
    name:string,
    userName:string,
    profileUrl:string,
    avatarUrl:string,
    likedProfile:string[],
    likedBy:[]
}

const userSchema= new Schema<Iuser>({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        default:""
    },
    profileUrl:{
        type:String,
        required:true,

    },
    avatarUrl:{
        type:String
    },
    likedProfile:{
        type:[String],
        default:[]
    },
    likedBy:[
        {
            userName:{
                type:String,
                required:true
            },
            avatarUrl:{
                type:String
            },
            LikedData:{
                type:Date,
                default:Date.now
            }
        }
    ]

}{timestamps:true})


const User = mongoose.model<Iuser>("User" , userSchema)

export default User