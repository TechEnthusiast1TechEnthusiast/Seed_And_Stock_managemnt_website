document.addEventListener('DOMContentLoaded', function () {
    const stockForm = document.getElementById('stock-form');
    const billingForm = document.getElementById('billing-form');
    const billSummaryBody = document.getElementById('bill-summary-body');
    const stockSummary = document.getElementById('stock-summary');
    const billItemSelect = document.getElementById('bill-item');
    const printBillButton = document.getElementById('print-bill');
    const addItemButton = document.getElementById('add-to-bill');
    const shopName = "New Punnami Agro Agencies";
    const billDateInput = document.getElementById('bill-date');
    const farmerDetails = {
        name: document.getElementById('farmer-name'),
        fatherName: document.getElementById('father-name'),
        phoneNumber: document.getElementById('phone-number'),
        village: document.getElementById('village'),
        mandal: document.getElementById('mandal'),
        district: document.getElementById('district')
    };
    const farmerSummary = {
        name: document.getElementById('summary-farmer-name'),
        fatherName: document.getElementById('summary-father-name'),
        phoneNumber: document.getElementById('summary-phone-number'),
        village: document.getElementById('summary-village'),
        mandal: document.getElementById('summary-mandal'),
        district: document.getElementById('summary-district')
    };

    let stock = [];
    let bill = [];
    let billCounter = 1;

    // Set the date input to today's date by default
    billDateInput.valueAsDate = new Date();

    stockForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const item = {
            type: document.getElementById('item-type').value,
            variety: document.getElementById('variety-type').value,
            name: document.getElementById('item-name').value,
            quantity: Number(document.getElementById('item-quantity').value),
            price: Number(document.getElementById('item-price').value),
            expiry: document.getElementById('item-expiry').value,
            lot: document.getElementById('item-lot').value,
            company: document.getElementById('item-company').value
        };

        stock.push(item);
        updateStockSummary();
        updateBillItemSelect();
        stockForm.reset();
    });

    billingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedItemId = billItemSelect.value;
        const selectedStock = stock.find(item => item.name === selectedItemId);
        const quantity = Number(document.getElementById('bill-quantity').value);
        const discount = Number(document.getElementById('bill-discount').value);

        if (selectedStock.quantity < quantity) {
            alert('Insufficient stock quantity');
            return;
        }

        const amount = (selectedStock.price * quantity) * ((100 - discount) / 100);

        const billItem = {
            billNo: billCounter++,
            item: selectedStock.name,
            quantity: quantity,
            amount: amount,
            company: selectedStock.company,
            lot: selectedStock.lot,
            expiry: selectedStock.expiry,
            date: billDateInput.value,
            time: new Date().toLocaleTimeString()
        };

        bill.push(billItem);
        selectedStock.quantity -= quantity;
        updateBillSummary();
        updateStockSummary();

        // Update farmer details summary
        farmerSummary.name.textContent = farmerDetails.name.value;
        farmerSummary.fatherName.textContent = farmerDetails.fatherName.value;
        farmerSummary.phoneNumber.textContent = farmerDetails.phoneNumber.value;
        farmerSummary.village.textContent = farmerDetails.village.value;
        farmerSummary.mandal.textContent = farmerDetails.mandal.value;
        farmerSummary.district.textContent = farmerDetails.district.value;

        billingForm.reset();
    });

    addItemButton.addEventListener('click', (e) => {
        e.preventDefault();

        const selectedItemId = billItemSelect.value;
        const selectedStock = stock.find(item => item.name === selectedItemId);
        const quantity = Number(document.getElementById('bill-quantity').value);
        const discount = Number(document.getElementById('bill-discount').value);

        if (selectedStock.quantity < quantity) {
            alert('Insufficient stock quantity');
            return;
        }

        const amount = (selectedStock.price * quantity) * ((100 - discount) / 100);

        const billItem = {
            billNo: billCounter++,
            item: selectedStock.name,
            quantity: quantity,
            amount: amount,
            company: selectedStock.company,
            lot: selectedStock.lot,
            expiry: selectedStock.expiry,
            date: billDateInput.value,
            time: new Date().toLocaleTimeString()
        };

        bill.push(billItem);
        selectedStock.quantity -= quantity;
        updateBillSummary();
        updateStockSummary();
    });

    printBillButton.addEventListener('click', () => {
        window.print();
    });

    function updateStockSummary() {
        stockSummary.innerHTML = '';
        stock.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.type}</td>
                <td>${item.variety}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.company}</td>
                <td>${item.lot}</td>
                <td>${item.expiry}</td>
            `;
            stockSummary.appendChild(row);
        });
    }

    function updateBillItemSelect() {
        billItemSelect.innerHTML = '';
        stock.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            billItemSelect.appendChild(option);
        });
    }

    function updateBillSummary() {
        billSummaryBody.innerHTML = '';

        let total = 0;
        bill.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.billNo}</td>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>${item.item}</td>
                <td>${item.quantity}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td>${item.company}</td>
                <td>${item.lot}</td>
                <td>${item.expiry}</td>
                <td>${item.discount ? item.discount.toFixed(2) : 0}</td>
                <td>${(item.amount).toFixed(2)}</td>
            `;
            billSummaryBody.appendChild(row);
            total += item.amount;
        });

        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="10" class="text-end"><strong>Total Amount:</strong></td>
            <td>${total.toFixed(2)}</td>
        `;
        billSummaryBody.appendChild(totalRow);
    }

    // Import and Return stock handling
    const importForm = document.getElementById('import-form');
    const returnForm = document.getElementById('return-form');
    const stockReportSummary = document.getElementById('stock-report-summary');

    importForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const itemName = document.getElementById('import-item-name').value;
        const quantity = Number(document.getElementById('import-quantity').value);
        const price = Number(document.getElementById('import-price').value);
        const date = document.getElementById('import-date').value;
        const importedFrom = document.getElementById('import-from').value;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>Import</td>
            <td>${itemName}</td>
            <td>${quantity}</td>
            <td>${price}</td>
            <td>${date}</td>
            <td>${importedFrom}</td>
        `;
        stockReportSummary.appendChild(newRow);

        // Add the imported stock to the main stock
        const stockItem = stock.find(item => item.name === itemName);
        if (stockItem) {
            stockItem.quantity += quantity;
        } else {
            stock.push({
                type: "Imported",
                variety: "",
                name: itemName,
                quantity: quantity,
                price: price,
                expiry: "",
                lot: "",
                company: importedFrom
            });
        }
        updateStockSummary();
        updateBillItemSelect();

        importForm.reset();
    });

    returnForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const itemName = document.getElementById('return-item-name').value;
        const quantity = Number(document.getElementById('return-quantity').value);
        const date = document.getElementById('return-date').value;
        const reason = document.getElementById('return-reason').value;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>Return</td>
            <td>${itemName}</td>
            <td>${quantity}</td>
            <td>N/A</td>
            <td>${date}</td>
            <td>${reason}</td>
        `;
        stockReportSummary.appendChild(newRow);

        // Remove the returned stock from the main stock
        const stockItem = stock.find(item => item.name === itemName);
        if (stockItem) {
            stockItem.quantity -= quantity;
            if (stockItem.quantity < 0) stockItem.quantity = 0;
        }
        updateStockSummary();
        updateBillItemSelect();

        returnForm.reset();
    });
});
