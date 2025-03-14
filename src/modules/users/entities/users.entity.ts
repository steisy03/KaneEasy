import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @Column({ unique: true, type: 'varchar', length: 250 })
  email: string;

  @Column()
  password: string;

}
