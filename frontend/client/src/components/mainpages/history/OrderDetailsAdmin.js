import React, {useState, useEffect, useContext, Component} from 'react'
import {useParams} from 'react-router-dom'
import { Card, Form, Button, Container } from 'react-bootstrap';
import {GlobalState} from '../../../GlobalState'

import axios from 'axios';

export default class ViewDelivery1 extends Component {

    constructor(props) {
        super(props);
        this.state = {saved_items: [], searchId:''};

        // this.state = {

        //     // product_id:'',
        //     // content:'',
        //     // price:'',
        //     // quantity:'',
        //     // image:''
            

        // };

    }

    componentDidMount(){
        axios.get('http://localhost:5000/cartItem/get/' + this.props.match.params.id)
            .then(response =>{
                this.setState({

                    saved_items: response.data

                })
            })
            .catch(function(error){
                console.log(error)
            });
    }
    searchCartItems(event){
        this.setState({ searchId: event.target.value.substr(0,
            20)});
    }

    
    render() {
        let filterproduct_id = this.state.saved_items.filter((
            saved_item)=>{
                return saved_item.name.indexOf(this.state.
                    searchId)!==-1;
            }
        );
        console.log(this.state.saved_items);

        return(
            
            <div>
                <div className="history-page">
                    {/* <a className="btn btn-success" href="/pdfGenerate" style={{marginTop: "5px", marginLeft: "5px"}}>
                        <i className="fa fa-file-o"></i>&nbsp;Generate PDF
                    </a> */}
                    <input className="form-control" type="search" placeholder="Search.." name="searchQuery" style= {{width:"7cm", marginLeft:"33.5cm", marginTop:"-1cm"}} onChange={this.searchCartItems.bind(this)} />
                    <div >
                        
                        <h4>Order Details</h4>
                    </div>
                </div>
                <table  id="pdfdiv" style={{marginTop:20, fontSize:"14px", backgroundColor: "white"}}>
                    <thead>
                        <tr>

                            <th>#</th>
                            <th>Product_id</th>
                            <th>Content</th>
                            <th>Price</th>
                            <th>quantity</th>
                            <th>Image</th>
                            
                            
                        
                        </tr>
                    </thead>
                    <tbody>
                        {filterproduct_id.map((p, index)=>{
                            return <tr key={index}>
                                <td>
                                    <a href={`/cartItem/${p._id}`} style={{textDecoration:"none"}}>
                                        {index+1}
                                    </a> 
                                </td>
                                <td>{p.product_id}</td>       
                                <td>{p.content}</td>
                                <td>{p.price}</td>
                                <td>{p.quantity}</td>
                                <td>{p.image.url}</td>
                                
                                

                                {/* <td>
                                    <a className="btn btn-warning" href={`/deliveryupdate/${p._id}`}>
                                        &nbsp;Edit
                                    </a>
                                    &nbsp;
                                    <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(p._id)}>
                                        &nbsp;Delete
                                    </a>
                                    <a className="btn btn-danger" href={`/viewdeliverydetail/${p.orderID}`}>
                                        &nbsp;View
                                    </a>
                                </td> */}


                            </tr>
                        })}
                    </tbody>

                </table>
                <Button variant="primary" type="submit" style={{ marginLeft: 250, background: "#24547c", width: 120 }}>Deliver Order</Button>
            </div>
        );
    }
}