import Task from '../models/Task.js'

export const getTasks = async (req, res, next) => {
    try{
        const tasks = await Task.find({userId: req.user._id}).sort({createdAt:-1});
        res.status(200).json(tasks);
    } catch(error){
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try{
        const task = await Task.findOne({_id: req.params.id, userId: req.user._id});
        if(!task){
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json(task);
    } catch(error){
        next(error);
    }
};

export const createTask = async (req, res, next) => {
    try{
        const{title,description,status} = req.body;

        if(!title || !description){
            return res.status(400).json({message: 'Please provide all required fields'})
        }

        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            userId: req.user._id
        });

        res.status(201).json(task);
    } catch(error){
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

export const updateTask = async (req, res, next) => {
    try{
        const {title, description, status} = req.body;
        const task = await Task.findOne({_id: req.params.id, userId: req.user._id});

        if(!task){
            return res.status(404).json({message: 'Task not found'})
        }
        if(task.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({message: 'Not authorized'})
        }   

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();
        res.status(200).json(task);
    } catch(error){
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try{
        const task = await Task.findOne({ _id: req.params.id});

        if(!task){
            return res.status(404).json({message: 'Task not found'})
        }

        if(task.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({message: 'Not authorized'})
        }

        await task.deleteOne();
        res.status(200).json({message: 'Task deleted successfully'});
    } catch(error){
        next(error);
    }
}

export const updateTaskStatus = async (req, res, next) => {
    try{
        const {status} = req.body;
        const task = await Task.findOne({_id: req.params.id});

        if(!task){
            return res.status(404).json({message: 'Task not found'})
        }

        if(task.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({message: 'Not authorized'})
        }

        task.status = status;
        await task.save();
        res.status(200).json(task);
    } catch(error){
        next(error);
    }
} 

