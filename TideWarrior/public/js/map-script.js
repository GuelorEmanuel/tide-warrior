var drawMap = function (accessToken, map_center, pin_location) {
	L.mapbox.accessToken = accessToken;
	var map = L.mapbox.map('map', 'chukzzy.mj252lbf', { zoomControl: false }) .setView([map_center.latitude, map_center.longitude], map_center.zoom);

	new L.Control.Zoom({ position: 'topright'  }).addTo(map);
	new L.control.locate({ position: 'topright'}).addTo(map); 


    /* Let's add a callback to makeMarker so that it can draw the route only
     * after it's done processing the marker adding. */

    var numOfMarkers = 0;
    var myPoints = {};

    /*map.on('click', function(e) {
        if(numOfMarkers < 2)
            makeMarker(e, drawRoute);
    });*/


	var waypoints = [];
    //var polyline = L.polyline([]).addTo(map);

    var polyline = L.polyline(waypoints, {color: 'blue'}).addTo(map);

    var marker1 = L.marker([6.432081, 3.433406], { draggable: true }).addTo(map);
    var marker2 = L.marker([6.503119, 3.378543], { draggable: true }).addTo(map);

    marker1.on('dragend', drawRoute);
    marker2.on('dragend', drawRoute);

    waypoints.push(marker1);
    waypoints.push(marker2);
    
    drawRoute();

    /*function makeMarker(e, done) {
        var marker = L.marker(e.latlng, { draggable: true }).addTo(map);
        marker.on('dragend', drawRoute);
        waypoints.push(marker);
        numOfMarkers++;
        return done();
    }*/


    function drawRoute() {
        if (waypoints.length > 2) return;
        // Directions API request looks like
        // http://api.tiles.mapbox.com/v4/directions/mapbox.driving/
        //    -122.42,37.78;-77.03,38.91.json?access_token={access_token}
        // We'll construct this using latlngs from the markers in waypoints.

        var points = waypoints.map(function(marker) {
            var latlng = marker._latlng;
            return [latlng.lng, latlng.lat].join(',');
        }).join(';');

        var directionsUrl = 'https://api.tiles.mapbox.com/v4/directions/mapbox.driving/' +
        points + '.json?access_token=' + accessToken;

        $.get(directionsUrl, function(data) {
            // Do something with the directions returned from the API.
            var route = data.routes[0].geometry.coordinates;
            route = route.map(function(point) {
                // Turns out if we zoom out we see that the lat/lngs are flipped,
                // which is why it didn't look like they were being added to the
                // map. We can invert them here before drawing.
                myPoints.firstPoint = point[0];
                myPoints.secondpoint = point[1];

                return [myPoints.secondpoint, myPoints.firstPoint];
            });
            polyline.setLatLngs(route);
        });
    }



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
