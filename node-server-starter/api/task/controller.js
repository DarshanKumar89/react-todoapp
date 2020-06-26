import Task from '../../models/task';

export const createTask = async (req, res) => {
    const { userId } = req.auth;
    const { name, type } = req.body;

    if (!name || !type) {
        res.status(302).json({ message: 'provide all information!' });
    }

    const task = new Task({ name, type, userId });
    try {
        const data = await task.save();
        res.status(200).json({ data, message: 'task created' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error!' });
    }
};

export const getTasks = async (req, res) => {
    const { userId } = req.auth;
    try {
        const data = await Task.find({ userId });
        res.status(200).json({ data, message: 'all tasks' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error!' });
    }
}