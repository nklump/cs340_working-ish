// Get the objects we need to modify
let addCashierForm = document.getElementById('add-cashier-form-ajax');

// Modify the objects we need
addCashierForm.addEventListener("submit", function(e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCashierFirst = document.getElementById("input-cashier_first");
    let inputCashierLast = document.getElementById("input-cashier_last");
    let inputHourlyRate = document.getElementById("input-hourly_rate");

    // Get the values from the form fields
    let cashierFirstValue = inputCashierFirst.value;
    let cashierLastValue = inputCashierLast.value;
    let hourlyRateValue = inputHourlyRate.value;

    // Put our data we want to send in a javascript object
    let data = {
        cashier_first: cashierFirstValue,
        cashier_last: cashierLastValue,
        hourly_rate: hourlyRateValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-cashier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCashierFirst.value = '';
            inputCashierLast.value = '';
            inputHourlyRate.value = '';
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
    let currentTable = document.getElementById("cashiers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let hourlyCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.cashier_id;
    firstNameCell.innerText = newRow.cashier_first;
    lastNameCell.innerText = newRow.cashier_last;
    hourlyCell.innerText = newRow.hourly_rate;

    deleteCell = document.createElement("button");
    deleteCell.className = "btn btn-outline-danger my-2 my-sm-0";
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteCashier(newRow.cashier_id);
        window.location.reload();
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(hourlyCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.cashier_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Dropdown menu for updating cashiers

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.cashier_first + ' ' + newRow.cashier_last;
    option.value = newRow.id;
    selectMenu.add(option);

}