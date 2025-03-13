export interface LoanInterface {
    approved_amount: number;
    approved_rate: number;
    approved_year: number;
    quote: number;
    payment_day: number;
    payment_day_to_pay: number;
    status: string;
    pending_amount: number;
    pending_quote: number;
    paying_rate: number;
    amount_to_pay: number;
    loan_type: number;
    loan_request_id: number;
}