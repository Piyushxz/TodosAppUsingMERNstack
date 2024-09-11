const express = require("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "iloveyou"
const app = express()
const PORT = 3006;

let users =[{
    username:"TEST",
    password:"test123",
    todos:[
        {
            id:1,
            todo:"Gym"
        }
    ]
}]


app.use(express.json())
app.post("/signup",(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
    
    
        users = [...users,{username,password,todos:[]}];

        res.json({message:"Successfully added user"})
    }
    catch(err){
        res.json({message:"Failed to add user", error:err})
    }

    console.log(users)
})

app.post("/signin",(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        let foundUser = null;
        foundUser = users.find(user => user.username === username && user.password === password)

        if(foundUser){
            let token = jwt.sign({username:username},JWT_SECRET)
            res.json({token:token,message:"Signed In"})
        }
        else{
            res.json({message:"Coudnt sign in"})
        }
    }catch(err){
        res.json({message:"Coudnt sign in",error:err})
    }
})


app.get("/todos",(req,res)=>{
    try{
        const token = req.headers.token;

        const decodedUsername = jwt.verify(token,JWT_SECRET)

        let foundUser = null;

        foundUser = users.find(user => user.username === decodedUsername.username)

        if(foundUser){
            res.json({username:foundUser.username ,todos:foundUser.todos})
        }else{
            res.json({message:"Codunt find user"})
        }
    }catch(err){
        res.json({error:err})
    }
})

app.post("/todos",(req,res)=>{
    try{
        const token = req.headers.token;
        const todo = req.body.todo
        const decodedUsername = jwt.verify(token,JWT_SECRET)

        let foundUser = null;

        foundUser = users.find(user => user.username === decodedUsername.username)

        if(foundUser){
            foundUser = {...foundUser,todos:[...foundUser.todos,todo]}
        }

        res.json({message:`${todo} added to User ${foundUser.username}`})
    }catch(err){
        res.json({message:"Could not add todo", error:err})
    }
})

app.delete("/todos",(req,res)=>{
    try{
        const token = req.headers.token;
        const todoId = req.body.id;
        const decodedUsername = jwt.verify(token,JWT_SECRET)

        let foundUser = null;

        foundUser = users.find(user => user.username === decodedUsername.username)

        if(foundUser){
            foundUser.todos = foundUser.todos.filter(todo => todo.id !== todoId)
        }

        res.json({message:`todo with${id} removed`})
      

    }catch(err){
        res.json({message:"Codunt delete todo"})
    }
})
app.listen(PORT , ()=>{
    console.log("App is running")
})



