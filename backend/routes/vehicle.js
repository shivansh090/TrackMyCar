app.get('/vehicle', (req, res) => {
    const vehicleData = JSON.parse(fs.readFileSync('backend/data/vehicle_data.json'));
    const randomIndex = Math.floor(Math.random() * vehicleData.length);

    // Assuming you have a route array in your vehicle data
    const { latitude, longitude, route } = vehicleData[randomIndex];

    res.json({ latitude, longitude, route });
});
