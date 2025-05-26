const mongoose = require('mongoose');

const eventReminderSchema = new mongoose.Schema(
    {
        event_id: {
            type: String,
            required: true,
        },
        event_title: {
            type: String,
            required: true,
        },
        event_start_date: {
            type: Date,
            required: true,
        },
        event_end_date: {
            type: Date,
            required: true,
        },
        // time: {
        //     type: String,
        //     required: true,
        // },
        // host: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true,
        // },
        // members: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true,
        // }],
    },
    { timestamps: true }
);

const EventReminder = mongoose.model('EventReminder', eventReminderSchema);
module.exports = EventReminder;
