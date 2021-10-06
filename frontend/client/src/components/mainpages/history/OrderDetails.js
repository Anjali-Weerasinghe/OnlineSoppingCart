import React, {useState, useEffect, useContext, Component} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

import axios from 'axios';

export default class ViewDelivery extends Component {

    constructor(props) {
        super(props);
        //this.state = {saved_items: {}};

        this.state = {

            _id:'',
            orderID:'',
            product_id:'',
            content:'',
            price:'',
            quantity:'',
            //images:''
            

        };

    }

    componentDidMount(){
        axios.get('http://localhost:5000/cartItem/' +this.props.match.params.id)
            .then(response =>{
                this.setState({

                    //saved_items: response.data
                    _id:response.data.cartItem._id,
                    orderID:response.data.cartItem.oredrId,
                    product_id:response.data.cartItem.product_id,
                    content:response.data.cartItem.content,
                    price:response.data.cartItem.price,
                    quantity:response.data.cartItem.quantity
                    //images:response.data.saved_item.images

                })
            })
            .catch(function(error){
                console.log(error)
            });
    }
    // searchCartItems(event){
    //     this.setState({ searchId: event.target.value.substr(0,
    //         20)});
    // }

    
//     render() {
//         // let filterproduct_id = this.state.saved_items.filter((
//         //     saved_item)=>{
//         //         return saved_item.name.indexOf(this.state.
//         //             searchId)!==-1;
//         //     }
//         // );
//         console.log(this.state.saved_items);

//         return(
            
//             <div>
//                 <div className="history-page">
//                     {/* <a className="btn btn-success" href="/pdfGenerate" style={{marginTop: "5px", marginLeft: "5px"}}>
//                         <i className="fa fa-file-o"></i>&nbsp;Generate PDF
//                     </a> */}
//                     <input className="form-control" type="search" placeholder="Search.." name="searchQuery" style= {{width:"7cm", marginLeft:"33.5cm", marginTop:"-1cm"}} onChange={this.searchCartItems.bind(this)} />
//                     <div >
                        
//                         <h4>Order Details</h4>
//                     </div>
//                 </div>
//                 <table  id="pdfdiv" style={{marginTop:20, fontSize:"14px", backgroundColor: "white"}}>
//                     <thead>
//                         <tr>

//                             <th>#</th>
//                             <th>OrderID</th>
//                             <th>Product_id</th>
//                             <th>Content</th>
//                             <th>Price</th>
//                             <th>quantity</th>
//                             <th>Image</th>
                            
                            
                        
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.saved_items.map((p, index)=>{
//                             return <tr key={index}>
//                                 <td>
//                                     <a href={`/cartItem/${p._id}`} style={{textDecoration:"none"}}>
//                                         {index+1}
//                                     </a> 
//                                 </td>
//                                 <td>{p.product_id}</td>       
//                                 <td>{p.content}</td>
//                                 <td>{p.price}</td>
//                                 <td>{p.quantity}</td>
//                                 <td>{p.image.url}</td>
                                
                                

//                                 {/* <td>
//                                     <a className="btn btn-warning" href={`/deliveryupdate/${p._id}`}>
//                                         &nbsp;Edit
//                                     </a>
//                                     &nbsp;
//                                     <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(p._id)}>
//                                         &nbsp;Delete
//                                     </a>
//                                     <a className="btn btn-danger" href={`/viewdeliverydetail/${p.orderID}`}>
//                                         &nbsp;View
//                                     </a>
//                                 </td> */}


//                             </tr>
//                         })}
//                     </tbody>

//                 </table>
//             </div>
//         );
//     }
// }
    render() {
        return(
            <div className="box2">
            <div className="container" style={{marginTop:"3cm",width:"20cm",border: "1px solid black",marginBottom:"2cm", background: "rgba(255,255,255,0.838)", fontSize:"13px", borderRadius:"10px",float:"center"}}>
            <br/>
            <form>

            <h2 style={{'textAlign':'center'}}>
                        Product Details
                    </h2>

                    
                    <div className="form-group" required>
                        <label htmlFor="name"><b>ID</b></label>
                        <div>{this.state._id}</div>
                        
                    </div>
                    <div className="form-group" required>
                        <label htmlFor="name"><b>Order ID</b></label>
                        <div>{this.state.orderID}</div>
                        
                    </div>

                    <div className="form-group" required>
                        <label htmlFor="itemname"><b>Product_ID</b></label>
                        <div>{this.state.product_id}</div>
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="category"><b>Content</b> </label>
                        <div>{this.state.content} </div>
                        
                        
                    
                    </div>


                    <div className="form-group" required>
                        <label htmlFor="unitprice"><b>Price</b> </label>
                        <div>{this.state.price}</div>
                            
                    </div>

                    <div className="form-group" required>
                        <label htmlFor="qty"><b>Quantity</b></label>
                        <div>{this.state.quantity}</div>
                        
                    </div>
                    {/* <div className="form-group" required>
                        <label htmlFor="qty"><b>Images</b></label>
                        <div>{this.state.images}</div>
                        
                    </div> */}

                    


                
            
            </form>
            </div>
            </div>
        )
    }

}
