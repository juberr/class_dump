// Add console.log to check to see if our code is working.

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
})


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
};

// 1. Add a 2nd layer group for the tectonic plate data.
let usStates = new L.LayerGroup();


// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "US States": usStates
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://raw.githubusercontent.com/juberr/class_dump/main/jan%2028/gz_2010_us_040_00_20m.json").then(function(data) {

  function getOpacity(data) {
    if (data > 100000) {
      return 0.7
    }
    if (data < 100000) {
      return 0.5
    }
  }
  function styleInfo(feature) {
  return {
    fillOpacity: getOpacity(feature.properties.CENSUSAREA),
  }
}
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		return L.polyline(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    //  // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  //  after the marker has been created and styled.
    //  onEachFeature: function(feature, layer) {
    //   layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  
  }).addTo(usStates
    );

  // Then we add the earthquake layer to our map.
  usStates
  .addTo(map);
});