const express = require('express');
const cron = require('node-cron');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const habitSchema = new mongoose.Schema({
    completedToday: Boolean,
});

const Habit = mongoose.models.Habit || mongoose.model('Habit', habitSchema);

const app = express();
const PORT = 3001;

cron.schedule('* * * * *', async () => {
    try {
        console.log('Cron job running every minute...');
        const result = await Habit.updateMany(
            { completedToday: true },
            { $set: { completedToday: false } }
        );
        console.log('Habits reset successfully.');
    } catch (error) {
        console.error('Error resetting habits:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Cron server running on port ${PORT}`);
});