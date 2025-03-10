import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { LoanType } from './loan-type.entity';

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
}
