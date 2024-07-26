const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Simulated vehicle data
let vehicleData = {
  latitude: 23.221169838733566,
  longitude: 77.40406375765923,
  route: []
};
const maxRouteLength=1000;

// Function to simulate vehicle movement
function simulateVehicleMovement() {
  const radius = 0.0001; // Adjust radius as needed
  const angle = Math.random()*3; // Adjust angle increment as needed

  const newLat = vehicleData.latitude + radius * Math.sin(angle);
  const newLng = vehicleData.longitude + radius * Math.cos(angle);

  vehicleData.latitude = newLat;
  vehicleData.longitude = newLng;
  vehicleData.route.push({ lat: newLat, lng: newLng });


  if (vehicleData.route.length > maxRouteLength) {
    // Reset vehicle position and clear route
    vehicleData.latitude = 23.221169838733566;
    vehicleData.longitude = 77.40406375765923;
    vehicleData.route = [];
  }
}

// Simulate vehicle movement every 5 seconds
setInterval(simulateVehicleMovement, 1000);


app.get('/vehicle', (req, res) => {
  res.json(vehicleData);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
