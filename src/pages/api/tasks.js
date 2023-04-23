import Task from "@/db/models/task";
import Category from "@/db/models/category";

const getAllTasks = async (request, response) => {
    try {
        const tasks = await Task.findAll({
            include: [Category]
        });
        response.json(tasks);
    } catch (error) {
        console.error(error);
        response.status(500).json({message: 'Server error'});
    }
}

const createTask = async (request, response) => {
    const { name, categoryId } = request.body;
    if (!name || !categoryId) {
        return response.status(400).json({message: 'Name and category id is required'});
    }

    try {
        const task = await Task.create({ name, categoryId });
        response.status(201).json(task);
    } catch (error) {
        console.error(error);
        response.status(500).json({message: 'Server error'});
    }
}

const updateTask = async (request, response) => {
    const { id } = request.body;

    if (!id) {
        return response.status(400).json({message: 'Task id is required'});
    }

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return response.status(404).json({ message: 'Task not found' });
        }

        task.completed = !task.completed;
        await task.save();
        response.status(200).json(task);
    } catch (error) {
        console.error(error);
        response.status(500).json({message: 'Server error'});
    }
}

const deleteTask = async (request, response) => {
    const { id } = request.query;

    if (!id) {
        return response.status(400).json({message: 'Task id is required'});
    }

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return response.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        response.status(200).json({message: 'Task was deleted'});
    } catch (error) {
        console.error(error);
        response.status(500).json({message: 'Server error'});
    }
}

export default async (request, response) => {
    switch (request.method) {
        case 'GET':
            return getAllTasks(request, response);
        case 'POST':
            return createTask(request, response);
        case 'PUT':
            return updateTask(request, response);
        case 'DELETE':
            return deleteTask(request, response);
        default:
            return response.status(405).json({message: 'Method not allowed'})
    }
}
