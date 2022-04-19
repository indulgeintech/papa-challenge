import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  HasMany,
  BelongsToMany,
  Min,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { VisitStatus } from '../dtos/visit.dto';
import { Task } from './task.entity';
import { Transaction } from './transaction.entity';


@Table({
  tableName: 'visit',
})
export class Visit extends Model<Visit> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Team)
  @Column
  teamId: number

  @BelongsTo(() => Team)
  team: Team

  @Column({ field: 'minutes',  type: DataType.DECIMAL, })
  @Min(30)
  minutes: string;

  @Column({ field: 'created_at', type: DataType.DATE })
  date: Date;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Column({ type: DataType.ENUM(VisitStatus.requested, VisitStatus.completed) })
  status: VisitStatus

  @HasMany(() => Task)
  tasks: Task[];
}