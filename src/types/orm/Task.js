import {DataTypes, Model} from "sequelize";
import sequelizeConf from "../../../sequelize";
import {Category} from "@/types/orm/Category";

class Task extends Model {}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: sequelizeConf,
    tableName: 'tasks'
});

Task.belongsTo(Category);
Category.hasMany(Task, {
    sourceKey: 'id',
    foreignKey: 'categoryId',
    as: 'tasks'
});
export { Task };
