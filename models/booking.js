const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
    room : {
        type: String,
        required: true,
    },
    roomid : {
        type: String,
        required: true,
    },
    userid : {
        type: String,
        required: true,
    },
    fromDateObj : {
        type: String,
        required: true,
    },
    toDateObj : {
        type: String,
        required: true,
    },
    totalamount : {
        type: Number,
        required: true,
    },
    totdaldays : {
        type: Number,
        required: true,
    },
    transactionId : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        required: true,
        default: "booked",
    }
}, {timestamps: true});
const bookingmodel = mongoose.model('bookings', bookingSchema);
module.exports = bookingmodel;

