import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Task extends Model {
  @Column({ unique: true })
  title: string;
  @Column
  datetime: Date;
  @Column
  priority: string;
  @Column
  description: string;
}
