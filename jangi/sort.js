document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.getElementById("tableBody");
  
  function sortTable(columnIndex, type, ascending = true) {
    const rowsArray = Array.from(tableBody.querySelectorAll('tr'));

    const sortedRows = rowsArray.sort((rowA, rowB) => {
      const cellA = rowA.cells[columnIndex].innerText;
      const cellB = rowB.cells[columnIndex].innerText;

      if (type === 'string') {
        return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
      } else if (type === 'number') {
        return ascending ? parseFloat(cellA) - parseFloat(cellB) : parseFloat(cellB) - parseFloat(cellA);
      } else if (type === 'date') {
        return ascending ? new Date(cellA) - new Date(cellB) : new Date(cellB) - new Date(cellA);
      }
    });

    // Remove all existing rows from the table body
    while (tableBody.firstChild) {
      tableBody.firstChild.remove();
    }

    // Add the sorted rows back to the table body
    for (const row of sortedRows) {
      tableBody.appendChild(row);
    }
  }

  const nameHeader = document.querySelector("#nameHeader");
  const amountHeader = document.querySelector("#amountHeader");
  const dateHeader = document.querySelector("#dateHeader");

  let nameAscending = true;
  let amountAscending = true;
  let dateAscending = true;

  nameHeader.addEventListener("click", () => {
    sortTable(0, 'string', nameAscending);
    nameAscending = !nameAscending;
  });

  amountHeader.addEventListener("click", () => {
    sortTable(1, 'number', !amountAscending);
    amountAscending = !amountAscending;
  });

  dateHeader.addEventListener("click", () => {
    sortTable(2, 'date', !dateAscending);
    dateAscending = !dateAscending;
  });
});
