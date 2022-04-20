import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Min,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { VisitStatus } from '../dtos/visit.dto';
import { Task } from './task.entity';


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

  @Column({ field: 'minutes',  type: DataType.INTEGER })
  minutes: number;

  @Column({ field: 'date', type: DataType.DATE })
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

  @ForeignKey(() => User)
  @Column({
      type: DataType.UUID,
      field: 'user_id',
  })
  userId: string;

  @BelongsTo(() => User)
  member: User;
}