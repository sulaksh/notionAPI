const express = require('express');

const { Client } = require('@notionhq/client');

const cors = require('cors');

const bodyParser = require('body-parser');

let jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const notion = new Client({auth : "secret_arMOeEC10rdP5yXnX2zqOfzuzkfLpstAw0CYWoNW06l"});

const databaseId = "fcd1db47b9b14a379c8b6f5da94c8325";

app.post('/submitFormtoNotion', jsonParser, async (req, res) =>{
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const extraInfo = req.body.extraInfo;

    try {
        const response = await notion.pages.create({
            parent : { database_id: databaseId},
            properties : {
                Name: {
                    title: [
                        {
                            text: {
                                content: name
                            }
                        }
                    ]
                },
                "Phone Number": {
                    rich_text: [
                        {
                            text: {
                                content: phoneNumber
                            }
                        }
                    ]
                },
                "Extra Information": {
                    rich_text: [
                        {
                            text: {
                                content: extraInfo
                            }
                        }
                    ]
                }
            }
        }) 
        console.log(response);
        console.log("Success");
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, HOST, ()=>{
    console.log("Starting Proxy at " +  HOST + ":" + PORT);
})