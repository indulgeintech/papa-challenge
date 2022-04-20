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
    Length,
    ForeignKey,
  } from 'sequelize-typescript';
import { Visit } from './visit.entity';
  
  @Table({
    tableName: 'task',
  })
  export class Task extends Model<Task> {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    })
    id: string;
  
    @Length({
        min: 3,
        max: 60,
        msg: `The length of task title can't be shorter than 3 and longer than 60 `,
    })
    @Column
    title: string;

    @Column
    description: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;
  
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @ForeignKey(() => Visit)
    @Column({field:'visit_id', type: DataType.STRING,})
    visitId: string;
  
    @BelongsTo(() => Visit)
    visit: Visit;
  }