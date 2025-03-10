import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LoanRequest } from './loan-request.entity';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    active: boolean;
    
    @Column({ type: 'varchar', length: 100 })
    first_name: string;
    
    @Column({ type: 'varchar', length: 100 })
    last_name: string;
    
    @Column({ type: 'varchar', length: 15 })
    identification: string;

    @Column({ type: 'varchar', length: 250 })
    email: string;

    @Column({ type: 'varchar', length: 15 })
    phone: string;

    @Column({ type: 'varchar', length: 250 })
    address: string;

    @Column({ type: 'int' })
    province: number;

    @Column({ type: 'int' })
    city: number;

    @Column({ type: 'int' })
    sector: number;

    @OneToMany(() => LoanRequest, (loanRequest) => loanRequest.person)
    loanRequests: LoanRequest[];

    
}