import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Loan } from './loan.entity';

@Entity()
export class Payment {  

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'int' })
    quote: number;

    @Column({ type: 'varchar' })
    status: number;

    @Column({ type: 'varchar' })
    type: number;

    @ManyToOne(() => Loan, (loan) => loan.payments)
    loan: Loan;

}