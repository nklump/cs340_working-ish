function deleteCashier(cashier_id) {
    // Put our data we want to send in a javascript object
    let data = {
        cashier_id: cashier_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-cashier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {

                // Add the new data to the table
                deleteRow(cashier_id);
                window.location.reload();

            } else if (xhttp.readyState == 4 && xhttp.status != 204) {
                console.log("There was an error with the input.")
            }
        }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(cashier_id) {

    let table = document.getElementById("cashiers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == cashier_id) {
            table.deleteRow(i);
            break;
        }
    }
}