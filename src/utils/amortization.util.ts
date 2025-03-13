import { AmortizationSchedule } from '../common/interfaces/amortization-schedule.interface';

function amortizationQuote(
  amount: number,
  rate: number,
  years: number,
): AmortizationSchedule[] {
  const amortization: AmortizationSchedule[] = [];
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment =
    (amount * monthlyRate) / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
  let balance = amount;
  for (let y = 0; y < years; y++) {
    let interest = 0;
    let principal = 0;
    for (let m = 0; m < 12; m++) {
      const interestM = balance * monthlyRate;
      const principalM = monthlyPayment - interestM;
      interest = interest + interestM;
      principal = principal + principalM;
      balance = balance - principalM;
    }
    amortization.push({ principal, interest, balance });
  }
  return amortization;
}

function amortization(amount, rate, quote) {
  const monthlyRate = rate / 100 / 12 ;
  const monthlyPayment =
    (amount * monthlyRate) / (1 - Math.pow(1 / (1 + monthlyRate), quote));
 
  const pay = Math.round(monthlyPayment * 100) / 100;
  const interest = amount * monthlyRate;
  const principal = pay - interest;
  return { pay, principal, interest};
}

function withoutAmortization(amount, rate) {
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = amount * monthlyRate;
  return monthlyPayment //Math.round(monthlyPayment * 100) / 100;
}

export { amortization, withoutAmortization, amortizationQuote };
