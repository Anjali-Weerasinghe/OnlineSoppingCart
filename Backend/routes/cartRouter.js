const router = require("express").Router();
const CartItem = require("../models/cartModel");


router.post('/',async(req,res)=>{
    try{
        const {oredrId,product_id,content,mail,price,quantity,images} = req.body;
       
        const newDetails = new CartItem({
            oredrId,product_id,content,mail,price,quantity,images
        });

        const savedDetails = await newDetails.save();
        console.log("Success")
        res.status(200).send({data : savedDetails});

    }catch(err){
        res.status(500).send({status : err});
    }
})

router.get('/', async(req,res)=>{
    try{
        const allCart = await CartItem.find();
        res.status(200).send({data : allCart});
    }catch(err){
        res.status(500).send({data : err});
    }
})

router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const details = await CartItem.find({oredrId : id})
        res.status(200).send({data : details});

    }catch(err){
        res.status(500).send({data : err});
    }

})



module.exports = router;