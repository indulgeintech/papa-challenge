import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { Visit } from './visit.entity';

@Table({
    tableName: 'transaction',
})
export class Transaction extends Model<Transaction> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        field: 'member'
    })
    member: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        field: 'pal'
    })
    pal: string;

    @ForeignKey(() => Visit)
    @Column({
        type: DataType.UUID,
        field: 'visit'
    })
    visit: string;
}