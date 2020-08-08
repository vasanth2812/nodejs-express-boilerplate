import express from "express";
// import path from "path";
// import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "../config";

dotenv.config();
const app = express();
const statusMessage = config.Status_Message;
app.use(bodyParser.json());

// connect mongoose
// mongoose.connect("", { useMongoClient: true });

// https://swagger.io/specification/#infoobject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'vkdev url',
            version: '1.0.1',
            description: 'vkdev',
            contact: {
                name: "vkdev"
            },
            servers: ['http://localhost:8080']
        }
    },
    // ['./routes/*.js']
    apis: ['./src/index.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /v1/api/demo/{id}:
 *  get:
 *    tags:
 *      - Demo API  
 *    description: get by id
 *    parameters:
 *      - name: id
 *        description: id to get by
 *        in: path
 *        type: integer
 *        required: true     
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/v1/api/demo/:id", (req, res) => {
    res.status(200).send({
        getId: req.params.id
    });
});

// Routes
/**
 * @swagger
 * /v1/api:
 *  post:
 *    tags:
 *      - Demo API
 *    description: Use to request api
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post("/v1/api", (req, res) => {
    res.status(200).send(statusMessage.Success_Status_200);
});

/**
 * @swagger
 * /v1/api/demo/{id}:
 *  delete:
 *    tags:
 *      - Demo API  
 *    description: delete by id
 *    parameters:
 *      - name: id
 *        description: id to delete
 *        in: path
 *        type: integer
 *        required: true     
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.delete("/v1/api/demo/:id", (req, res) => {
    res.status(200).send({
        getId: req.params.id
    });
});


/**
 * @swagger
 * /v1/api/demo/{id}:
 *  patch:
 *    tags:
 *      - Demo API  
 *    description: update by id
 *    parameters:
 *      - name: id
 *        description: id to update
 *        in: path
 *        type: integer
 *        required: true 
 *      - name: reqbody
 *        description: request body
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *              name:
 *                type: string
 *              website:
 *                type: string
 *              required:
 *                - name
 *                - website     
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.patch("/v1/api/demo/:id", (req, res) => {
    const { name, website } = req.body;
    res.status(200).send({
        getId: req.params.id,
        name,
        website
    });
});

// this is default in case of unmatched routes
app.use((req, res) => {
    res.status(404).json(statusMessage.Error_Status_404);
})

app.listen(process.env.PORT, () => console.log(`App running on localhost:${process.env.PORT}`));