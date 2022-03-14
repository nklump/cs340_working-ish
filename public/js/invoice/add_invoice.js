// Get the objects we need to modify
let addInvoiceForm = document.getElementById('add-invoice-form-ajax');

// Modify the objects we need
addInvoiceForm.addEventListener("submit", function(e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerId = document.getElementById("input-customer_id");
    let inputCashierId = document.getElementById("input-cashier_id");
    let inputTotalPrice = document.getElementById("input-total_price");
    let inputInvoiceDate = document.getElementById("input-invoice_date");

    // Get the values from the form fields
    let customerIdValue = inputCustomerId.value;
    let cashierIdValue = inputCashierId.value;
    let totalPriceValue = inputTotalPrice.value;
    let invoiceDateValue = inputInvoiceDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customerIdValue,
        cashier_id: cashierIdValue,
        total_price: totalPriceValue,
        invoice_date: invoiceDateValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerId.value = '';
            inputCashierId.value = '';
            inputTotalPrice.value = '';
            inputInvoiceDate.value = '';
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
    let currentTable = document.getElementById("invoices-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let customerIdCell = document.createElement("TD");
    let cashierIdCell = document.createElement("TD");
    let totalPriceCell = document.createElement("TD");
    let invoiceDateCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoice_id;
    customerIdCell.innerText = newRow.customer_id;
    cashierIdCell.innerText = newRow.cashier_id;
    totalPriceCell.innerText = newRow.total_price;
    invoiceDateCell.innerText = newRow.invoice_date;

    deleteCell = document.createElement("button");
    deleteCell.className = "btn btn-outline-danger my-2 my-sm-0";
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteInvoice(newRow.invoice_id);
        window.location.reload();
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(customerIdCell);
    row.appendChild(cashierIdCell);
    row.appendChild(totalPriceCell);
    row.appendChild(invoiceDateCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoice_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Dropdown menu for updating invoices

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.invoice_id;
    option.value = newRow.invoice_id;
    selectMenu.add(option);

}