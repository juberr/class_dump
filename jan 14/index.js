// Get a reference to the table body
let tbody = d3.select("tbody");

// Console.log the weather data from data.js
console.log(data);

// Step 1: Loop Through `data` and console.log each weather report object
data.forEach(day => { 
    Object.keys(day).forEach(val => console.log(day.val));

});
// Step 2:  Use d3 to append one table row `tr` for each weather report object
// Don't worry about adding cells or text yet, just try appending the `tr` elements.
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
      });
    });
  }

  buildTable(data);
// Step 3:  Use `Object.entries` to console.log each weather report value
for (let i=0; i<data.length; i++) {
    console.log(Object.values(data[i]))
};

// Step 4: Use d3 to append 1 cell per weather report value (weekday, date, high, low)

// Step 5: Use d3 to update each cell's text with
// weather report values (weekday, date, high, low)

// BONUS: Refactor to use Arrow Functions!
