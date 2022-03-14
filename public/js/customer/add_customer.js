// Get the objects we need to modify
let addcustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addcustomerForm.addEventListener("submit", function(e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerFirst = document.getElementById("input-customer_first");
    let inputCustomerLast = document.getElementById("input-customer_last");
    let inputCustomerEmail = document.getElementById("input-customer_email");
    let inputCustomerAddress = document.getElementById("input-customer_address");
    let inputCustomerCity = document.getElementById("input-customer_city");
    let inputCustomerState = document.getElementById("input-customer_state");
    let inputCustomerZip = document.getElementById("input-customer_zip");

    // Get the values from the form fields
    let customerFirstValue = inputCustomerFirst.value;
    let customerLastValue = inputCustomerLast.value;
    let customerEmailValue = inputCustomerEmail.value;
    let customerAddressValue = inputCustomerAddress.value;
    let customerCityValue = inputCustomerCity.value;
    let customerStateValue = inputCustomerState.value;
    let customerZipValue = inputCustomerZip.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_first: customerFirstValue,
        customer_last: customerLastValue,
        customer_email: customerEmailValue,
        customer_address: customerAddressValue,
        customer_city: customerCityValue,
        customer_state: customerStateValue,
        customer_zip: customerZipValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerFirst.value = '';
            inputCustomerLast.value = '';
            inputCustomerEmail.value = '';
            inputCustomerAddress.value = '';
            inputCustomerCity.value = '';
            inputCustomerState.value = '';
            inputCustomerZip.value = '';

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
    let currentTable = document.getElementById("customers-table");

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
    let emailCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customer_id;
    firstNameCell.innerText = newRow.customer_first;
    lastNameCell.innerText = newRow.customer_last;
    emailCell.innerText = newRow.customer_email;
    addressCell.innerText = newRow.customer_address;
    cityCell.innerText = newRow.customer_city;
    stateCell.innerText = newRow.customer_state;
    zipCell.innerText = newRow.customer_zip;

    deleteCell = document.createElement("button");
    deleteCell.className = "btn btn-outline-danger my-2 my-sm-0";
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteCustomer(newRow.customer_id);
        window.location.reload();
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(addressCell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(zipCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customer_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Dropdown menu for updating customers

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.customer_first + ' ' + newRow.customer_last;
    option.value = newRow.customer_id;
    selectMenu.add(option);

}