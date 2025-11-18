const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TASK_FILE = path.join(__dirname, 'task.json')

let tasks = []

try{
    if(fs.existsSync(TASK_FILE)){
        const raw = fs.readFileSync(TASK_FILE, 'utf8')
        const parsed = JSON.parse(raw)

        if (Array.isArray(parsed.tasks)){
            tasks = parsed.tasks
        }else{
            console.warn("task.json found but does not contain a tasks array. Starting with empty list.")
        }
    }else{
        console.warn("task.json not found — starting with empty tasks array.")
    }
}catch(err){
    console.error("Error reading or parsing task.json — starting with empty tasks array.", err)
    tasks = []
}

function saveTask() {
    fs.writeFileSync(TASK_FILE, JSON.stringify({tasks},null, 2))
}

const taskRoutes = require("./routes/tasks.js")(tasks,saveTask)
app.use("/tasks", taskRoutes)

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;