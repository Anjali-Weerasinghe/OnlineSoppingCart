import React, {Component} from 'react';
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';

export default class allDeliveries extends Component {

    constructor(props){
        super(props);
        this.state = {deliveries: [], searchId:''};
        
    }

    componentDidMount(){
        axios.get('http://localhost:5000/delivery/').then(response=>{
            this.setState({deliveries: response.data})
        }).catch(function (error){
            console.log(error);
        })
    }

   

    onDelete=(id) =>{
        var confirmtext;
        if(window.confirm("Are You Sure Want to Delete !")){
            axios.delete(`http://localhost:5000/delivery/delete/${id}`).then(res=>{
                this.setState({deliveries: this.state.deliveries.filter(delivery => delivery._id !== id)});
                confirmtext = "You Successfully delete attendance";
                
            });
        }
        else{
            confirmtext = "You pressed cancel Try again";
        }

        
    }
    searchDeliveryName(event){
        this.setState({ searchId: event.target.value.substr(0,
            20)});
    }

    printDocument() {  
        const input = document.getElementById('pdfdiv');  
        html2canvas(input)  
          .then((canvas) => {  
            var imgWidth = 200;  
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight);  
            pdf.save("download.pdf");  
          });  
    }

    


    

    render(){
        

        let filtername = this.state.deliveries.filter((
            delivery)=>{
                return delivery.name.indexOf(this.state.
                    searchId)!==-1;
            }
        );
        console.log(this.state.deliveries);

        return (
            <div>
                <div className="history-page">
                <input className="form-control" type="search" placeholder="Search.." name="searchQuery" style= {{width:"7cm", marginLeft:"24cm", marginTop:"0.2cm"}} onChange={this.searchDeliveryName.bind(this)} />
                    <div style={{marginTop:"-1cm"}}>
                        <h2>History</h2>
                        <h4>Your Orders</h4>
                        
                    </div>
                    <a className="btn btn-secondary" onClick={() =>this.printDocument()} style={{marginTop: "-6.5cm", marginLeft: "5px", background:"#24547c", color:"white"}}>
                        <i className="fa fa-file-o"></i>&nbsp;Generate PDF
                        </a>
                    
                </div>
                        
                <table  id="pdfdiv" style={{marginTop:"-0.5cm", fontSize:"14px",  backgroundColor: "white", float:"center", marginRight:"2cm"}}>
                    <thead>
                        <tr>

                            <th>#</th>
                            <th>UserID</th>
                            <th>OrderID</th>
                            <th>Total Payment</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Postal Code</th>
                            <th>Address</th>
                            <th>Contact Number</th>
                            
                            
                        
                        </tr>
                    </thead>
                    <tbody>
                        {filtername.map((p, index)=>{
                            return <tr key={index}>
                                <td>
                                    <a href={`/delivery/${p._id}`} style={{textDecoration:"none"}}>
                                        {index+1}
                                    </a> 
                                </td>
                                <td>{p.userName}</td>       
                                <td>{p.orderID}</td>
                                <td>{p.total}</td>
                                <td>{p.name}</td>
                                <td>{p.city}</td>
                                <td>{p.postalCode}</td>
                                <td>{p.address}</td>
                                <td>{p.contactNo}</td>
                                

                                {/* <td>
                                    <a style = {{background:"#072344", color:"white"}}className="btn btn-secondary" href={`/deliveryupdate/${p._id}`}>
                                        &nbsp;Edit
                                    </a>
                                    &nbsp;
                                    <a style = {{background:"#059DC0"}} className="btn btn-secondary" href="#" onClick={() =>this.onDelete(p._id)}>
                                        &nbsp;Delete
                                    </a>
                                    <a style ={{marginLeft:"0.1cm",background:"#24547c"}}className="btn btn-secondary" href={`/history/${p.orderID}`}>
                                        &nbsp;View
                                    </a>
                                </td> */}


                            </tr>
                        })}
                    </tbody>

                </table>
            </div>
        );
    }
}