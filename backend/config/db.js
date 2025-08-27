import { Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: './.env'});

// Debug: Check if environment variables are loaded
console.log('Environment variables:');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'undefined');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host : process.env.DB_HOST,
        dialect : "postgres",
        logging : false,
    }
)
export default sequelize;