mapboxgl.accessToken = 'pk.eyJ1IjoiY29ubmllbHkyMDA0IiwiYSI6ImNsbmdqeWVvZTB6NXoyc2xmZzRqY2RicXoifQ._nLR-VuK8TtSrRdInnWm3w';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v11',
  zoom: 3,
  center: [-99.239585,39.459134],
  projection: 'globe'
});

map.on('load', () => {
  map.setFog({});
});

// Get the locate button element
const locateButton = document.getElementById('locate-button');

// Add a click event listener to the locate button
locateButton.addEventListener('click', () => {
  // Check if geolocation is supported by the browser
  if ("geolocation" in navigator) {
    // Request the user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Create a marker at the user's location
      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);

      // Zoom the map to the user's location
      map.flyTo({
        center: [longitude, latitude],
        zoom: 10, // Adjust the zoom level as needed
        essential: true // This animation is considered essential with regards to prefers-reduced-motion media query
      });
    }, (error) => {
      console.error("Error getting location:", error);
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});



