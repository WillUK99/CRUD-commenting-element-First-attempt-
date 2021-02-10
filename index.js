const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))


// hardcoded "db" of comments 
let comments = [
    {
        id: uuid(),
        username: "MoleJuice",
        comment: "moles are the best"
    },
    {
        id: uuid(),
        username: "snoopdog",
        comment: "how many calories are in this brownie?"
    },
    {
        id: uuid(),
        username: "elongatedMuskrat",
        comment: "hahah. rocket go boom"
    },
    {
        id: uuid(),
        username: "bupton33",
        comment: "alfie is my fav dog ever!"
    }
]

// home page
app.get("/", (req, res) => {
    res.render("comments/index", { comments });
})

// renders create comment page
app.get("/new", (req, res) => {
    res.render("comments/new");
})

// adds on to the hardcoded 'db' above
app.post("/", (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect("/")
})

// Shows details on the selected comment (no validation yet)
app.get("/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/details", { comment });
})

// Allows you to edit a specific comment.
app.get("/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/edit", { comment });
    
})

// Patches the selected comment id's comment
app.patch("/:id", (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newComment;
    res.redirect("/");
})  

app.delete("/:id" , (req, res) => {
    const { id } =req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect("/");
})



// localhost:3000 listening 
app.listen("3000", () => {
    console.log("server online")
})