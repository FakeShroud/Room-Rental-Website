const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
    // room : {
    //     type: String,
    //     required: true,
    // },
    // _id: {
    //     type: String,
    //     required: true,
    // },
    // userid : {
    //     type: String,
    //     required: true,
    // },
    fromdate : {
        type: String,
        required: false,
    },
    todate : {
        type: Date,
        required: false,
    },
    totalamount : {
        type: Number,
        required: false,
    },
    totdaldays : {
        type: Number,
        required: false,
    },
    transactionId : {
        type: String,
        required: false,
    },
    // status : {
    //     type: String,
    //     required: true,
    //     default: "booked",
    // }
}, {timestamps: true});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

