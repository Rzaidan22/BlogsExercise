const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blog = require('../models/blog');

const router = Router();


router.post('/register', async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const record = await User.findOne({email: email});

    if(record){
        return res.status(400).send({
            message: "Email is already registered"
        })
    } else{
        
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        const result = await user.save();

        //JWT Token

        const {_id} = await result.toJSON();
        const token = jwt.sign({_id:_id}, "secret");

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24*60*60*1000
        })

        res.send({
            message: "success"
        });
    }
});

router.post('/login', async (req,res) => {
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).send({
            message:"User Not Found!"
        })
    }

    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).send({
            message:"Password is Incorrect"
        });
    }

    const token = jwt.sign({_id: user._id}, "secret")

    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:24*60*60*1000 //for 1 day
    })

    res.send({
        message:"Success"
    })
});

router.get('/user', async (req,res) => {
    try{
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie,"secret")

        if(!claims){
            return res.status(401).send({
                message: "unauthenticated"
            })
        }

        const user = await User.findOne({_id: claims._id})

        const {password,...data} = await user.toJSON()

        res.send(data)

    } catch(err){
        return res.status(401).send({
            message:"unauthenticated"
        })
    }
});

router.post('/logout',(req,res) => {
    res.cookie("jwt", "", {maxAge:0})
    res.send({
        message:'success'
    })
})

 // this API Returns all posts found in DataBase
 router.get('/posts',(req,res) => {
    console.log('here');

    Blog.find({}).then((blogs) => {
        res.send(blogs);
    })
})

 // this API Returns specific posts found in DataBase
 router.get('/posts/:id',(req,res) => {
    Blog.find({ _id: req.params.id}).then((blogs) => {
        res.send(blogs);
    })
})

 // this API update a specific blog post (where an ID of the blog Post should be sent in the URL)
 // the new values should be sent in json format within the body of the request
 router.put('/posts/:id',(req,res) => {
    Blog.findOneAndUpdate({ _id: req.params.id},{
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
})

 // this API Create a new Blog post
 // the blog post information (fields) should be passed in via JSON Request Body
 router.post('/posts', (req,res) => {
    
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author

    let newBlog = new Blog({
        title,
        content,
        author
    });
    newBlog.save().then((blogDoc) => {
        res.send(blogDoc);
    })
})

 // this API Delete a specified blog post 
 router.delete('/posts/:id',(req,res) => {
    Blog.findOneAndRemove({
        _id: req.params.id
    }).then((removedBlogDocument) => {
        res.send(removedBlogDocument);
    })
})


module.exports = router;