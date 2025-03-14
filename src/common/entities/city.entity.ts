import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Province } from './province.entity';
import { Sector } from './sector.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Province, (province) => province.cities)
  province_id: Province;

  @OneToMany(() => Sector, (sector) => sector.city_id)
  sectors: Sector[];
}
