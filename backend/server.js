
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for dev
    methods: ["GET", "POST"]
  }
});

// Mock Database (In-Memory)
let activeRides = [];
// activeDrivers could be a Map<socketId, driverData>

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join Room based on Role
  socket.on('join_role', (role) => {
    socket.join(role); // 'user' or 'driver' or 'admin'
    console.log(`Socket ${socket.id} joined as ${role}`);
  });

  // User: Request Ride
  socket.on('request_ride', (data) => {
    // data: { userId, pickup, drop, price, userLocation }
    const rideId = `ride_${Date.now()}`;
    const newRide = { ...data, id: rideId, status: 'SEARCHING', driversNotified: [] };
    activeRides.push(newRide);

    console.log('New Ride Requested:', newRide);

    // Broadcast to ALL drivers (In real app, filter by Haversine distance < 5km)
    io.to('driver').emit('new_ride_available', newRide);
  });

  // Driver: Accept Ride
  socket.on('accept_ride', (data) => {
    // data: { rideId, driverId, driverName, driverLocation }
    const rideIndex = activeRides.findIndex(r => r.id === data.rideId);
    
    if (rideIndex !== -1 && activeRides[rideIndex].status === 'SEARCHING') {
        const ride = activeRides[rideIndex];
        ride.status = 'ASSIGNED';
        ride.driver = data;
        
        console.log(`Ride ${ride.id} accepted by ${data.driverName}`);

        // Notify SPECIFIC User who requested
        // In a real app, we'd map userId to socketId. Here we broadcast to 'user' room for simplicity or need socketId in request
        // Better: client sends socketId in 'request_ride'
        
        io.emit(`ride_update_${ride.id}`, ride); // Broadcast update to everyone relevant
    }
  });

  // Driver: Update Location
  socket.on('driver_location_update', (data) => {
      // Broadcast to users tracking this driver
      // io.emit('driver_moved', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});
