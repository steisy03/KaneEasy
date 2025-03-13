import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Loan } from './loan.entity';

@Entity()
export class Quote {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'varchar', default: 'pending' })
    status: string;

    @Column({ type: 'date', default: new Date() })
    payment_date: Date;

    @ManyToOne(() => Loan , (loan) => loan.quotes)
    loan: Loan;
}