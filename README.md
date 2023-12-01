# belly-button-challenge
The belly button challenge contains an static/js folder, a index.html file, and a sample.json file.

The sample.json file that contains the same data that is used in the app.js script to create three visualiztions. The index.html file formats the page that contains the visualiztions.

The static/js folder contains a app.js script which pulls json data and creates three visualiztions for each sample within the data. The three visualiztions that are created for each sample are
- a horizontal bar graph of the top ten operational taxonomic units present in each sample
- a bubble graph of all of the operational taxonomic units in each sample
- a chart containing the metadata information of each sample
## Github Pages
The link for the Github page that hosts the index.html is: https://shruti-p-m.github.io/belly-button-challenge/
## Citations
- app.js used code from https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-in-d3 in the init function to add values to the dropdown menu
- app.js used code from https://plotly.com/javascript/bubble-charts/ to add the marker size and marker color attributes in the bubble charts
- app.js used code from https://stackoverflow.com/questions/54851645/how-to-display-both-key-and-value-in-object-using-javascript to add all of the key and values in each sample's meta data and to display it
