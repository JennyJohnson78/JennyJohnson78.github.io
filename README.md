# Full Stack Data Visualization Dashboard Webpage

## Overview

Improbable Meat is a company that seeks to create beef alternatives from belly button bacteria. For this analysis, a completed panel of demographic information needs to be created, as well as visualizations for the bacterial data for each volunteer. Specifically, volunteers should be able to identify the top 10 bacterial species in their belly buttons. That way, if Improbable Beef identifies a species as a candidate to manufacture synthetic beef, the volunteers will be able to identify whether that species is found in their navel.

To be created:
- Create a Horizontal Bar Chart
- Create a Bubble Chart
- Create a Gauge Chart
- Customize the Dashboard

### Deployment: https://jennyjohnson78.github.io/

## Results

### Create a Horizontal Bar Chart

### See charts.js for code that initiates charts (buildCharts(); function)

- Create horizontal bar chart:
```
// Create horizonal bar chart
    var yticks = otu_ids.slice(0,10);
    //console.log(otu_ids);
    // Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids_tagged.slice(0,10).reverse(),
      orientation: 'h',
      type: 'bar',
      text: otu_labels.slice(0,10).reverse()
    }];
    // Create the layout for the bar chart. 
    var barLayout = {
     title: "",
     yticks: yticks,
     width: 1000
    };
    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
```

![image](https://user-images.githubusercontent.com/67409852/146320428-7e47681b-df64-4d87-8014-f095c8256b9d.png)

### Create a Bubble Chart

```
// Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis:{title: "OTU ID"},
      hovermode: "closest",
      margin: {pad: 5}
     };

    // Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
```

![image](https://user-images.githubusercontent.com/67409852/146321242-7f072c1b-4a54-4cdd-87ed-f46be3864bb4.png)

### Create a Gauge Chart

```
// Create the layout for the gauge chart.
    var gaugeLayout = { 
     margin: {pad: 5}
    };

    // Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
```

![image](https://user-images.githubusercontent.com/67409852/146320631-178452b3-db99-4d6d-8102-ace21a35aaa0.png)

### Customize the Dashboard

- HTML and Bootstrap allow for jumbotron customization and the ability to filter by participant

![image](https://user-images.githubusercontent.com/67409852/152754064-031d991f-4911-40ef-8108-2f802b12cb6b.png)

## Summary

Plant and non-meat sources of "meat" are the future of the American menu. With more and more people looking to remove animal meat from their diets, the demand for synthetic meat will only continue to grow. The creation of meat substitutes via belly button bacteria may be a solution to this growing demand. Part of the appeal of donating ones bacteria is the ability to see how their contribution is furthering this technology. By creating a webpage where volunteers can track their bacteria, data analytics illuminates the endless possibilities of people to interact with their own data.
