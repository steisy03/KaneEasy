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
    las_name: string;
    
    @Column()
    identification: number;

    @Column({ type: 'varchar', length: 250 })
    email: string;

    @Column()
    phone: number;

    @Column({ type: 'varchar', length: 250 })
    address: string;

    @Column({ type: 'int' })
    province: number;

    @Column({ type: 'int' })
    city: number;

    @Column({ type: 'int' })
    sector: number;

    @OneToMany(() => LoanRequest, (loanRequest) => loanRequest.person_id)
    loanRequests: LoanRequest[];

    
}