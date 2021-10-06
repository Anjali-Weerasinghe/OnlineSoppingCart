
import React, {Component, useState} from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom'

import { GlobalState } from '../../../../GlobalState'
import Loading from '../../utils/loading/Loading'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const initialState = {
    cardType: '',
    cardNumber: '',
    expMonth:'',
    expYear: '',
    cvn:'',
    cardTypeError:'',
    cardNumberError:'',
    expMonthError:'',
    expYearError:'',
    cvnError:''
    
}



toast.configure()
class AddPayment extends Component {
    constructor(props){
        super(props)

        this.state = initialState;

        this.changecardTypeHandler= this.changecardTypeHandler.bind(this);
        this.changecardNumberHandler= this.changecardNumberHandler.bind(this);
        this.changeexpMonthHandler= this.changeexpMonthHandler.bind(this);
        this.changeexpYearHandler= this.changeexpYearHandler.bind(this);
        this.changecvnHandler= this.changecvnHandler.bind(this);
        

    }
    notify(){
        toast.warn('Payment Added Successfully!', {position: toast.POSITION.TOP_CENTER})

    }

    


    

    validate =()=>{ 
       let cardTypeError = ""; 
       let cardNumberError =  "";
       let expMonthError =  "";
       let expYearError =  "";
       let cvnError =  "";
          

          
          if(!this.state.cardType) {
            cardTypeError ='Name no is Required';
          }
          if(!this.state.cardNumber) {
            cardNumberError='City is Required';
          }
          if(!this.state.expMonth) {
            expMonthError= 'Postal Code is Required';
          }
          if(!this.state.expYear) {
            expYearError= 'Address is Required';
          }
          if(!this.state.cvn) {
            cvnError ='Contact Number is Required';
          }
          
          if (cardTypeError || cardNumberError || expMonthError || expYearError || cvnError ){
              this.setState({cardTypeError , cardNumberError, expMonthError, expYearError, cvnError});
              return false;
          }

          return true;

    };
    
    
    sendData = (e)=>{
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            
        
            const newDelivery ={
                cardType:this.state.cardType,
                cardNumber:this.state.cardNumber,
                expMonth:this.state.expMonth,
                expYear:this.state.expYear,
                cvn:this.state.cvn,
               

            }

            

            // axios.post("http://localhost:5000/delivery/add", newDelivery).then(()=>{
            //     alert("Delivery Added")
            //     this.notify();
            //     this.props.history.push('/addpaymet');

                
            // }).catch((err)=>{
            //     alert(err)
            // })

            this.notify();
            this.props.history.push('/history');

            
        }
        
    };
    changecardTypeHandler = (event) => {
        this.setState({cardType: event.target.value});
    }
    changecardNumberHandler =(event) => {
        this.setState({cardNumber: event.target.value});
    }
    changeexpMonthHandler = (event) => {
        this.setState({expMonth: event.target.value});
    }
    changeexpYearHandler = (event) => {
        this.setState({expYear: event.target.value});
    }
    changecvnHandler = (event) => {
        this.setState({cvn: event.target.value});
    }


    render(){
        return(

            <div className="container" style={{ marginTop: 40 }}>
                <div className="row" className="css">
                    <div className={"col-md-6 offset-md-3 offset-md-3"} style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px" }}>
                        <h3 style={{ background: "#072344", color: "white" }}><center>ADD PAYMENT  DETAILS</center></h3>
                        <div className="card-body" >

                            <form onSubmit={this.sendData} style={{ alignContent: "center" }}>
                                <Form.Group className="mb=3" >
                                    <Form.Label htmlFor="name">Card Type</Form.Label>
                                    <select type="text" className="form-control" id="cardType" name = "cardType" placeholder="" value = {this.state.cardType} 
                                        onChange={
                                            this.changecardTypeHandler
                                        }>
                                                <option value ="CHOOSE">Choose</option>
                                                <option value ="master">Master</option>
                                                <option value ="visa">Visa</option>
                                        
                                        
                                    </select>
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.state.cardTypeError}</div>
                                    
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label htmlFor="city">Card Number</Form.Label>
                                    <Form.Control type="number" className="form-control" id="cardNumber" value = {this.state.cardNumber} maxLength="4" 
                                        onChange={
                                            this.changecardNumberHandler
                                        }
                                        

                                        // onChange={(e) => {
                                        //     setCity(e.target.value);
                                        // }}
                                    />
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.state.cardNumberError}</div>
                                
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label htmlFor="city">Exp Month</Form.Label>
                                    <select type="text" className="form-control" id="expMonth" name = "expMonth" value = {this.state.expMonth} 
                                        onChange={
                                            this.changeexpMonthHandler
                                        }>
                                                <option value = "MONTH">Month</option>
                                                <option value = "January">January</option>
                                                <option value = "February">February</option>
                                                <option value = "March">March</option>
                                                <option value = "April">April</option>
                                                <option value = "May">May</option>
                                                <option value = "June">June</option>
                                                <option value = "July">July</option>
                                                <option value = "August">August</option>
                                                <option value = "September">September</option>
                                                <option value = "October">October</option>
                                                <option value = "November">November</option>
                                                <option value = "December">December</option>

                                        {/* // onChange={(e) => {
                                        //     setCity(e.target.value);
                                        // }} */}
                                    </select>
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.state.expMonthError}</div>
                                
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label htmlFor="postal_code">Exp Year</Form.Label>
                                    <select type="text" className="form-control" id="expYear" placeholder="" value = {this.state.expYear} 
                                        onChange={
                                            this.changeexpYearHandler
                                        }>
                                                <option value = "Year">Year</option>
                                                <option value = "2021">2021</option>
                                                <option value = "2022">2022</option>
                                                <option value = "2023">2023</option>
                                                <option value = "2024">2024</option>
                                                <option value = "2025">2025</option>
                                                <option value = "2026">2026</option>
                                                <option value = "2027">2027</option>
                                                <option value = "2028">2028</option>
                                                <option value = "2029">2039</option>

                                    </select>
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.state.expYearError}</div>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label htmlFor="address">Cvn</Form.Label>
                                    <Form.Control type="number" className="form-control" id="city" placeholder="" value = {this.state.cvn} maxLength="4"
                                        onChange={
                                            this.changecvnHandler
                                        }
                                    />
                                    <div style ={{fontSize:"14px", color:"blue"}}><p>This code is a 3 or 4 digit number printed on the back or front of the credit card. </p></div>
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.state.cvnError}</div>
                                </Form.Group>

                                {/* <Form.Group className="mb-3" controlId="formBasicid">
                                    <Form.Label htmlFor="contactNo">Postal Code</Form.Label>
                                    <Form.Control type="tel" className="form-control" id="postalcode"  value = {this.this.state.postalCode} required
                                        onChange={
                                            this.changepostalCodeHandler
                                        }
                                    />
                                    <div style ={{fontSize:"14px", color:"red"}}>{this.postalCodeError}</div>
                                </Form.Group> */}
                                {/*<h3 style={{background: "#072344", color: "white"}}><center>ADD PAYMENT  DETAILS</center></h3>
                                        <Form.Group className="mb-3" controlId="formBasicid">
                                            <Form.Label htmlFor="contactNo">Card Type</Form.Label>
                                            <select name = "cardType" id="cardType" className ="form-control"  required
                                            onChange = {(e) => {
                                                setcardType(e.target.value);
                                            }}>  
                                            
                                                <option value ="CHOOSE">Choose</option>
                                                <option value ="master">Master</option>
                                                <option value ="visa">Visa</option>
                                                

                                            </select>
                                            {/* <div style ={{fontSize:"14px", color:"red"}}>{this.cardTypeError}</div> */}

                                {/* </Form.Group> 
                                <Form.Group className="mb-3" controlId="formBasicid">
                                            <Form.Label htmlFor="cardNo">Address</Form.Label>
                                            <Form.Control type="number" className="form-control" id="address" value = {this.this.state.address}   required                             
                                            onChange = {
                                                this.changeaddressCodeHandler
                                            }   
                                            />
                                            <div style ={{fontSize:"14px", color:"red"}}>{this.addressError}</div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicid">
                                            <Form.Label htmlFor="cardNo">Contact Number</Form.Label>
                                            <Form.Control type="number" className="form-control" id="contactNo" value = {this.this.state.contactNo}  required                             
                                            onChange = {
                                                this.changecontactNoCodeHandler
                                            }   
                                            />
                                            <div style ={{fontSize:"14px", color:"red"}}>{this.contactNoError}</div>
                                </Form.Group> */}
                                {/* </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicid">
                                            <Form.Label htmlFor="expMonth">Exp Month</Form.Label>
                                            <select name="expMonth" className="form-control" id="expMonth"  required
                                            onChange = {(e) => {
                                                setExpMonth(e.target.value);
                                            }}  
                                            >
                                                <option value = "MONTH">Month</option>
                                                <option value = "January">January</option>
                                                <option value = "February">February</option>
                                                <option value = "March">March</option>
                                                <option value = "April">April</option>
                                                <option value = "May">May</option>
                                                <option value = "June">June</option>
                                                <option value = "July">July</option>
                                                <option value = "August">August</option>
                                                <option value = "September">September</option>
                                                <option value = "October">October</option>
                                                <option value = "November">November</option>
                                                <option value = "December">December</option>

                                            {/* <div style ={{fontSize:"14px", color:"red"}}>{this.expMonthError}</div> */}
                                {/* </select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicid">
                                            <Form.Label htmlFor="expYear">Exp Year</Form.Label>
                                            <select name = "expYear" className="form-control" id="expYear"  required
                                            onChange = {(e) => {
                                                setExpYear(e.target.value);
                                            }}  
                                            >
                                                <option value = "Year">Year</option>
                                                <option value = "MONTH">2021</option>
                                                <option value = "MONTH">2022</option>
                                                <option value = "MONTH">2023</option>
                                                <option value = "MONTH">2024</option>
                                                <option value = "MONTH">2025</option>
                                                <option value = "MONTH">2026</option>
                                                <option value = "MONTH">2027</option>
                                                <option value = "MONTH">2028</option>
                                                <option value = "MONTH">2039</option> */}

                                {/* <div style ={{fontSize:"14px", color:"red"}}>{this.expYearError}</div> */}

                                {/* </select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicid">
                                            <Form.Label htmlFor="cvn">CVN</Form.Label>
                                            <Form.Control type="number" className="form-control" id="cvn" pattern ="[1-9]{10}" maxLength = "04" required 
                                            onChange = {(e) => {
                                                setCVN(e.target.value);
                                            }}   
                                            /> */}
                                {/* <div style ={{fontSize:"14px", color:"red"}}>{this.cvnError}</div> */}
                                {/*</Form.Group> */}




                                <Button variant="primary" type="submit" style={{ marginLeft: 250, background: "#24547c", width: 70 }}>SAVE</Button>
                                <Button variant="primary" type="reset" style={{ marginLeft: 380, marginTop: -63, background: "#24547c", width: 70 }}>RESET</Button>
                            </form>


                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default AddPayment;