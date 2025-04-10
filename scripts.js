// Fetch orders from sessionStorage or use default data
let orders = JSON.parse(sessionStorage.getItem("orders")) || [
    {
      orderId: "10101",
      dateTime: "04/10/2025 10:00am",
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      productName: "Super Detox Pack",
      amount: "$99.99",
      qty: 1,
      shippingType: "Free Shipping",
      status: "Approved"
    },
    {
      orderId: "10102",
      dateTime: "04/10/2025 11:30am",
      customerName: "John Smith",
      customerEmail: "john.smith@mail.com",
      productName: "Energy Booster Plus",
      amount: "$59.99",
      qty: 2,
      shippingType: "Standard $5.00",
      status: "Pending"
    },
    {
      orderId: "10103",
      dateTime: "04/10/2025 01:00pm",
      customerName: "Emily Stone",
      customerEmail: "emily.stone@example.org",
      productName: "Vita-C Immunity Gummies",
      amount: "$39.50",
      qty: 1,
      shippingType: "Express $7.95",
      status: "Declines"
    },
    {
      orderId: "10104",
      dateTime: "04/11/2025 09:15am",
      customerName: "Michael Brown",
      customerEmail: "michael.brown@example.com",
      productName: "Daily Multivitamin",
      amount: "$29.99",
      qty: 3,
      shippingType: "Free Shipping",
      status: "Hold"
    },
    {
      orderId: "10105",
      dateTime: "04/11/2025 10:45am",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.johnson@example.org",
      productName: "Omega-3 Fish Oil",
      amount: "$49.99",
      qty: 2,
      shippingType: "Standard $5.00",
      status: "Cancellations"
    },
    {
      orderId: "10106",
      dateTime: "04/11/2025 12:30pm",
      customerName: "Chris Lee",
      customerEmail: "chris.lee@example.net",
      productName: "Probiotic Capsules",
      amount: "$19.99",
      qty: 1,
      shippingType: "Express $7.95",
      status: "Subscriptions"
    },
    {
      orderId: "10107",
      dateTime: "04/12/2025 08:00am",
      customerName: "Anna White",
      customerEmail: "anna.white@example.com",
      productName: "Vitamin D3",
      amount: "$15.99",
      qty: 1,
      shippingType: "Free Shipping",
      status: "Void/Refund"
    },
    {
      orderId: "10108",
      dateTime: "04/12/2025 09:30am",
      customerName: "David Wilson",
      customerEmail: "david.wilson@example.org",
      productName: "Collagen Powder",
      amount: "$89.99",
      qty: 1,
      shippingType: "Standard $5.00",
      status: "Shipped"
    },
    {
      orderId: "10109",
      dateTime: "04/12/2025 11:00am",
      customerName: "Sophia Martinez",
      customerEmail: "sophia.martinez@example.net",
      productName: "Hair Growth Supplement",
      amount: "$39.99",
      qty: 2,
      shippingType: "Express $7.95",
      status: "Fraud"
    },
    {
      orderId: "10110",
      dateTime: "04/13/2025 02:15pm",
      customerName: "James Anderson",
      customerEmail: "james.anderson@example.com",
      productName: "Weight Loss Tea",
      amount: "$24.99",
      qty: 1,
      shippingType: "Free Shipping",
      status: "Chargeback"
    },
    {
      orderId: "10111",
      dateTime: "04/13/2025 03:45pm",
      customerName: "Olivia Thomas",
      customerEmail: "olivia.thomas@example.org",
      productName: "Protein Bars",
      amount: "$34.99",
      qty: 3,
      shippingType: "Standard $5.00",
      status: "Return"
    },
    {
      orderId: "10112",
      dateTime: "04/13/2025 05:00pm",
      customerName: "Liam Garcia",
      customerEmail: "liam.garcia@example.net",
      productName: "Pre-Workout Powder",
      amount: "$49.99",
      qty: 1,
      shippingType: "Express $7.95",
      status: "Bad Shipping Address"
    },
    {
      orderId: "10113",
      dateTime: "04/14/2025 08:30am",
      customerName: "Emma Rodriguez",
      customerEmail: "emma.rodriguez@example.com",
      productName: "Green Tea Extract",
      amount: "$19.99",
      qty: 1,
      shippingType: "Free Shipping",
      status: "Deleted"
    }
  ];
  
  let isMouseDown = false;
  let checkState = null;
  
  // Save orders to sessionStorage
  function saveOrdersToSession() {
    sessionStorage.setItem("orders", JSON.stringify(orders));
  }
  
  // Populate the table with data
  function populateTable() {
    const tbody = document.getElementById("orders-body");
    tbody.innerHTML = ""; // Clear existing rows
  
    orders.forEach((order, index) => {
      const row = document.createElement("tr");
      row.setAttribute("data-status", order.status);
      row.setAttribute("data-index", index); // Add index for easy identification
      row.classList.add("hover:bg-gray-50");
  
      const statusClass = `status-${order.status
        .toLowerCase()
        .replace(/[\s/]/g, "-")}`;
  
      row.innerHTML = `
        <td data-label="Select" class="border px-2 py-2 text-center">
          <input type="checkbox" class="row-checkbox" onclick="toggleRowHighlight(this)" />
        </td>
        <td data-label="Order ID" class="border px-2 py-2">${order.orderId}</td>
        <td data-label="Date/Time Stamp" class="border px-2 py-2">${order.dateTime}</td>
        <td data-label="Customer Name" class="border px-2 py-2 text-blue-500">${order.customerName}</td>
        <td data-label="Customer Email" class="border px-2 py-2 text-blue-500">${order.customerEmail}</td>
        <td data-label="Product Name" class="border px-2 py-2">${order.productName}</td>
        <td data-label="Amount" class="border px-2 py-2">${order.amount}</td>
        <td data-label="Qty" class="border px-2 py-2">${order.qty}</td>
        <td data-label="Shipping Type" class="border px-2 py-2">${order.shippingType}</td>
        <td data-label="Status" class="border px-2 py-2 text-center">
          <span class="status-tag ${statusClass}">${order.status}</span>
        </td>
      `;
  
      tbody.appendChild(row);
    });
  }
  
  // Call populateTable on page load
  document.addEventListener("DOMContentLoaded", () => {
    populateTable();
    filterTable("All"); // Apply the "All" filter by default
  
    // Remove mouse drag-to-check functionality
  });
  
  function filterTable(status) {
    const rows = document.querySelectorAll("#orders-body tr");
    rows.forEach((row) => {
      const index = row.getAttribute("data-index");
      const rowStatus = orders[index].status; // Fetch the status from the updated orders array
      row.style.display = status === "All" || rowStatus === status ? "" : "none";
  
      // Apply background color based on the status
      if (row.style.display !== "none") {
        switch (rowStatus) {
          case "Approved":
            row.style.backgroundColor = "#d1fae5"; // Light green
            break;
          case "Pending":
            row.style.backgroundColor = "#fef3c7"; // Light yellow
            break;
          case "Declines":
            row.style.backgroundColor = "#fee2e2"; // Light red
            break;
          case "Hold":
            row.style.backgroundColor = "#e0e7ff"; // Light blue
            break;
          case "Cancellations":
            row.style.backgroundColor = "#f3e8ff"; // Light purple
            break;
          case "Subscriptions":
            row.style.backgroundColor = "#cffafe"; // Light cyan
            break;
          case "Void/Refund":
            row.style.backgroundColor = "#fde68a"; // Light amber
            break;
          case "Shipped":
            row.style.backgroundColor = "#bbf7d0"; // Light green
            break;
          case "Fraud":
            row.style.backgroundColor = "#fecaca"; // Light red
            break;
          case "Chargeback":
            row.style.backgroundColor = "#fcd34d"; // Light yellow
            break;
          case "Return":
            row.style.backgroundColor = "#fbcfe8"; // Light pink
            break;
          case "Bad Shipping Address":
            row.style.backgroundColor = "#e573b2"; // Light magenta
            break;
          case "Deleted":
            row.style.backgroundColor = "#e5e7eb"; // Light gray
            break;
          default:
            row.style.backgroundColor = ""; // Default background
        }
      }
    });
  
    // Update active filter button
    document.querySelectorAll(".filter-button").forEach((button) => {
      button.classList.remove("active");
    });
    const activeButton = document.querySelector(
      `.filter-button[data-filter="${status}"]`
    );
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }
  
  function applySearchFilter() {
    const orderVal = document.getElementById("search-order").value.toLowerCase();
    const emailVal = document.getElementById("search-email").value.toLowerCase();
    const productVal = document
      .getElementById("search-product")
      .value.toLowerCase();
  
    const rows = document.querySelectorAll("#orders-body tr");
    rows.forEach((row) => {
      const order = row.cells[1].innerText.toLowerCase();
      const email = row.cells[4].innerText.toLowerCase();
      const product = row.cells[5].innerText.toLowerCase();
  
      const matches =
        (!orderVal || order.includes(orderVal)) &&
        (!emailVal || email.includes(emailVal)) &&
        (!productVal || product.includes(productVal));
  
      row.style.display = matches ? "" : "none";
    });
  }
  
  function toggleAllCheckboxes(master) {
    const checkboxes = document.querySelectorAll(".row-checkbox");
    checkboxes.forEach((cb) => {
      if (cb.closest("tr").style.display !== "none") {
        cb.checked = master.checked;
        toggleRowHighlight(cb);
      }
    });
    toggleActionButtons();
  }
  
  function toggleRowHighlight(checkbox) {
    const row = checkbox.closest("tr");
    row.classList.toggle("selected-row", checkbox.checked);
    toggleActionButtons(); // Update action buttons visibility
  }
  
  // Update toggleActionButtons to remove references to the status-change-dropdown
  function toggleActionButtons() {
    const deleteButton = document.getElementById("delete-button");
    const editButton = document.getElementById("edit-button");
    const statusDropdown = document.getElementById("status-change-dropdown");
    const checkedRows = document.querySelectorAll(".row-checkbox:checked");
  
    deleteButton.classList.toggle("hidden", checkedRows.length === 0);
    editButton.classList.toggle("hidden", checkedRows.length !== 1);
    statusDropdown.classList.toggle("hidden", checkedRows.length === 0); // Show if one or more rows are checked
  }
  
  function deleteSelectedRows() {
    const checkboxes = document.querySelectorAll(".row-checkbox:checked");
  
    checkboxes.forEach((cb) => {
      const row = cb.closest("tr");
      const index = row.getAttribute("data-index");
      orders.splice(index, 1); // Remove the order from the array
      row.remove();
    });
  
    saveOrdersToSession(); // Save updated orders to sessionStorage
    toggleActionButtons();
  }
  
  // Open the edit popup with pre-filled data
  function openEditPopup() {
    const checkedRow = document
      .querySelector(".row-checkbox:checked")
      .closest("tr");
    const index = checkedRow.getAttribute("data-index");
    const order = orders[index];
  
    document.getElementById("edit-order-id").value = order.orderId;
    document.getElementById("edit-customer-name").value = order.customerName;
    document.getElementById("edit-customer-email").value = order.customerEmail;
    document.getElementById("edit-product-name").value = order.productName;
    document.getElementById("edit-amount").value = order.amount;
    document.getElementById("edit-qty").value = order.qty;
    document.getElementById("edit-status").value = order.status;
  
    document.getElementById("edit-popup").classList.remove("hidden");
  }
  
  // Close the edit popup
  function closeEditPopup() {
    document.getElementById("edit-popup").classList.add("hidden");
  }
  
  // Save changes from the edit popup
  document
    .getElementById("edit-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
  
      const checkedRow = document
        .querySelector(".row-checkbox:checked")
        .closest("tr");
      const index = checkedRow.getAttribute("data-index");
  
      orders[index].customerName = document.getElementById(
        "edit-customer-name"
      ).value;
      orders[index].customerEmail = document.getElementById(
        "edit-customer-email"
      ).value;
      orders[index].productName = document.getElementById(
        "edit-product-name"
      ).value;
      orders[index].amount = document.getElementById("edit-amount").value;
      orders[index].qty = document.getElementById("edit-qty").value;
      orders[index].status = document.getElementById("edit-status").value;
  
      saveOrdersToSession(); // Save updated orders to sessionStorage
      populateTable();
      closeEditPopup();
  
      // Reapply the current filter to reflect the updated status
      const activeFilter = document.querySelector(".filter-button.active");
      if (activeFilter) {
        filterTable(activeFilter.getAttribute("data-filter"));
      }
    });
  
  function sortRows() {
    const sortBy = document.getElementById("sort-dropdown").value;
  
    // Sort the orders array based on the selected option
    orders.sort((a, b) => {
      const valA =
        sortBy === "amount"
          ? parseFloat(a[sortBy].replace("$", ""))
          : a[sortBy]?.toString().toLowerCase();
      const valB =
        sortBy === "amount"
          ? parseFloat(b[sortBy].replace("$", ""))
          : b[sortBy]?.toString().toLowerCase();
  
      return valA > valB ? 1 : valA < valB ? -1 : 0;
    });
  
    populateTable(); // Re-render the table with sorted data
  
    // Reapply the current filter to ensure background colors based on status remain intact
    const activeFilter = document.querySelector(".filter-button.active");
    if (activeFilter) {
      filterTable(activeFilter.getAttribute("data-filter"));
    }
  }
  
  function changeStatusDirectly(dropdown) {
    const selectedStatus = dropdown.value;
    const checkboxes = document.querySelectorAll(".row-checkbox:checked");
  
    if (selectedStatus) {
      checkboxes.forEach((checkbox) => {
        const row = checkbox.closest("tr");
        const index = row.getAttribute("data-index");
        orders[index].status = selectedStatus; // Update the status in the orders array
  
        // Update the UI for the status tag
        const statusCell = row.querySelector(
          'td[data-label="Status"] .status-tag'
        );
        const statusClass = `status-${selectedStatus
          .toLowerCase()
          .replace(/[\s/]/g, "-")}`;
        statusCell.className = `status-tag ${statusClass}`;
        statusCell.textContent = selectedStatus;
  
        // Update the row background color based on the new status
        switch (selectedStatus) {
          case "Approved":
            row.style.backgroundColor = "#d1fae5"; // Light green
            break;
          case "Pending":
            row.style.backgroundColor = "#fef3c7"; // Light yellow
            break;
          case "Declines":
            row.style.backgroundColor = "#fee2e2"; // Light red
            break;
          case "Hold":
            row.style.backgroundColor = "#e0e7ff"; // Light blue
            break;
          case "Cancellations":
            row.style.backgroundColor = "#f3e8ff"; // Light purple
            break;
          case "Subscriptions":
            row.style.backgroundColor = "#cffafe"; // Light cyan
            break;
          case "Void/Refund":
            row.style.backgroundColor = "#fde68a"; // Light amber
            break;
          case "Shipped":
            row.style.backgroundColor = "#bbf7d0"; // Light green
            break;
          case "Fraud":
            row.style.backgroundColor = "#fecaca"; // Light red
            break;
          case "Chargeback":
            row.style.backgroundColor = "#fcd34d"; // Light yellow
            break;
          case "Return":
            row.style.backgroundColor = "#fbcfe8"; // Light pink
            break;
          case "Bad Shipping Address":
            row.style.backgroundColor = "#e573b2"; // Light magenta
            break;
          case "Deleted":
            row.style.backgroundColor = "#e5e7eb"; // Light gray
            break;
          default:
            row.style.backgroundColor = ""; // Default background
        }
      });
  
      saveOrdersToSession(); // Save updated orders to sessionStorage
      dropdown.value = ""; // Reset dropdown
  
      // Uncheck all rows after the status change
      document
        .querySelectorAll(".row-checkbox")
        .forEach((cb) => (cb.checked = false));
      toggleActionButtons(); // Update action buttons visibility
  
      // Reapply the current filter to reflect the updated status
      const activeFilter = document.querySelector(".filter-button.active");
      if (activeFilter) {
        filterTable(activeFilter.getAttribute("data-filter"));
      }
    }
  }
  
  document.querySelectorAll('[data-draggable]').forEach(container => {
    let isDragging = false;
    let startX, scrollLeft;
  
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
  
    container.addEventListener('mouseleave', () => {
      isDragging = false;
      container.classList.remove('dragging');
    });
  
    container.addEventListener('mouseup', () => {
      isDragging = false;
      container.classList.remove('dragging');
    });
  
    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      container.scrollLeft = scrollLeft - walk;
    });
  });
