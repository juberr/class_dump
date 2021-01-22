// Submit Button handler
//buildPlot("richmond")
function handleSubmit() {
  // @TODO: YOUR CODE HERE
  var inputField = d3.select("#stockInput");
  // Select the input value from the form
  var chosenCity = inputField.node().value;
  // clear the input value
  inputField.node().value = "";
  // Build the plot with the new stock
  buildPlot(chosenCity);
};

function getTimes(owmData) {
  return owmData.list.map(x => x.dt_txt)
}

function getTemps(owmData) {
  return owmData.list.map(x => x.main.temp)
}

function buildPlot(city) {

  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`

  d3.json(url).then(function(data) {
    console.log(data);

    times = getTimes(data);
    temps = getTemps(data);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      x: times,
      y: temps,
      line: {
        color: "#17BECF",
      }
    };

    var plotData = [trace1];

    var layout = {
      title: `${data.city.name} 5-day forecast`,
    };

    Plotly.newPlot("plot", plotData, layout);
  })
}

// Add event listener for submit button
// @TODO: YOUR CODE HERE
d3.select("#submit").on("click", handleSubmit);