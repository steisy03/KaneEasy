import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { LoanType } from '../../loan-type/entities/loan-type.entity';
import { Loan } from './loan.entity';
import { LoanCanceled } from './loan-canceled.entity';

@Entity()
export class LoanRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'int' })
  years: number;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string;

  @ManyToOne(() => Person, (person) => person.loanRequests)
  person: Person;

  @ManyToOne(() => LoanType, (loanType) => loanType.loan_requests)
  loan_type: LoanType;

  @OneToOne(() => Loan, (loan) => loan.loan_request)
  loan: Loan;

  @OneToOne(() => LoanCanceled, (loanCanceled) => loanCanceled.loan_request)
  loan_canceled: LoanCanceled;

  amortization?: number;
}
