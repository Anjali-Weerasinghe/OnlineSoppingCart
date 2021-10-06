import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Card, Form, Button, Container } from 'react-bootstrap';
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()

    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }


    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    // const tranSuccess = async (payment) => {
    //     const { paymentID, address } = payment;

    //     await axios.post('/api/payment', { cart, paymentID, address }, {
    //         headers: { Authorization: token }
    //     })

    //     setCart([])
    //     addToCart([])
    //     alert("You have successfully placed an order.")
    // }


    async function checkout(cart) {
        let result;
        let oredrId = new Date().toString();
        localStorage.setItem('data', JSON.stringify(cart));
        localStorage.setItem('total', total);
        localStorage.setItem('orderID', oredrId);
        await (cart.forEach(async name => {
            name.mail = localStorage.getItem('mail');
            name.oredrId = oredrId;
            result = await savedData(name)
            
        }))
        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")

        window.location = "/checkout"
    }

    async function savedData(data) {
        const result = await (await axios.post("http://localhost:5000/cartItem/", data)).status
        return result;
        
    }


    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>LKR {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>

                            <div className="delete"
                                onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: LKR {total}</h3>
                {/* <PaypalButton
                total={total}
                tranSuccess={tranSuccess} /> */}
                <button style={{background:"darkblue", marginTop:"-8px"}} type="button" class="btn btn-secondary" onClick={(e) => { checkout(cart) }}>Checkout</button>
            </div>
        </div>
    )
}

export default Cart
