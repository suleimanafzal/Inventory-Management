const { addOrder } = require("../Controllers/orderController");
const { VerifyToken } = require("../utils/Authenticate");

const router = require("express").Router();

    
router.post("/add" , VerifyToken ,  addOrder)


module.exports= router;