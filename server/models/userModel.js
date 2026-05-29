import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true,
        },

        password : {
            type : String,
            required : true,
        },

        firstname : {
            type : String,
            required : true,
        },

        lastname : {
            type : String,
        }, 
        isAdmin : {
            type : Boolean,
            default : false,
        },
        profilePicture : String,
        coverPicture : String,
        about : String,
        livesIn : String,
        worksAt : String,
        country: String,
        relationship : String,
        followers : [],
        following : [],
    },
    { timestamps : true }
)

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;