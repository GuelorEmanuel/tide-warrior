var map = null,
    waypoints = [],
    polyline = null,
    accessToken = "";

function drawRoute() {
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
            var myPoints = {};
            myPoints.firstPoint = point[0];
            myPoints.secondpoint = point[1];

            return [myPoints.secondpoint, myPoints.firstPoint];
        });
        if (polyline) {
            polyline.setLatLngs(route);
        }
    });
}

function makeMarker(location) {
    var sourceMarker = L.marker(location, { draggable: true }).addTo(map);
    sourceMarker.on('dragend', drawRoute);
    waypoints.push(sourceMarker);
    drawRoute();
}

function drawMap(token, map_center, destination) {
    accessToken = token;
	L.mapbox.accessToken = accessToken;
	map = L.mapbox.map('map', 'chukzzy.mj252lbf', { zoomControl: false }) .setView([map_center.latitude, map_center.longitude], map_center.zoom);

	new L.Control.Zoom({ position: 'topright'  }).addTo(map);
	new L.control.locate({ position: 'topright'}).addTo(map);

    map.on('click', function(event) {
        makeMarker(event.latlng);
    });

    if (destination) {
        /* Let's add a callback to makeMarker so that it can draw the route only
         * after it's done processing the marker adding. */

        polyline = L.polyline(waypoints, {color: 'blue'}).addTo(map);

        var destinationMarker = L.marker([destination.latitude, destination.longitude]).addTo(map);
        waypoints.push(destinationMarker);

        // prompt to as the user to use current location
        alert("Do you want to use your current location?");/*, function(accepted) {
            if (accepted) { */
                // get current location
                var currentLocation = [6.432081, 3.433406];
                makeMarker(currentLocation);
           /* }
        });*/
    }
}
