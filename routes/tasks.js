const express = require('express')
const router = express.Router()


module.exports = (tasks, saveTask) => {

    //to get all the tasks
    router.get('/', (req,res) => {
        res.json(tasks)
    })

    //GET a single task by id
    router.get('/:id', (req,res) => {
        const id = parseInt(req.params.id)
        const task = tasks.find(t => t.id === id)

        if(!task){
            res.status(404).json({error:"task not found"})
        }

        res.json(task)
    })

    //POST create a new task
    router.post('/', (req,res) => {
        const {title, description, completed} = req.body

        if(!title || typeof title !== 'string'){
            res.status(400).json({error: "title not found"})
        }

        if(!description || typeof description !== 'string'){
            res.status(400).json({error: "description not found"})
        }

        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title,
            description,
            completed: Boolean(completed)
         }

         tasks.push(newTask)
         saveTask()
         res.status(201).json(newTask)
    })

    //Update a particular task by id
    router.put('/:id', (req,res) => {
        const id = parseInt(req.params.id)
        const task = tasks.find(t => t.id === id)

        if(!task){
        return res.status(404).json({error: "id not found"})
        }

        const {title, description, completed} = req.body

        if (!title || typeof title !== "string"){
        return res.status(400).json({error: "title not found"})
        }

        if (!description || typeof description !== "string"){
            return res.status(400).json({error:"desc not found"})
        }

        if (completed !== undefined && typeof completed !== "boolean") {
            return res.status(400).json({ error: "Invalid completed" })
        }
        task.title = title
        task.description = description
        task.completed = Boolean(completed)

        saveTask()
        res.json(task)

    })

    // Update a specific field in task
    router.patch('/:id', (req,res) => {
        const id = parseInt(req.params.id)
        const task = tasks.find(t => t.id === id)

        if (!task){
            res.status(404).json({error:"task not found"})
        }

        const {title, description, completed} = req.body

        if (title !== undefined){
            if(typeof title !== "string"){
                return res.status(404).json({error:"not a valid title"})
            }
            task.title = title
        }

        if (description !== undefined){
            if( typeof description !== "string"){
                return res.status(404).json({error:"not a valid desc"})
            }
            task.description = description
        }

        if (completed !== undefined){
            if (typeof completed !== "boolean" ){
                return res.status(404).json({error: "not a valid completed"})
            }
            task.completed = completed ?? false
        }

        saveTask()
        res.json(task)
    })

    router.delete('/:id',(req,res) => {
        const id = parseInt(req.params.id)
        const index = tasks.findIndex(t=> t.id === id)

        if(index === -1){
            return res.status(404).json({error:"task not found"})
        }

        const deleted = tasks.splice(index , 1)

        saveTask()

        res.json(deleted[0])
    })

    return router
}