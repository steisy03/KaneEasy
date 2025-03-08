import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { LoanType } from './loan-type.entity';

@Entity()
export class LoanRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  amount: string;

  @Column({ type: 'int' })
  years: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @ManyToOne(() => Person, (person) => person.loanRequests)
  person_id: Person;

  @ManyToOne(() => LoanType, (loanType) => loanType.loan_requests)
  loan_type_id: LoanType;
}
