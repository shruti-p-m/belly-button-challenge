// saving url as a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function to initialize charts on webpage
function init() {

    d3.json(url).then(function(data){
        // setting up dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-in-d3
        data.names.forEach((sampleNum) => {
            dropdownMenu.append("option").text(sampleNum).property("value", sampleNum);
        });
        
        // saving sample names
        let sampleNames = data.names;

        // initializing the charts with the first sample
        barChart(sampleNames[0]);
        bubbleChart(sampleNames[0]);
        metadataChart(sampleNames[0]);
    });

};

init();

// function for bar chart
function barChart(sampleNum){

    d3.json(url).then(function(data){
        // getting the sample data
        let sampleArray = data.samples;
        // filter it for when the sample id matches the specific sample id
        let filterArray = sampleArray.filter(sample => sample.id == sampleNum);
        let sampleNumArray = filterArray[0];
        console.log(sampleNumArray);

        // getting the top ten results and putting in reverse order
        let xAxis = sampleNumArray.sample_values.slice(0,10).reverse();
        let yAxis = sampleNumArray.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = sampleNumArray.otu_labels.slice(0,10).reverse();
        console.log(xAxis);

        // setting up trace and making the bar horizontal
        let barTrace = {
            x: xAxis,
            y: yAxis,
            text: labels,
            type: "bar",
            orientation: "h"
        };
        let trace = [barTrace]

        // plotting bar chart
        Plotly.newPlot("bar", trace);
    });
};

// function to create bubble chart 
function bubbleChart(sampleNum){

    d3.json(url).then(function(data){
        // getting the sample data
        let sampleArray = data.samples;
        // filter it for when the sample id matches the specific sample id
        let filterArray = sampleArray.filter(sample => sample.id == sampleNum);
        let sampleNumArray = filterArray[0];
        
        // getting the sample values, otu_id, and otu_label for each sample
        let sample_values = sampleNumArray.sample_values;
        let otu_ids = sampleNumArray.otu_ids;
        let otu_labels = sampleNumArray.otu_labels;

        // creating trace for bubble graph
        // https://plotly.com/javascript/bubble-charts/
        let bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            // marker size changes with sample value and marker color changes with otu_id
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };
        let trace = [bubbleTrace];
        // plotting bubble chart
        Plotly.newPlot("bubble", trace);
    });
};

function metadataChart(sampleNum){
    d3.json(url).then(function(data){
        // getting the meta data
        let metadataArray = data.metadata;
        // filter it for when the sample id matched the specific sample id
        let metadataNumArray = metadataArray.filter(sample => sample.id == sampleNum);
        console.log(metadataNumArray);
        let metadata = metadataNumArray[0];
        d3.select("#sample-metadata").html("");

        // goes through all of the meta data for the same and adds each key and value
        // https://stackoverflow.com/questions/54851645/how-to-display-both-key-and-value-in-object-using-javascript
        Object.entries(metadata).forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

function optionChanged(value) { 
    // look here for help myself, but dont forget to delete this two comments
    // https://git.bootcampcontent.com/University-of-California---San-Diego/UCSD-VIRT-DATA-PT-08-2023-U-LOLC/-/tree/main/14-Interactive-Visualizations/3?ref_type=heads

    console.log(value); 

    barChart(value);
    bubbleChart(value);
    metadataChart(value);
};