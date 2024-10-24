document.addEventListener('DOMContentLoaded', () => {
    const billTotalInput = document.getElementById('billTotal');
    const tipSlider = document.getElementById('tipSlider');
    const tipPercentageInput = document.getElementById('tipPercentage');
    const tipAmountInput = document.getElementById('tipAmount');
    const totalWithTipInput = document.getElementById('totalWithTip');
    const currencySelect = document.getElementById('currency');
    const errorMessageDiv = document.getElementById('errorMessage');

    const currencyRates = {
        'USD': 1,
        'INR': 84.07,
        'JPY': 149.34,
        'RUB': 100.32
    };

    function calculateTip() {
        // Clear any previous error messages
        errorMessageDiv.style.display = 'none';
        errorMessageDiv.textContent = '';

        let billTotal = parseFloat(billTotalInput.value);
        let tipPercentage = parseInt(tipSlider.value);

        // Validate input
        if (isNaN(billTotal) || billTotal <= 0) {
            // Show error message if the input is invalid
            errorMessageDiv.textContent = "Please enter a valid positive number for Bill Total.";
            errorMessageDiv.style.display = 'block';
            return;
        }

        let tipAmount = (billTotal * tipPercentage) / 100;
        let totalWithTip = billTotal + tipAmount;

        // Get the selected currency and adjust values
        let selectedCurrency = currencySelect.value;
        let conversionRate = currencyRates[selectedCurrency];

        tipAmount = (tipAmount * conversionRate).toFixed(2);
        totalWithTip = (totalWithTip * conversionRate).toFixed(2);

        // Update UI
        tipPercentageInput.value = tipPercentage;
        tipAmountInput.value = `${selectedCurrency} ${tipAmount}`;
        totalWithTipInput.value = `${selectedCurrency} ${totalWithTip}`;
    }

    // Add event listeners
    billTotalInput.addEventListener('input', calculateTip);
    tipSlider.addEventListener('input', calculateTip);
    currencySelect.addEventListener('change', calculateTip);
});
