var drawMap = function (map_center, pin_location) {
	L.mapbox.accessToken = 'pk.eyJ1IjoiY2h1a3p6eSIsImEiOiJlMDRiNjNlNGJmMmE1NDc1MGNlMWRlNDYxYjdlNzllYiJ9.HIP8SZFPE4VHvgvGb1LDZg';
	var map = L.mapbox.map('map', 'chukzzy.mdcmd242') .setView([map_center.latitude, map_center.longitude], map_center.zoom);

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