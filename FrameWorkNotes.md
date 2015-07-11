## Tide Warrior

### Development Tools: 
    NodeJS => running a server
    npm => managing packages installed on server
    bower => managing client-side frameworks
    git => version control
    github => version control
    browser => get familiar with Developer Tools on you browser
    
### Run:
    git pull <remote> <branch-name> 
    npm install
    bower install
    npm start or node[mon] ./bin/www
    
    
### File Structure:
    ../ => MapProjectTest, TideWarrior, locations, scrum and other hidden files/folders
    bin
    | - www => starting point
    node-modules => a list of the modules is in package.json, under dependencies
    places
    | - place_category.json => using this as temporary db for now. Should find better alternative ASAP
    public
    | - css => css stylesheets live here
    | - | - style.css => general style, used by all pages
    | - | - page-style.css => only used by 'page'
    | - img => images live here
    | - js => javascripts live here (this excludes angular stuff)
    | - lib => bower installed stuff live here
    | - modules => angular modules live here
    | - | - module-name
    | - | - | - controllers => all controllers of this module live here
    | - | - | - services => all services or factories of this module go here
    | - | - | - app.js => where module and routes are defined
    | - partials => partial html files needed by angular view live here
    routes => each root url route would ideally have its own .js file defined here
    views => the html files rendered by the server (using HoganJS)
    .bowerrc => configuration file for bower
    app.js => this is where the server puts most of the ish together
    bower.json => file for managing bower installed components
    config.js => this is where we define variables or values we want available to everyone
    events.json => randomly generated info about events, for demo purposes. Should move ASAP
    package.json => file for managing npm installed modules
    
# NOTE: 

    This is just a demo to give us all an idea of what this thing MIGHT be about.
    It is also intended as a starting point for us all to get comfortable with 
    most of these tools because we MIGHT be using them for the actual development.
    Please, tinkle around with this and get familiar with whatever seems confusing.
    I tried to add a lot of comments, including this file to get us all started.
    My hope is, by playing around with this for the next couple of days, it will be
    easier to choose an actual development framework because we would all have ideas
    about most of these things and know what we want and what we don't.
