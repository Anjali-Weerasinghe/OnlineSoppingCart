const router = require("express").Router();
const { response } = require("express");
let Delivery = require("../models/deliveryModel");

//http://Localhost:5000/delivery/add
router.route("/add").post((req, res) =>{
    
    const userName = req.body.userName;
    const orderID = req.body.orderID;
    const total =  Number(req.body.total);
    const name = req.body.name;
    const city = req.body.city;
    const postalCode = Number(req.body.postalCode);
    const address = req.body.address;
    const contactNo = req.body.contactNo; 
    

    const newDelivery = new Delivery ({
        userName,
        orderID,
        total,
        name,
        city,
        postalCode,
        address,
        contactNo
       
    })

    newDelivery.save().then(()=> {
        res.json("Delivery details Added")
    }).catch((err) => {
        console.log(err);
    })

})

// fetch data

router.route("/").get((req, res) => {

    Delivery.find().then((deliveries)=>{
        res.json(deliveries)
    
    }).catch((err)=>{
        console.log(err)
    })

})

//update

router.route("/update/:id").put(async (req, res) => {

    let userId = req.params.id;
    //d structure
    const {userName, orderID, total, name, city, postalCode, address, contactNo} = req.body;

    const updateDelivery = {
        userName,
        orderID,
        total,
        name,
        city,
        postalCode,
        address,
        contactNo
       
    }

    const update = await Delivery.findByIdAndUpdate(userId, updateDelivery).then(() => {

        res.status(200).send({status: "Delivery Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message });
    }) 

})

//delete

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Delivery.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Delivery Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete  bus data!", error:err.message})
    })
})

//get one  data
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const deliverydata = await Delivery.findById(userId).then((delivery) => {
        res.status(200).send({status: "delivery fetched", delivery});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get details!", error:err.message});
    })

})



module.exports = router;
