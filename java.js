// index.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ==============================
// MOBILE MENU TOGGLE
// ==============================
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

// ==============================
// THEME SWITCHER (Light / Dark)
// ==============================
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// index.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





// Sale(POS).html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ==========================
// POS BILLING LOGIC
// ==========================
const addToBillBtn = document.getElementById("addToBill");
const billTableBody = document.querySelector("#billTable tbody");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const grandTotalEl = document.getElementById("grandTotal");
const discountInput = document.getElementById("discount");

let subtotal = 0;

if (addToBillBtn) {
  addToBillBtn.addEventListener("click", () => {
    const name = document.getElementById("batteryName").value.trim();
    const qty = parseInt(document.getElementById("batteryQty").value) || 1;
    const price = parseFloat(document.getElementById("batteryPrice").value) || 0;

    if (!name || price <= 0) {
      alert("Please enter valid product name and price!");
      return;
    }

    const total = qty * price;
    subtotal += total;

    const newRow = `
      <tr>
        <td>${name}</td>
        <td>${qty}</td>
        <td>${price.toFixed(2)}</td>
        <td>${total.toFixed(2)}</td>
      </tr>
    `;
    billTableBody.insertAdjacentHTML("beforeend", newRow);

    updateTotals();
    document.getElementById("batteryName").value = "";
    document.getElementById("batteryPrice").value = "";
  });
}

if (discountInput) {
  discountInput.addEventListener("input", updateTotals);
}

function updateTotals() {
  const discount = parseFloat(discountInput.value) || 0;
  const discounted = subtotal - (subtotal * discount) / 100;
  const tax = discounted * 0.18;
  const grand = discounted + tax;

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  grandTotalEl.textContent = grand.toFixed(2);
}

// Sale(POS).html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// inventory.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// INVENTORY MANAGEMENT LOGIC
const addBatteryBtn = document.getElementById("addBattery");
const inventoryTable = document.querySelector("#inventoryTable tbody");

if (addBatteryBtn) {
  addBatteryBtn.addEventListener("click", () => {
    const brand = document.getElementById("brand").value.trim();
    const model = document.getElementById("model").value.trim();
    const capacity = document.getElementById("capacity").value;
    const voltage = document.getElementById("voltage").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const supplier = document.getElementById("supplier").value.trim();

    if (!brand || !model || !price || !stock) {
      alert("Please fill in all required fields!");
      return;
    }

    let statusClass = "in-stock";
    let statusText = "In Stock";

    if (stock <= 0) {
      statusClass = "out-of-stock";
      statusText = "Out of Stock";
    } else if (stock < 5) {
      statusClass = "low-stock";
      statusText = "Low Stock";
    }

    const newRow = `
      <tr>
        <td>${brand}</td>
        <td>${model}</td>
        <td>${capacity}Ah</td>
        <td>${voltage}V</td>
        <td>${price}</td>
        <td>${stock}</td>
        <td>${category}</td>
        <td>${supplier}</td>
        <td><span class="status ${statusClass}">${statusText}</span></td>
      </tr>
    `;

    inventoryTable.insertAdjacentHTML("beforeend", newRow);
    document.querySelector(".inventory-form").reset();
  });
}

// inventory.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// customer.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// ==============================
// CUSTOMER PAGE LOGIC
// ==============================
const addCustomerBtn = document.getElementById("addCustomer");
const customerTableBody = document.querySelector("#customerTable tbody");
const searchCustomer = document.getElementById("searchCustomer");

if (addCustomerBtn) {
  addCustomerBtn.addEventListener("click", () => {
    const name = document.getElementById("custName").value.trim();
    const contact = document.getElementById("custContact").value.trim();
    const details = document.getElementById("custDetails").value.trim();
    const purchaseDate = document.getElementById("custPurchaseDate").value;
    const warranty = parseInt(document.getElementById("custWarranty").value) || 0;

    if (!name || !contact || !details) {
      alert("Please fill in all required fields!");
      return;
    }

    const status = warranty > 0 ? "Active" : "Expired";

    const newRow = `
      <tr>
        <td>${name}</td>
        <td>${contact}</td>
        <td>${details}</td>
        <td>${purchaseDate || "N/A"}</td>
        <td>${warranty} months</td>
        <td>${status}</td>
      </tr>
    `;

    customerTableBody.insertAdjacentHTML("beforeend", newRow);
    document.querySelector(".customer-form").reset?.();
  });
}

