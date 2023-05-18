const express = require('express');
const app = express();

const dbConfig = require('./db');
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const deleteRoutes = require("./routes/deleteRoutes");
const router = require('./routes/usersRoute');
app.use(express.json())
app.use(router)

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api', deleteRoutes);

  
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));