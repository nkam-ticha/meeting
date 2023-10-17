document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.getElementById("tableBody");
  const form = document.getElementById("inputForm");
  const tableData = JSON.parse(localStorage.getItem("tableData")) || [];

  // Load existing data from localStorage for the main table
  tableData.forEach(({ name, amount, date }) => {
    addRowToMainTable(name, amount, date);
  });

  // Save data to localStorage
  function saveData() {
    localStorage.setItem("tableData", JSON.stringify(Array.from(tableBody.rows).map(row => ({
      name: row.cells[0].innerText,
      amount: row.cells[1].innerText,
      date: row.cells[2].innerText
    }))));
  }

  function addRowToMainTable(name, amount, date = new Date().toLocaleString()) {
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = amount;
    newRow.insertCell(2).innerText = date;
    // No action buttons for user
    saveData();
  }

  // Assuming you already have the search and sort code, keep that part as it is.
  // Add your existing search and sort code here...
});
