const router = require("express").Router();
const cookieParser = require("cookie-parser");
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE
router.use(cookieParser)
router.post("/", (req,res,next)=>
{
  const authHeader = req.cookies.token;
  if (authHeader) {
    const token = authHeader;

    jwt.verify(token,"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",(err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      
      next();
    });
  } 
  else {
    return res.status(401).json("You are not authenticated!");
  }
}, async (req, res) => {
  if (req.user.isAdmin) {
    
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE

router.put("/:id", (req,res,next)=>
{
  const authHeader = req.cookies.token;
  if (authHeader) {
    const token = authHeader;

    jwt.verify(token,"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",(err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      
      next();
    });
  } 
  else {
    return res.status(401).json("You are not authenticated!");
  }
},async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id",(req,res,next)=>
{
  const authHeader = req.cookies.token;
  if (authHeader) {
    const token = authHeader;

    jwt.verify(token,"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",(err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      
      next();
    });
  } 
  else {
    return res.status(401).json("You are not authenticated!");
  }
}, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/find/:id", (req,res,next)=>
{
  const authHeader = req.cookies.token;
  if (authHeader) {
    const token = authHeader;

    jwt.verify(token,"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",(err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      
      next();
    });
  } 
  else {
    return res.status(401).json("You are not authenticated!");
  }
}, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM

router.get("/random",(req,res,next)=>
{
  const authHeader = req.cookies.token;
  if (authHeader) {
    const token = authHeader;

    jwt.verify(token,"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",(err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      
      next();
    });
  } 
  else {
    return res.status(401).json("You are not authenticated!");
  }
},async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", (req,res,next)=>
{
  const authHeader = req.cookies.token;
  if (authHeader) {
    const token = authHeader;

    jwt.verify(token,"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",(err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      
      next();
    });
  } 
  else {
    return res.status(401).json("You are not authenticated!");
  }
}, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
