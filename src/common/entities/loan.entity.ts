import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { LoanType } from './loan-type.entity';
import { LoanRequest } from './loan-request.entity';
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

    @Column({ type: 'varchar', length: 100 })
    status: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    pending_amount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    pending_rate: number;

    @Column({ type: 'int' })
    pending_quote: number;

    @ManyToOne(() => LoanType, (loanType) => loanType.loan_requests)
    loan_type: LoanType;

    @OneToOne(() => LoanRequest, (loanRequest) => loanRequest.id)
    loan_request: LoanRequest;

    @OneToMany(() => Loan, (loan) => loan.quotes)
    quotes: Loan[];

    @OneToMany(() => Loan, (loan) => loan.payments)
    payments: Loan[];

}