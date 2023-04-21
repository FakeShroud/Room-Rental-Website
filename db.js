const mongoose = require('mongoose');
var mongoURL = 'mongodb+srv://np03cs4s210226:kkdpqIM6hxoUWpAG@cluster0.dsfrtdt.mongodb.net/mern-room-rental'
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})

var connection = mongoose.connection;
connection.on('error', ()=> {
    console.log('Error connecting to MongoDB');
});
connection.on('connected', () => {
    console.log('Connected to MongoDB');
})
module.exports = mongoose;