// Search customer live filter
if (searchCustomer) {
  searchCustomer.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    Array.from(customerTableBody.rows).forEach((row) => {
      row.style.display = row.textContent.toLowerCase().includes(term)
        ? ""
        : "none";
    });
  });
}


// customer.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// supplier.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ==============================
// SUPPLIER PAGE LOGIC
// ==============================
const addSupplierBtn = document.getElementById("addSupplier");
const supplierTableBody = document.querySelector("#supplierTable tbody");
const searchSupplier = document.getElementById("searchSupplier");

if (addSupplierBtn) {
  addSupplierBtn.addEventListener("click", () => {
    const name = document.getElementById("supName").value.trim();
    const contact = document.getElementById("supContact").value.trim();
    const company = document.getElementById("supCompany").value.trim();
    const purchase = parseFloat(document.getElementById("supPurchase").value) || 0;
    const paid = parseFloat(document.getElementById("supPaid").value) || 0;
    const pending = document.getElementById("supPending").value.trim();

    if (!name || !contact || !company) {
      alert("Please fill in all required fields!");
      return;
    }

    const balance = purchase - paid;
    const status = balance > 0 ? "Pending" : "Cleared";

    const newRow = `
      <tr>
        <td>${name}</td>
        <td>${contact}</td>
        <td>${company}</td>
        <td>Rs. ${purchase.toLocaleString()}</td>
        <td>Rs. ${paid.toLocaleString()}</td>
        <td>Rs. ${balance.toLocaleString()}</td>
        <td>${pending || "None"}</td>
        <td>${status}</td>
      </tr>
    `;

    supplierTableBody.insertAdjacentHTML("beforeend", newRow);

    document.querySelector(".supplier-form").reset?.();
  });
}

// Search suppliers
if (searchSupplier) {
  searchSupplier.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    Array.from(supplierTableBody.rows).forEach((row) => {
      row.style.display = row.textContent.toLowerCase().includes(term)
        ? ""
        : "none";
    });
  });
}



// supplier.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// report.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ==============================
// REPORTS PAGE SCRIPT
// ==============================
const generateBtn = document.getElementById("generateReport");
const totalSales = document.getElementById("totalSales");
const totalCost = document.getElementById("totalCost");
const profitStatus = document.getElementById("profitStatus");
const stockCount = document.getElementById("stockCount");
const lowStockCount = document.getElementById("lowStockCount");
const reorderTable = document.getElementById("reorderTable").querySelector("tbody");

if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    // Mock data (later you’ll replace with PHP database values)
    const sales = Math.floor(Math.random() * 100000);
    const cost = Math.floor(sales * 0.7);
    const profit = sales - cost;

    totalSales.textContent = sales.toLocaleString();
    totalCost.textContent = cost.toLocaleString();
    profitStatus.textContent = `Rs. ${profit.toLocaleString()}`;
    profitStatus.style.color = profit >= 0 ? "green" : "red";

    stockCount.textContent = 120;
    lowStockCount.textContent = 8;

    const reorderItems = [
      { brand: "AGS", model: "GX-65", stock: 3, reorder: 5 },
      { brand: "Osaka", model: "125R", stock: 2, reorder: 4 },
      { brand: "Phoenix", model: "XP-100", stock: 1, reorder: 3 },
    ];

    reorderTable.innerHTML = reorderItems
      .map(
        (item) =>
          `<tr>
            <td>${item.brand}</td>
            <td>${item.model}</td>
            <td>${item.stock}</td>
            <td>${item.reorder}</td>
          </tr>`
      )
      .join("");
  });
}

// Print function
const printBtn = document.getElementById("printReport");
if (printBtn) {
  printBtn.addEventListener("click", () => {
    window.print();
  });
}

// report.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// login.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ==============================
// LOGIN FORM HANDLER (Demo)
// ==============================
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (username && password) {
      loginMessage.style.color = "green";
      loginMessage.textContent = `✅ Logged in as ${role}`;
      setTimeout(() => {
        loginMessage.textContent = "";
        window.location.href = "index.html"; // redirect to dashboard
      }, 1500);
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = "⚠️ Please enter username and password!";
    }
  });
}


// login.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// setting.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ==============================
// SETTINGS FORM SAVE MESSAGE
// ==============================
const settingsForm = document.getElementById("settingsForm");
const saveMessage = document.getElementById("saveMessage");

if (settingsForm) {
  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveMessage.textContent = "✅ Settings saved successfully!";
    setTimeout(() => {
      saveMessage.textContent = "";
    }, 3000);
  });
}


// setting.html@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

