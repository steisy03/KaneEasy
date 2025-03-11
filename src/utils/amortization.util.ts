function amortization(amount, rate, years) {
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = amount * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
    return Math.round(monthlyPayment * 100) / 100;
}

function withoutAmortization(amount, rate) {
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = amount * monthlyRate;
    return Math.round(monthlyPayment * 100) / 100;
}


export { amortization, withoutAmortization };

