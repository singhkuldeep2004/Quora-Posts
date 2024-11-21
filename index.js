
// step <1> {doing all compulsory process}
const express = require("express");
const app = express();
const path = require("path");
const{ v4 : uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended :true}));
app.use(methodOverride('_method'));
  

app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));

//</1>


//step <2> {show all post on the localhost 8080 server }
let port = 8080;
app.listen(port , ()=>{
    console.log("app is running on port", port);
});

let posts = [
    {   id : uuidv4(),
        username : "Kuldeep Singh",
        content : "i am creating my first RESTful api",
    },
    {
        id : uuidv4(),
        username : "Deepak Khatik",
        content : "i am creating my first RESTful api",
    },
    {
        id : uuidv4(),
        username : "Yuvraj Sukhwal",
        content : "i am creating my first RESTful api",
    }

];

app.get("/posts", (req,res)=>{
   res.render("index.ejs", {posts});
});

// </2>

// <3> { making new post}

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts" , (req,res)=>{
    // console.log(req.body);
    // res.send("post request working");
    const id = uuidv4();
    let {username , content} = req.body;
    posts.push({id ,username , content});
    res.redirect("/posts",); 
});

// </3>

// <4> {excess post by its id }

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    // console.log(id)
    // res.send("request working well");
    let post = posts.find((posts)=> id === posts.id);
    // console.log(post);

    res.render("show.ejs",{post});
   

});
// </4>

// <5> {edit the post : patch request}  
// PATCH request ham direct nahi bhej sakte eske liye hame ak packege install karna padta he {npm i method-override }
// GET route to show the edit form
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

// PATCH route to handle post updates
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    if (post) {
        const { username, content } = req.body;
        post.username = username || post.username;
        post.content = content || post.content;
        res.redirect("/posts");
    } else {
        res.status(404).send("Post not found");
    }
});
// </5>


// <6> {delete the post}
app.delete("/posts/:id" , (req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts",); 
});



