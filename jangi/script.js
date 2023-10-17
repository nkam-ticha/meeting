document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("tableBody");
    const historyTableBody = document.getElementById("historyTableBody");
    const form = document.getElementById("inputForm");
    const tableData = JSON.parse(localStorage.getItem("tableData")) || [];
    const historyData = JSON.parse(localStorage.getItem("historyData")) || [];


    // Load existing data from localStorage for the main table
    tableData.forEach(({ name, amount, date }) => {
      addRowToMainTable(name, amount, date);
    });
  
    // Load existing data from localStorage for the history table
    historyData.forEach(({ action, name, amount, date }) => {
      addHistoryRecord(action, name, amount, date);
    });
  
    // Save data to localStorage
    function saveData() {
      localStorage.setItem("tableData", JSON.stringify(Array.from(tableBody.rows).map(row => ({
        name: row.cells[0].innerText,
        amount: row.cells[1].innerText,
        date: row.cells[2].innerText
      }))));
      
      localStorage.setItem("historyData", JSON.stringify(Array.from(historyTableBody.rows).map(row => ({
        action: row.cells[0].innerText,
        name: row.cells[1].innerText,
        amount: row.cells[2].innerText,
        date: row.cells[3].innerText
      }))));
    }
  
    function addHistoryRecord(action, name, amount, date = new Date().toLocaleString()) {
      const newRow = historyTableBody.insertRow(0);
      newRow.insertCell(0).innerText = action;
      newRow.insertCell(1).innerText = name;
      newRow.insertCell(2).innerText = amount;
      newRow.insertCell(3).innerText = date;
      saveData();
    }
  
    function addRowToMainTable(name, amount, date = new Date().toLocaleString()) {
      const newRow = tableBody.insertRow();
      newRow.insertCell(0).innerText = name;
      newRow.insertCell(1).innerText = amount;
      newRow.insertCell(2).innerText = date;
      // Your action buttons
      const actionCell = newRow.insertCell(3);
  
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", function() {
          tableBody.removeChild(newRow);
          addHistoryRecord("Delete", name, amount);
      });
      actionCell.appendChild(deleteButton);
  
      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.addEventListener("click", function() {
          const newAmount = prompt("Enter the new amount:");
          if (newAmount !== null) {
              newRow.cells[1].innerText = newAmount;
              newRow.cells[2].innerText = new Date().toLocaleString();
              addHistoryRecord("Edit", name, newAmount);
          }
      });
      actionCell.appendChild(editButton);
  
      const addButton = document.createElement("button");
      addButton.innerText = "Add";
      addButton.addEventListener("click", function() {
          const newAmount = prompt("Enter the amount to add:");
          if (newAmount !== null) {
              newRow.cells[1].innerText = parseFloat(newRow.cells[1].innerText) + parseFloat(newAmount);
              newRow.cells[2].innerText = new Date().toLocaleString();
              addHistoryRecord("Add", name, newAmount);
          }
      });
      actionCell.appendChild(addButton);
      saveData();
    }
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const name = event.target.name.value.trim();
      const amount = parseFloat(event.target.amount.value.trim());
  
      if (name === "" || isNaN(amount)) {
          return;
      }
  
      let existingRow = null;
      for (const row of tableBody.rows) {
          if (row.cells[0].innerText === name) {
              existingRow = row;
              break;
          }
      }
  
      if (existingRow) {
          const amountCell = existingRow.cells[1];
          amountCell.innerText = parseFloat(amountCell.innerText) + amount;
          existingRow.cells[2].innerText = new Date().toLocaleString();
          addHistoryRecord("Update", name, amount);
      } else {
          addRowToMainTable(name, amount);
          addHistoryRecord("Add", name, amount);
      }
  
      saveData();
    });
  
    // Add your existing search code here...
  });
  