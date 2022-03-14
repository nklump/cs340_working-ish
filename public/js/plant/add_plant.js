// Get the objects we need to modify
let addPlantForm = document.getElementById('add-plant-form-ajax');

// Modify the objects we need
addPlantForm.addEventListener("submit", function(e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlantName = document.getElementById("input-plant_name");
    let inputPlantPrice = document.getElementById("input-plant_price");

    // Get the values from the form fields
    let plantNameValue = inputPlantName.value;
    let plantPriceValue = inputPlantPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        plant_name: plantNameValue,
        plant_price: plantPriceValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-plant-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
 
            // Clear the input fields for another transaction
            inputPlantName.value = '';
            inputPlantPrice.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    window.location.reload();

})

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("plants-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (Price object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let plantNameCell = document.createElement("TD");
    let plantPriceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.plant_id;
    plantNameCell.innerText = newRow.plant_name;
    plantPriceCell.innerText = newRow.plant_price;

    deleteCell = document.createElement("button");
    deleteCell.className = "btn btn-outline-danger my-2 my-sm-0";
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deletePlant(newRow.plant_id);
        window.location.reload();
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(plantNameCell);
    row.appendChild(plantPriceCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.plant_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Dropdown menu for updating plants

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.plant_name;
    option.value = newRow.plant_id;
    selectMenu.add(option);

}