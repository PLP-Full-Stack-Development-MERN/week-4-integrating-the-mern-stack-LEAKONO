const mongoose=require('mongoose')
const Task=require("../models/Task");

const getTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({})
        res.status(200).json({message:"Fetch all tasks successfully",tasks})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
const getTask=async(req,res)=>{
    try{
        const taskData=await Task.findById(req.params.id)
        if(!taskData){
            return res.status(404).json({message:"Task not found"})
        }
        res.status(200).json(taskData)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
const createTask = async (req, res) => {
    const { title, status, description } = req.body;
    try {
        if (!title || !status || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTask = await Task.create({ title, status, description });
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateTask=async(req,res)=>{
    try{
        const updatedTask=await Task.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        if(!updatedTask){
            return res.status(404).json({message:"Task not found"})
        }
        res.status(200).json({ message: "Task updated successfully", updatedTask });

    }catch(err){
        res.status(500).json({error:err.message})

    }
}
const deleteTask=async(req,res)=>{
    try{
        const deletedTask=await Task.findByIdAndDelete(req.params.id)
        if(!deletedTask){
            return res.status(404).json({message:"Task not found"})
        }
        res.status(200).json({message:"Task deleted successfully"})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports={
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};