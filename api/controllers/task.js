const Task = require('../models/Task')


const task= async(req,res, next)=>{
  try{
    const newTask = new Task(req.body)
    const saveTask = await newTask.save()

    res.status(200).json(saveTask)
  }catch(err){
    next(err)
  }

}

  
  

const updateTask= async(req,res,next) =>{
  try{
    const updateTask= await Task.findByIdAndUpdate(req.params.id, {
        $set:req.body
    }, {new: true})

    res.status(200).json(updateTask)

  }catch(err){
    next(err)
  }

}

const updateStatus = async(req,res, next)=>{
 
  const {status}= req.body

  try{
    const update= await Task.findByIdAndUpdate(req.params.id, {
      $set:{status}
      
    },{new:true})
   
    console.log("Task ID:");
console.log("New Status:", status);

    res.status(200).json(update)
   

  }catch(err){
    console.error('Error updating task status:', err);
    next()
  }

}

const deleteTask = async(req,res,next)=>{
  
  try{
    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json("The Task has been deleted")

  }catch(err){
    next(err)
  }
    
}
const getTask =async(req,res,next)=>{
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

   
    
    const tasks = await Task.find({ user: userId }) || [];

    if (!tasks) {
      return res.status(404).json({ error: 'No tasks found for the specified user' });
    }

  

    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
 


 

};
const getTaskQuery = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const title = req.query.title;
    const description = req.query.description;

    console.log('userId:', userId);
    console.log('title:', title);
    console.log('description:', description);

    const query = { user: userId };

    if (title) {
      query.title = { $regex: new RegExp(title, 'i') };
    }else if (description) {
      query.description = { $regex: new RegExp(description, 'i') };
    }

    const tasks = await Task.find(query);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

module.exports= {task, updateTask, deleteTask, getTask, updateStatus, getTaskQuery}