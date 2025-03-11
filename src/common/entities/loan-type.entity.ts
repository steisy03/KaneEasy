import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class LoanType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({default: 0})
  interest_rate: number;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @OneToMany(() => LoanType, (loanType) => loanType.id)
  loan_requests: LoanType[];

}