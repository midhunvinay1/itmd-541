document.addEventListener('DOMContentLoaded', () => {
    const billTotalInput = document.getElementById('billTotal');
    const tipSlider = document.getElementById('tipSlider');
    const tipPercentageDisplay = document.getElementById('tipPercentageDisplay');  
    const tipAmountInput = document.getElementById('tipAmount');
    const totalWithTipInput = document.getElementById('totalWithTip');
    const currencySelect = document.getElementById('currency');
    const errorMessageDiv = document.getElementById('errorMessage');

    const currencyRates = {
        'USD': 1,
        'INR': 84.07,
        'JPY': 149.34
    };

    function calculateTip() {
        
        errorMessageDiv.style.display = 'none';
        errorMessageDiv.textContent = '';

       
        let billTotal = parseFloat(billTotalInput.value);

        
        let tipPercentage = parseInt(tipSlider.value);

        
    if (isNaN(billTotal) || billTotal <= 0) {
        
        errorMessageDiv.textContent = "Please enter a positive number for Bill Total.";
        errorMessageDiv.style.display = 'block';  
        
        totalWithTipInput.value = "0.00";
    } else if (!Number.isInteger(billTotal)) {
        
        errorMessageDiv.textContent = "Please enter a valid integer for Bill Total.";
        errorMessageDiv.style.display = 'block';  
    } else {
        
        errorMessageDiv.style.display = 'none';
         
        let tipAmount = (billTotal * tipPercentage) / 100;
        let totalWithTip = billTotal + tipAmount;
 
         
        let selectedCurrency = currencySelect.value;
        let conversionRate = currencyRates[selectedCurrency];
 
        
        tipAmount = (tipAmount * conversionRate).toFixed(2);
        totalWithTip = (totalWithTip * conversionRate).toFixed(2);
 
        
        tipPercentageDisplay.textContent = tipPercentage; 
        tipAmountInput.value = `${selectedCurrency} ${tipAmount}`;
        totalWithTipInput.value = `${selectedCurrency} ${totalWithTip}`;
    }

       
    }

    
    billTotalInput.addEventListener('input', calculateTip);  
    tipSlider.addEventListener('input', calculateTip);      
    currencySelect.addEventListener('change', calculateTip); 
});
