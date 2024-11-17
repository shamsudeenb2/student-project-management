import mongoose from "mongoose";




//define user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    name: {
        type: String,
        required: true,
      },
      personalNo: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 5,
      },
      state: {
        type: String,
       
      },
      dob: {
        type: String,
      },
      role: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    program: {
      type: String,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }] ,
    
    supervisor:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const coursesSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  course_code: {
    type: String,
    required: true,
    unique: true
  },
  credit_unit: {
    type: String,
  },
  facaulty: {
    type: String,
  },
  department: {
    type: String,
  },
  lecturer:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {
    type: Date,
    default: Date.now
  }
});


// models/ChatModel.js

const ChatSchema = new mongoose.Schema({
  // student: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  // leturer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  members: Array,
},{timestamps: true});

const messageSchema = new mongoose.Schema({
  chatId: String,
  senderId: String,
  text: String,
},{timestamps: true});

const fileUrlSchema = new mongoose.Schema({
  chatId: String,
  senderId: String,
  fileUrl: String,
  message: String,
  isDownloaded: Boolean
},{timestamps: true});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Courses = mongoose.models.Courses || mongoose.model("Courses", coursesSchema)

export const ChatModel = mongoose.models.ChatModel || mongoose.model('ChatModel', ChatSchema);

export const MessageModel = mongoose.models.MessageModel || mongoose.model('MessageModel', messageSchema);

export const FileUrlModel = mongoose.models.FileUrlModel || mongoose.model('FileUrlModel', fileUrlSchema);
