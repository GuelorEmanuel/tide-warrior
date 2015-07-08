var MariaClient = require('mariasql'),
	db = new MariaClient(),
	user = "tide-warrior",
	password = "p@55w0rd",
	db_name = "tide";

db.connect({
  host: 'localhost',
  port: 3306,
  user: user,
  password: password,
  db: db_name
});

db
	.on('connect', function() {
		console.log("Succesfully connected to the database '" + db_name + "'");
		afterDatabaseConnection();
	})
	.on('error', function(err) {
	   console.log("Error connecting to the database server");
	 })
	 .on('close', function(hadError) {
	   console.log("Connection to database server sucessfully closed");
	 });

var afterDatabaseConnection = function () {
	var categoriesTable = 'places_categories',
		placesTable = 'places',
		geolocationsTable = 'geolocations',
		dropTablesSuccess = false;

	db.query("DROP TABLE IF EXISTS " +
			  categoriesTable + ", " +
			  placesTable + ", " +
			  geolocationsTable)
		.on('result', function(res) {
			res
				.on('row', function(row) {
				    console.log('Database server says: ' + row);
				})
			    .on('error', function(err) {
			    	console.log('Database server says: ' + err);
			    })
			    .on('end', function(info) {
			     	dropTablesSuccess = true;
			    });
		})
		.on('end', function() {
			if (dropTablesSuccess) {
				console.log("Dropped Existing Tables with Names '" +
							 categoriesTable + "' '" +
							 placesTable + "' '" +
							 geolocationsTable + "'");
			}
		});

	db.end();
}