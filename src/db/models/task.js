import {DataTypes, Model} from "sequelize";
import sequelizeConf from "../sequelize";
import Category from "./category";

class Task extends Model {}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
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

Task.belongsTo(Category, {
    foreignKey: 'categoryId'
});
Category.hasMany(Task, {
    sourceKey: 'id',
    foreignKey: 'categoryId',
    as: 'tasks'
});

export default Task ;
