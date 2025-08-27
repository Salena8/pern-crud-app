import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser  from 'body-parser';
import employeeRoutes from './routes/employeeRoutes.js';
import sequelize from './config/db.js';

dotenv.config({path: './.env'});

const app = express();
const port = process.env.PORT || 3000;

const corsOption = {
    origin : "*"
}

app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/employee', employeeRoutes);

//handles undefined routes
app.use(function(req, res){
    res.status(404).json({error: "Not found"})
})

//test DB connection and sync
try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected...");
    await sequelize.sync({alter: true});
} catch (err) {
    console.log("Unable to connect to DB...", err)
}

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})