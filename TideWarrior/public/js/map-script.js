var drawMap = function (map_center, pin_location) {
	L.mapbox.accessToken = 'pk.eyJ1IjoibmNzdGVjaDA3IiwiYSI6ImQyYTM3YzU3YmU1Mzk0MTYyYWFmYTg0N2VlYjkyZjVmIn0.TRjK4m5ljWCYsQzo5nncyg';
	var map = L.mapbox.map('map', 'ncstech07.0dd6e771') .setView([map_center.latitude, map_center.longitude], map_center.zoom).addControl(L.mapbox.geocoderControl('mapbox.places', {
		autocomplete: true
	}));

	// move the attribution control out of the way
	map.attributionControl.setPosition('bottomleft');

	// create the initial directions object, from which the layer
	// and inputs will pull data.
	var directions = L.mapbox.directions();

	var directionsLayer = L.mapbox.directions.layer(directions)
	.addTo(map);

	var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
	.addTo(map);

	var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
	.addTo(map);

	var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
	.addTo(map);

	var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
	.addTo(map);

	if (pin_location) {
		var marker_properties = {
			'marker-size': 'large',
		    'marker-color': '#BE9A6B',
		    'marker-symbol': 'circle'
		};
		if (pin_location.properties) {
			marker_properties.title = pin_location.properties.name;
		    marker_properties.description = pin_location.properties.description;
		    marker_properties["'marker-symbol'"] = pin_location.properties.symbol;
		}
		L.mapbox.featureLayer({
		    // this feature is in the GeoJSON format: see geojson.org
		    // for the full specification
		    type: 'Feature',
		    geometry: {
		        type: 'Point',
		        // coordinates here are in longitude, latitude order because
		        // x, y is the standard for GeoJSON and many formats
		        coordinates: [
		        	pin_location.longitude,
		        	pin_location.latitude
		        ]
		    },
		    properties: marker_properties
		}).addTo(map);

		map.panTo([pin_location.latitude, pin_location.longitude]);
	}
}
