
var map = null,
    waypoints = [],
    polyline = null,
    accessToken = "";


/* Function to draw routes from a starting point to selected or respective destination */
function drawRoute() {

    if(waypoints.length < 2) return;

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

            return [point[1], point[0]];
        });
        if (polyline) {
            polyline.setLatLngs(route);
        }
    });
}


/* This makes markers on the map when clicked on any part of the map */
function makeMarker(location) {
    if (waypoints.length > 1) {
        map.removeLayer(waypoints.pop());
    }

    var sourceMarker = L.marker(location, { draggable: true }).addTo(map);
    sourceMarker.on('dragend', drawRoute);
    waypoints.push(sourceMarker);
    drawRoute();
}


/* Handles displaying the map and positioning of the map etc... */
function drawMap(token, map_center, destination) {
    accessToken = token;
	L.mapbox.accessToken = accessToken;
	map = L.mapbox.map('map', 'chukzzy.mj252lbf', { zoomControl: false }) .setView([map_center.latitude, map_center.longitude], map_center.zoom);

	new L.Control.Zoom({ position: 'topright'  }).addTo(map);
	new L.control.locate({ position: 'topright'}).addTo(map);

    map.on('click', function(event) {
        makeMarker(event.latlng);
    });

    polyline = L.polyline(waypoints, {color: 'blue'}).addTo(map);

    if (destination) {
        /* Let's add a callback to makeMarker so that it can draw the route only
         * after it's done processing the marker adding. */

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
