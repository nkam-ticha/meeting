document.addEventListener("DOMContentLoaded", function() {
  // Assuming you already have tableBody and historyTableBody defined
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      let found = false;
  
      function highlightSearchTerm(text) {
          const re = new RegExp(query, 'gi');
          return text.replace(re, (match) => `<span class="highlight">${match}</span>`);
      }
  
      // Reset any existing highlights
      document.querySelectorAll(".highlight").forEach(function(el) {
          el.outerHTML = el.innerHTML;
      });
  
      // Search in the main table
      for (const row of tableBody.rows) {
          const nameCell = row.cells[0];
          const amountCell = row.cells[1];
          
          const name = nameCell.innerText.toLowerCase();
          const amount = amountCell.innerText.toLowerCase();
  
          if (name.includes(query) || amount.includes(query)) {
              nameCell.innerHTML = highlightSearchTerm(nameCell.innerHTML);
              amountCell.innerHTML = highlightSearchTerm(amountCell.innerHTML);
              row.style.display = "";
              found = true;
          } else {
              row.style.display = "none";
          }
      }
  
      // Search in the history table
      // ... (Your existing history table search code)
  
      // Highlight matches in the history table
      for (const row of historyTableBody.rows) {
          const actionCell = row.cells[0];
          const nameCell = row.cells[1];
          const amountCell = row.cells[2];
          
          const action = actionCell.innerText.toLowerCase();
          const name = nameCell.innerText.toLowerCase();
          const amount = amountCell.innerText.toLowerCase();
  
          if (action.includes(query) || name.includes(query) || amount.includes(query)) {
              actionCell.innerHTML = highlightSearchTerm(actionCell.innerHTML);
              nameCell.innerHTML = highlightSearchTerm(nameCell.innerHTML);
              amountCell.innerHTML = highlightSearchTerm(amountCell.innerHTML);
              row.style.display = "";
              found = true;
          } else {
              row.style.display = "none";
          }
      }
  
      // Show an alert if no rows were found
      if (!found) {
          alert("Nothing found");
      }
  }
  

  searchButton.addEventListener("click", performSearch);

  // Listen for the "Enter" key on the search input
  searchInput.addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {  // 13 is the keyCode for the "Enter" key
          performSearch();  // Perform search when "Enter" is pressed
      }
  });
});

