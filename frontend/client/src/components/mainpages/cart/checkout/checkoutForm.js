import React, {Component} from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom'

import { GlobalState } from '../../../../GlobalState'
import Loading from '../../utils/loading/Loading'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const initialState = {
    userName: localStorage.getItem('mail'),
    orderID: localStorage.getItem('orderID'),
    total: localStorage.getItem('total'),
    name:'',
    city:'',
    postalCode:'',
    address:'',
    contactNo:'',
    nameError:'',
    cityError:'',
    postalCodeError:'',
    addressError:'',
    contactNoError:''
    
}



toast.configure()
class AddDelivery extends Component {
    constructor(props){
        super(props)

        this.state = initialState;

        this.changeuserNameHandler= this.changeuserNameHandler.bind(this);
        this.changeorderIDHandler= this.changeorderIDHandler.bind(this);
        this.changetotalHandler= this.changetotalHandler.bind(this);
        this.changenameHandler= this.changenameHandler.bind(this);
        this.changecityHandler= this.changecityHandler.bind(this);
        this.changepostalCodeHandler= this.changepostalCodeHandler.bind(this);
        this.changeaddressHandler= this.changeaddressHandler.bind(this);
        this.changecontactNoHandler= this.changecontactNoHandler.bind(this);
        

    }
    notify(){
        toast.warn('Delivery Added Successfully!', {position: toast.POSITION.TOP_CENTER})

    }

    


    

    validate =()=>{ 
       let nameError = "";
       let cityError =  "";
       let postalCodeError =  "";
       let addressError =  "";
       let contactNoError =  "";
          

          
          if(!this.state.name) {
            nameError ='Name no is Required';
          }
          if(!this.state.city) {
            cityError='City is Required';
          }
          if(!this.state.postalCode) {
            postalCodeError= 'Postal Code is Required';
          }
          if(!this.state.address) {
            addressError= 'Address is Required';
          }
          if(!this.state.contactNo) {
            contactNoError ='Contact Number is Required';
          }
          
          if (nameError || cityError || postalCodeError || addressError || contactNoError ){
              this.setState({nameError , cityError, postalCodeError, addressError, contactNoError});
              return false;
          }

          return true;

    };
    
    
    sendData = (e)=>{
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            
        
            const newDelivery ={
                userName:this.state.userName,
                orderID:this.state.orderID,
                total:this.state.total,
                name:this.state.name,
                city:this.state.city,
                postalCode:this.state.postalCode,
                address:this.state.address,
                contactNo:this.state.contactNo

            }

            

            axios.post("http://localhost:5000/delivery/add", newDelivery).then(()=>{
                alert("Delivery Added")
                this.notify();
                this.props.history.push('/addpayment');

                
            }).catch((err)=>{
                alert(err)
            })

            
        }
        
    };
    changeuserNameHandler = (event) => {
        this.setState({userName: event.target.value});
    }
    changeorderIDHandler = (event) => {
        this.setState({orderID: event.target.value});
    }
    changetotalHandler = (event) => {
        this.setState({total: event.target.value});
    }
    changenameHandler = (event) => {
        this.setState({name: event.target.value});
    }
    changecityHandler =(event) => {
        this.setState({city: event.target.value});
    }
    changepostalCodeHandler = (event) => {
        this.setState({postalCode: event.target.value});
    }
    changeaddressHandler = (event) => {
        this.setState({address: event.target.value});
    }
    changecontactNoHandler = (event) => {
        this.setState({contactNo: event.target.value});
    }


    render(){
        return(

            <div className="container" style={{ marginTop: 40 }}>
                <div className="row" className="css">
                    <div className={"col-md-6 offset-md-3 offset-md-3"} style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px" }}>
                        <h3 style={{ background: "#072344", color: "white" }}><center>ADD DELIVERY  DETAILS</center></h3>
                        <div className="card-body" >

                            <form onSubmit={this.sendData} style={{ alignContent: "center" }}>
                                <div className="form-group" >
                                    <label htmlFor="name">Username</label>
                                    <input type="text" className="form-control" id="userName" placeholder="" readOnly
                                        // onChange={
                                        //     this.changeuserNameHandler
                                        // }
        
                                        defaultValue={localStorage.getItem('mail')}
                                        
                                    />
                                    
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="city">OrderID</Form.Label>
                                    <Form.Control type="text" className="form-control" id="orderID" readOnly
                                        // onChange={
                                        //     this.changeorderIDHandler
                                        // }
                                        defaultValue={localStorage.getItem('orderID')}

                                        // onChange={(e) => {
                                        //     setCity(e.target.value);
                                        // }}
                                    />
                                
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label htmlFor="city">Total Payment</Form.Label>
                                    <Form.Control type="number" className="form-control" id="total" readOnly
                                        // onChange={
                                        //     this.changetotalHandler
                                        // }
                                        defaultValue={localStorage.getItem('total')}

                                        // onChange={(e) => {
                                        //     setCity(e.target.value);
                                        // }}
                                    />
                                
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label htmlFor="postal_code">Name</Form.Label>
                                    <Form.Control type="text" className="form-control" id="name" placeholder="" value = {this.state.name} 
                                        onChange={
                                            this.changenameHandler
                                        }
                                    />
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.state.nameError}</div>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" >
                                    <Form.Label htmlFor="address">City</Form.Label>
                                    <Form.Control type="text" className="form-control" id="city" placeholder="" value = {this.state.city} 
                                        onChange={
                                            this.changecityHandler
                                        }
                                    />
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.state.cityError}</div>    
                                </Form.Group>
                                
                                <Form.Group className="mb-3" >
                                    <Form.Label htmlFor="contactNo">Postal Code</Form.Label>
                                    <Form.Control  type="number" className="form-control" id="postalCode"  value = {this.state.postalCode}    

                                        onChange={
                                            this.changepostalCodeHandler
                                        }
                                    />
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.state.postalCodeError}</div>
                                </Form.Group>
                                
                                

                                
                                <div className="mb-3" >
                                    <label htmlFor="address" >Address</label>
                                    <input type="text" className="form-control" id="address" value = {this.state.address} style={{width:"10"}}                              
                                        onChange = {
                                            this.changeaddressHandler
                                        }   
                                    />
                                     <div style ={{fontSize:"14px", color:"red"}}>{this.state.addressError}</div>       
                                </div>
                                
                                <div className="mb-3" >
                                    <Form.Label htmlFor="cardNo">Contact Number</Form.Label>
                                    <input type="tel" className="form-control" id="contactNo" value = {this.state.contactNo} pattern ="[0-9]{10}" maxLength="10"                              
                                        onChange = {
                                            this.changecontactNoHandler
                                        }   
                                    />
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.state.contactNoError}</div>      
                                </div>
                                
                                
                                




                                <Button variant="primary" type="reset" style={{ marginLeft: 250, background: "#24547c", width: 70,  }}>RESET</Button>
                                <Button variant="primary" type="submit" style={{ marginLeft: 400, marginTop: -63, background: "#24547c", width: 70 }}>SAVE</Button>
                            </form>


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default AddDelivery;
