// Replace with your API endpoint
const apiUrl = 'http://localhost:3000/vehicle';

// Initialize the map
const map = L.map('map').setView([23.221169838733566,77.40406375765923], 13);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const carIcon = L.icon({
    iconUrl: './car.png', // Replace with your local image path
    iconSize: [20, 20], // Adjust icon size as needed
    
  });
// Create a vehicle marker
const vehicleMarker = L.marker([17.385044, 78.486671], {icon : carIcon}).addTo(map);

// Variable to store the previous route polyline
let previousRoutePolyline;

// Function to update vehicle position
function updateVehiclePosition() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const { latitude, longitude, route } = data;
            vehicleMarker.setLatLng([latitude, longitude], { icon: carIcon });

            // Remove previous route if it exists
            if (previousRoutePolyline) {
                map.removeLayer(previousRoutePolyline);
            }

            // Create a Polyline object for the route
            if (route && route.length > 1) {
                previousRoutePolyline = L.polyline(route, { color: 'blue' }).addTo(map);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Update vehicle position every 5 seconds
setInterval(updateVehiclePosition, 1000);
