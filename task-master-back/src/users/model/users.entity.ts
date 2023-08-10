import { Column, Default, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;
  @Column
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column
  password: string;
  @Default(1)
  @Column
  rollId: number;
}
