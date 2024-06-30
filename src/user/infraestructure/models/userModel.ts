import { Model, DataType, Table, Column } from 'sequelize-typescript';
import { HasMany } from 'sequelize-typescript';
import UserPublicationModel from '../../../publication/infraestructure/models/userPublicationModel';

@Table({
    tableName: 'users',
    timestamps: true 
})
class UserModel extends Model {
    @HasMany(() => UserPublicationModel)
    public publications!: UserPublicationModel[];
    
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;
    
    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public name!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public last_name!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public email!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public password!: string;

    // Agrega esto
    @Column({
        type: DataType.STRING(512), // 512 caracteres deberían ser suficientes para una URL, pero puedes ajustar según tus necesidades.
        allowNull: true // Puede ser nulo si el usuario no sube una imagen de perfil.
    })
    public profilePicture!: string;  
}

export default UserModel;
