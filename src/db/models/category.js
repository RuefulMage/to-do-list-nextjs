import {DataTypes, Model} from "sequelize";
import sequelizeConf from "@/db/sequelize";

class Category extends Model {
}

Category.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize: sequelizeConf,
        tableName: 'categories'
    });

export default Category;
