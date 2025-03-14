import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { LoanRequest } from './loan-request.entity';


@Entity()
export class LoanCanceled {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 250 })
    reason: string;

    @OneToOne(() => LoanRequest, (loanRequest) => loanRequest.id)
    loan_request: LoanRequest;

}