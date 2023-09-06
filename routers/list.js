const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE

router.post("/",(req,res,next)=>
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
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", (req,res,next)=>
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
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/",(req,res,next)=>
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
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
