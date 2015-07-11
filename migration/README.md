We will be using MariaDb (SQL Based) for our backend server.

You can read the documentation and how to get started [here](https://mariadb.com/kb/en/mariadb/getting-started/)

The minimum requirements are to have a mariadb/mysql server on your local
machine, and a root user on the server.

##### Try some of these links for installation instructions for your OS
[Mac](https://mariadb.com/kb/en/mariadb/building-mariadb-on-mac-os-x-using-homebrew/)
[Ubuntu](https://downloads.mariadb.org/mariadb/repositories/#mirror=osuosl&distro=Ubuntu&version=10.0&distro_release=trusty)
[Windoze](https://www.youtube.com/watch?v=yQPnCxJMOWI)

In this same directory, run `npm install` and `npm start`. This should
run a script to create a database for tide and a user that has permission
to access it.

### Note:
If you get npm error logs when you run `npm install`, try running
`npm install` again with `--python=python2` flag.

Once the database and user are created, then every other script should be
able to create tables in the database with our default user.

Navigate to from-locations and run `npm install` and `npm start`. Wait for the script to finish.

Navigate to from-events (or any other subfolder here containing scripts
that migrate what you might need), and do the same thing.

## Note:
Make sure you run from-locations first before from-events because events
need places ofcourse.

#### Running any of these scripts has a potential of wiping your local
#### data in the database, (and maybe replacing it with new ones)
#### If the data is very important to you, always make sure to backup
#### your database before running any of these scripts