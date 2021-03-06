import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Visit, Transaction } from '../visits/entity/';
import { Role } from './dtos/user.dto';

@Table({
  tableName: 'user',
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ field: 'balance'})
  balance: number;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Column({ type: DataType.ARRAY(DataType.ENUM(Role.member, Role.pal)) })
  role: Role[];

  @HasMany(() => Visit)
    posts: Visit[];
}