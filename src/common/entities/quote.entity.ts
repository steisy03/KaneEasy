import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Loan } from './loan.entity';

@Entity()
export class Quote {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ type: 'varchar' })
    status: string;

    @ManyToOne(() => Loan , (loan) => loan.quotes)
    loan: Loan;
}