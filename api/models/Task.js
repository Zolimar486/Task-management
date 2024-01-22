const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
 dueDate: {
    type: Date,
  
  },
  priority: {
    type: String,
    
  },
  
  status:{
    type:String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your user model is named 'User'
    required: true,
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
