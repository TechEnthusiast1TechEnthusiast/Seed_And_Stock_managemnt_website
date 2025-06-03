document.addEventListener('DOMContentLoaded', () => {
    const importStockForm = document.getElementById('import-stock-form');
    const returnStockForm = document.getElementById('return-stock-form');
    const stockSummaryBody = document.getElementById('stock-summary-body');

    importStockForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const importDate = document.getElementById('import-date').value;
        const importShop = document.getElementById('import-shop').value;
        const importFrom = document.getElementById('import-from').value;
        const importItems = document.getElementById('import-items').value;

        addStockSummaryRow(importDate, importShop, 'Import', `From: ${importFrom}, Items: ${importItems}`);
        importStockForm.reset();
    });

    returnStockForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const returnDate = document.getElementById('return-date').value;
        const returnShop = document.getElementById('return-shop').value;
        const returnTo = document.getElementById('return-to').value;
        const returnItems = document.getElementById('return-items').value;

        addStockSummaryRow(returnDate, returnShop, 'Return', `To: ${returnTo}, Items: ${returnItems}`);
        returnStockForm.reset();
    });

    function addStockSummaryRow(date, shop, type, details) {
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        row.appendChild(dateCell);

        const shopCell = document.createElement('td');
        shopCell.textContent = shop;
        row.appendChild(shopCell);

        const typeCell = document.createElement('td');
        typeCell.textContent = type;
        row.appendChild(typeCell);

        const detailsCell = document.createElement('td');
        detailsCell.textContent = details;
        row.appendChild(detailsCell);

        stockSummaryBody.appendChild(row);
    }
});
