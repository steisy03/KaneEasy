import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { LoanType } from '../../loan-type/entities/loan-type.entity';
import { LoanRequest } from './loan-request.entity'; // Ensure this path is correct or the file exists
@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    approved_amount: number;

    @Column({ 'type': 'int' })
    approved_rate: number;

    @Column({ type: 'int' })
    approved_year: number;

    @Column({ type: 'int' })
    quote: number;

    @Column({ type: 'int' })
    payment_day: number;

    @Column({ type: 'int' })
    payment_day_to_pay: number;

    @Column({ type: 'varchar', length: 100, default: 'init' })
    status: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    pending_amount: number;

    @Column({ type: 'int' })
    pending_quote: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    paying_rate: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount_to_pay: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    rate_to_pay: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    base_to_pay: number;

    @Column({ type: 'date', default: new Date() })
    next_payment_date: Date;

    @ManyToOne(() => LoanType, (loanType) => loanType.loan_requests)
    loan_type: LoanType;

    @ManyToOne(() => LoanRequest, (loanRequest) => loanRequest.id)
    loan_request: LoanRequest;

    @OneToMany(() => Loan, (loan) => loan.quotes)
    quotes: Loan[];

    @OneToMany(() => Loan, (loan) => loan.payments)
    payments: Loan[];

}