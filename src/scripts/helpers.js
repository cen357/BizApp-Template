/** Function description: 
 *      Get the index number of the selected profile (checked box)
 *  Parameters: 
 *      + $dataTable: Bootstrap-table selector
 *  Returns: 
 *      - Index number from ID column
 */
function getIdSelection($dataTable) {
    let selected = $dataTable.bootstrapTable('getSelections');
    // Check if there is no selection
    if (selected.length === 0) {
        return -1;
    }
    return selected[0]['id'];
}

/** Function description: 
 *      Delete input value in add modal and close it
 *  Parameters: 
 *      None
 *  Returns: 
 *      None
 */
function closeAddModal() {
    $("#add_name").val('');
    $("#add_salary").val('');
    $("#addModal").modal('hide');
}

/** Function description: 
 *      Delete input value in edit modal and close it
 *  Parameters:
 *      None
 *  Returns: 
 *      None
 */
function closeEditModal() {
    $("#edit_name").val('');
    $("#edit_salary").val('');
    $("#editModal").modal('hide');
}

/** Function description: 
 *      Parse JSON text
 *  Parameters: 
 *      + Stringified JSON from JSON file
 *  Returns: 
 *      - Formatted JSON or null
 */
function getParsedJson(text) {
    try {
        return JSON.parse(text);
    } catch (e) {
        // not valid JSON
        return null;
    }
}

/** Function description: 
 *      Saves data to local storage
 *  Parameters: 
 *      + Data key
 *      + Data (either json or normal data)
 *  Returns: 
 *      -  Stringified json data or normal data
 */
function saveDataToLocalStorage(dataKey, data) {
    let formattedData = null;
    try {
        formattedData = JSON.stringify(data);
    } catch (e) {
        // Save as normal data if not json 
        formattedData = data;
    }
    window.localStorage.setItem(dataKey, formattedData);
}

/** Function description: 
 *      Get data from local storage
 *  Parameters: 
 *      + Data key
 *  Returns: 
 *      - Formatted json data or normal data
 */
function getDataFromLocalStorage(dataKey) {
    let data = window.localStorage.getItem(dataKey);
    let formattedData = null;
    try {
        formattedData = JSON.parse(data);
    } catch (e) {
        //get normal data if not json
        formattedData = data;
    }
    return formattedData;
}
/** Function description: 
 *      Calculate data for one row of the table
 *  Parameters: 
 *      + row: one row from table
 *  Returns: 
 *      - Oject of row data 
 */
function calcRowData(row) {
    let data = {
        'id': row['id'],
        'name': row['name'],
        'salary': row['salary'],
        'tax': (row['salary'] * 15) / 100
    };
    return data;
}
/** Function description: 
 *      Calculate data for tax table
 *  Parameters: 
 *      + table: taxData
 *  Returns: 
 *      - Array of objects of table data
 */
function calcTaxData(table) {
    let data = [];
    table.forEach(element => {
        data.push(calcRowData(element));
    });

    return data;
}

/** Function description: 
 *      Calculate sum row data at the end of the table
 *  Parameters: 
 *      + data
 *  Returns: 
 *      - Object of sum row data
 */
function calcSumRow(data) {
    let salarySum = 0;
    let taxSum = 0;

    data.forEach(element => {
        salarySum += Number(element['salary']);
        taxSum += Number(element['tax']);
    });

    let sumRow = {
        'id': '',
        'name': 'Sum',
        'salary': salarySum,
        'tax': taxSum
    };

    return sumRow;
}