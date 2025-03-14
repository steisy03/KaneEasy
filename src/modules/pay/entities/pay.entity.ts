import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Loan } from '../../loan/entities/loan.entity';

@Entity()
export class Pay {  

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'date', default: new Date() })
    date: Date;

    @Column({ type: 'varchar', default: 'active' })
    status: number;

    @Column({ type: 'varchar', length: 50, default: 'quote' })
    type: string;

    @ManyToOne(() => Loan, (loan) => loan.payments)
    loan: Loan;

}