import express, { response } from 'express';

const app = express();


app.get("/users", (request, response)=>{
    return response.json({message: "Hello World - NLW04"});
});

app.listen(3333, () => console.log("server is running!"));