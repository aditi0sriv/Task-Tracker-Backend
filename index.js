import express from "express";
import dotenv from 'dotenv';
import errorHandlers from "./app/middlewares/error-Handler.js";
import cors from 'cors';
import connectToMongoDB from "./app/middlewares/db.js";
import routes from "./app/routes/routes.js";


const {
    useErrorHandler
} = errorHandlers; // destructuring object errorHandlers 

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

connectToMongoDB(); // connecting to mongo database
app.use(express.json()); // parsing incoming JSON data body requests
app.use(express.urlencoded({ extended : false })); // parsing and reading form data
app.use(cors());


app.use(useErrorHandler);
app.use('/', routes);
 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});