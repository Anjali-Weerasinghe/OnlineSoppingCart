import React, { Component,useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

    

export default class EditDelivery extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

            userName: '',
            orderID: '',
            total: '',
            name:'',
            city:'',
            postalCode:'',
            address:'',
            contactNo:'',
            nameError:'',
            cityError:'',
            postalCodeError:'',
            addressError:'',
            contactNoError:'',
            

            

        }

        
        this.onChangeuserNameHandler= this.onChangeuserNameHandler.bind(this);
        this.onChangeorderIDHandler= this.onChangeorderIDHandler.bind(this);
        this.onChangetotalHandler= this.onChangetotalHandler.bind(this);
        this.onChangenameHandler= this.onChangenameHandler.bind(this);
        this.onChangecityHandler= this.onChangecityHandler.bind(this);
        this.onChangepostalCodeHandler= this.onChangepostalCodeHandler.bind(this);
        this.onChangeaddressHandler= this.onChangeaddressHandler.bind(this);
        this.onChangecontactNoHandler= this.onChangecontactNoHandler.bind(this);
        

        this.onSubmit = this.onSubmit.bind(this);
        
        
        

    }
    notify(){
        toast.warn('Delivery Updated Successfully!', {position: toast.POSITION.TOP_CENTER})

    }

    componentDidMount(){
        axios.get('http://localhost:5000/delivery/get/' + this.props.match.params.id)
            .then(response =>{
                this.setState({

                    userName:response.data.delivery.userName,
                    orderID :response.data.delivery.orderID,
                    total :response.data.delivery.total,
                    name:response.data.delivery.name,
                    city:response.data.delivery.city,
                    postalCode:response.data.delivery.postalCode,
                    address:response.data.delivery.address,
                    contactNo:response.data.delivery.contactNo
                    

                })
            })
            .catch(function(error){
                console.log(error)
            });
    }
    onChangeuserNameHandler(e){
        this.setState({userName:e.target.value});
    }
    onChangeorderIDHandler(e){
        this.setState({orderID:e.target.value});
    }
    onChangetotalHandler(e){
        this.setState({total:e.target.value});
    }

    onChangenameHandler(e){
        this.setState({name:e.target.value});
    }
    onChangecityHandler(e){
        this.setState({city:e.target.value});
    }
    onChangepostalCodeHandler(e){
        this.setState({postalCode:e.target.value});
    }
    onChangeaddressHandler(e){
        this.setState({address:e.target.value});
    }
    onChangecontactNoHandler(e){
        this.setState({contactNo:e.target.value});
    }

    
    


    onSubmit(e) {
        e.preventDefault();
       
        
        
            const obj = {
            
                userName:this.state.userName,
                orderID:this.state.orderID,
                total:this.state.total,
                name: this.state.name,
                city: this.state.city,
                postalCode: this.state.postalCode,
                address: this.state.address,
                contactNo: this.state.contactNo
                

            };

            axios.put("http://localhost:5000/delivery/update/"+this.props.match.params.id, obj)
             .then(res =>console.log(res.data),
             alert("Update Successfully"));
             this.notify();
                
             
        this.props.history.push('/history'); 
                
        
       
                
        

       
    }
    





    render() {
        return(
            <div className="container" style={{ marginTop: 40 }}>
                <div className="row" className="css" >
                    <div className={"col-md-6 offset-md-3 offset-md-3"} style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px" }}>
                        <h3 style={{ background: "#072344", color: "white" }}><center>UPDATE DELIVERY  DETAILS</center></h3>
                        <div className="card-body" >
                            <form onSubmit={this.onSubmit} style={{ alignContent: "center" }}>
                                
                                <div className="form-group"  required>
                                    <label htmlFor="username">UserName</label>
                                    <input type="text" className="form-control" id="userName" placeholder="" readOnly
                                        value={this.state.userName}
                                        onChange = {this.onChangeuserNameHandler}
                                    />
                                    
                                </div>
                                <div className="form-group"  required>
                                    <label htmlFor="name">OrderID</label>
                                    <input type="text" className="form-control" id="orderID" placeholder="" readOnly
                                        value={this.state.orderID}
                                        onChange = {this.onChangeorderIDHandler}
                                    />
                                    
                                </div>
                                <div className="form-group"  required>
                                    <label htmlFor="name">Total Payment</label>
                                    <input type="text" className="form-control" id="total" placeholder="" readOnly
                                        value={this.state.total}
                                        onChange = {this.onChangetotalHandler}
                                    />
                                    
                                </div>
                                <div className="form-group"  required>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="" required
                                        value={this.state.name}
                                        onChange = {this.onChangenameHandler}
                                    />
                                    
                                </div>
                                

                                <Form.Group className="mb-3"  required>
                                    <Form.Label htmlFor="itemname">City</Form.Label>
                                    <Form.Control type="text" className="form-control" id="city" placeholder="" required
                                        value={this.state.city}
                                        onChange = {this.onChangecityHandler}
                                    />
                                </Form.Group>
                                

                                <Form.Group className="mb-3"  required>
                                    <Form.Label htmlFor="category">Postal Code </Form.Label>
                                    <Form.Control type="number" className="form-control" id="postalCode" placeholder="" required
                                        value={this.state.postalCode}
                                        onChange = {this.onChangepostalCodeHandler}
                                    />
                                </Form.Group>
                                
                        


                                <Form.Group className="mb-3"  required>
                                    <Form.Label htmlFor="unitprice">Address </Form.Label>
                                    <Form.Control type="text" className="form-control" id="address" required
                                        value={this.state.address}
                                        onChange = {this.onChangeaddressHandler}
                                    
                                    />
                                </Form.Group>
                                
                           

                                <Form.Group className="mb-3"  required>
                                    <Form.Label htmlFor="qty">Contact Number</Form.Label>
                                    <Form.Control type="number" className="form-control" id="contactNo" maxLength="10" required
                                        value={this.state.contactNo}
                                        onChange = { this.onChangecontactNoHandler}
                                    />
                                </Form.Group>
                                
                            

                            

            
                                <button type="submit" className="btn btn-primary" style={{marginLeft: "8cm", width: "2cm", background:"#072344"}}>UPDATE</button>
                                <button type="reset" className="btn btn-primary" style={{background:"#059DC0", marginLeft:"0.5cm"}} id = "#">RESET</button>
                                <br/><br/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}