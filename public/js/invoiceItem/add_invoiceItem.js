// Get the objects we need to modify
let addInvoiceItemForm = document.getElementById('add-invoiceItem-form-ajax');

// Modify the objects we need
addInvoiceItemForm.addEventListener("submit", function(e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInvoiceId = document.getElementById("input-invoice_id");
    let inputPlantId = document.getElementById("input-plant_id");
    let inputPlantQuantity = document.getElementById("input-plant_quantity");

    // Get the values from the form fields
    let invoiceIdValue = inputInvoiceId.value;
    let plantIdValue = inputPlantId.value;
    let plantQuantityValue = inputPlantQuantity.value;

    // Put our data we want to send in a javascript object
    let data = {
        invoice_id: invoiceIdValue,
        plant_id: plantIdValue,
        plant_quantity: plantQuantityValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoiceItem-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputInvoiceId.value = '';
            inputPlantId.value = '';
            inputPlantQuantity.value = '';
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
    let currentTable = document.getElementById("invoiceItems-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let invoiceIdCell = document.createElement("td");
    let plantIdCell = document.createElement("td");
    let plantQuantityCell = document.createElement("td");

    let deleteCell = document.createElement("td");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceItem_id;
    invoiceIdCell.innerText = newRow.invoice_id;
    plantIdCell.innerText = newRow.plant_id;
    plantQuantityCell.innerText = newRow.plant_quantity;

    deleteCell = document.createElement("button");
    deleteCell.className = "btn btn-outline-danger my-2 my-sm-0";
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteInvoiceItem(newRow.invoiceItem_id);
        window.location.reload();
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(invoiceIdCell);
    row.appendChild(plantIdCell);
    row.appendChild(plantQuantityCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoiceItem_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Dropdown menu for updating invoiceItems

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.invoiceItem_id
    option.value = newRow.invoiceItem_id;
    selectMenu.add(option);

}