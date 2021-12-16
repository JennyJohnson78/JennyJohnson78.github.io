function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file
  // console.log(sample);
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var rawData = data;
    var rawSampleData = rawData.samples;
    //console.log(rawSampleData)
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    filteredSampleData = rawSampleData.filter(x => x.id == sample);
    //console.log(filteredSampleData);
    //  5. Create a variable that holds the first sample in the array.
    firstSample = filteredSampleData[0];
    // console.log(filteredSampleData)
    //console.log(firstSample);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    combo_table = filteredSampleData.map(x => ({ids: x.otu_ids, labels: x.otu_labels, values: x.sample_values})).sort((a,b) => b.values - a.values);
    //console.log(combo_table);
    otu_ids = combo_table[0].ids.map(x => x);
    otu_ids_tagged = otu_ids.map(x => "OTU "+x);
    //console.log(otu_ids);
    otu_labels = combo_table[0].labels.map(x => x);
    sample_values = combo_table[0].values.map(x => x);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0,10);
    //console.log(otu_ids);
    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids_tagged.slice(0,10).reverse(),
      orientation: 'h',
      type: 'bar',
      text: otu_labels.slice(0,10).reverse()
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
     title: "Top 10 Bacteria Cultures Found",
     yticks: yticks,
     width: 1000
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("horzBar", barData, barLayout);


    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: otu_ids
      },
      text: otu_labels,
      type: "scatter"
    }
   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis:{title: "OTU ID"},
      hovermode: "closest",
      margin: {pad: 5}
     };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    gaugeValue = rawData.metadata.filter(x => x.id == sample)[0].wfreq;
    //console.log(gaugeValue);

    var gaugeData = [{
      type: "indicator",
      mode: "gauge+number",
      title: "Belly Button Weekly Scrub Count",
      value: gaugeValue,
      gauge:{
        bar: {color: "black"},
        axis: {
          range: [0,10],
          tickwidth: 1,
          tickcolor: "black"
        },
        steps: [
          {range: [0,2],
          color: "red"
        },
        {range: [2,4],
          color: "orange"
        },
        {range: [4,6],
          color: "yellow"
        },
        {range: [6,8],
          color: "lime"
        },
        {range: [8,10],
          color: "green"
        },
        ]
      }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     margin: {pad: 5}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}