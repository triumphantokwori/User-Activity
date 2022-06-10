# User Activity
## CLI tool with node.js

A simple program that helps to visualise the growth of a specific userbase.
It collects information from a particular API endpoint and draws a graph in the terminal.
Required inputs are the dates within which the userbase growth should be displayed. Note that these dates are limited by the API endpoint.


### Application set up
This CLI tool uses the following node libraries;
* **axios** - to make request from the api endpoint ( npm install axios )
* **console-bar-chart** - renders the requested data in a bar chart graph ( npm install console-bar-chart )


### How to use
This application runs in the terminal. When inside the project directory, run **'node index.js'**
