import React, {Component} from "react";
import {connect} from "react-redux";
import {cartChangeQty, cartDelItem, fetchCart} from "../../../action/cartAction";
import {Link} from "react-router-dom";
import '../../css/cart.css'
import {actCreateOrder, actPayment} from "../../../action/paymentAction";
import checkout from "../../../img/Disk-1s-200px.svg"
import Payment from "../payment/Payment";


class CartDisplay extends Component{

    componentDidMount() {
        this.props.fetchCart();
    }

    onClick = (cartArray,index) => {
        cartArray.splice(index,1);
        this.props.cartDelItem(cartArray);
    }

    onChange = (index, qty) => {
        console.log(qty)
        this.props.cartChangeQty(index, qty)
    }



    showingCart = (cartArray) => {
        if (cartArray){
            console.log('cartArray',cartArray);
            let chairDisplay = cartArray.map((chair,index)=>{
                let chairImg = chair.buildedChair.media.split("|")[0];
                let configCategories = chair.buildedChair.profileCategories.map((profileC, indexC)=>{
                    let items = profileC.profileItems.map((profileI, indexI)=>{
                        if(profileI.checked){
                            return(
                                <div key={indexI}>{profileC.name}: {profileI.name}</div>
                            )
                        }
                    })
                    return items;
                })
                const selectArray = [1,2,3,4,5,6,7,8,9,10];
                let selectQuantity = selectArray.map((num, index)=> {
                    return <option value={num} key={index}>{num}</option>
                })
                return(
                    <tr key={index} className="table_row">
                        <td className="cart_img">
                            <img src={chairImg} alt=""/>
                        </td>
                        <td className="cart_details">
                            <div>
                                <div style={{fontWeight: "700"}}>
                                    {chair.buildedChair.name}
                                </div>
                                {configCategories}
                                <ul>
                                    <li className="cart_edit"><a href={`/office/${chair.buildedChair.id}`}>Edit Item</a></li>
                                    <li className="cart_remove">
                                        <div onClick={()=> this.onClick(cartArray, index)}>
                                            Remove Item
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </td>
                        <td className="item_stock">In Stock</td>
                        <td className="item_totalPrice">C${chair.priceTemp}</td>
                        <td className="item_quantity">
                            <select defaultValue={chair.itemQuantity} onChange={e=> this.onChange(index, e.target.value)}>
                                {selectQuantity}
                            </select>
                        </td>
                        <td>
                            C${(parseFloat(chair.priceTemp)*parseInt(chair.itemQuantity)).toFixed(2)}
                        </td>
                    </tr>
                )
            })
            return chairDisplay;
        }else{
            return (
                <div>loading...</div>
            )
        }

    }

    render() {
        const {cartArray} = this.props;
        let total = 0
        let estimatedTax = 0
        let fedEx = 0
        let estimatedTotal = 0

        if (cartArray) {
            total = cartArray.reduce((a, b) => a + parseFloat(b.priceTemp) * b.itemQuantity, 0);
            estimatedTax = total * 0.13;
            fedEx = total * 0.08;
            estimatedTotal = total + estimatedTax + fedEx;
        }

        return (
            <div className="cart">
                <h1>My Cart</h1>
                {cartArray ?
                    <div>
                        <fieldset>
                            <table className="cart_table">
                                <thead>
                                <tr>
                                    <th scope="col">Product Information</th>
                                    <th scope="col"></th>
                                    <th scope="col">Availability</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.showingCart(cartArray)}
                                </tbody>
                            </table>
                        </fieldset>
                        <div className="cart_footer">
                            <div className="guarantee_descrip">
                                <h4>100% Satisfaction Guarantee</h4>
                                <p>
                                    If you are not 100% satisfied with your purchase from the
                                    Herman Miller Store, you can return your order to us for an
                                    exchange or a full refund within 30 days of delivery.
                                    Yes, a full refund, meaning we'll give you all your money back
                                    for the product, shipping, and tax. If for whatever reason
                                    you're not happy with your purchase, contact our Customer
                                    Engagement team to arrange for your return or exchange.
                                </p>
                            </div>
                            <div className="checkout_info">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Subtotal:</td>
                                        <td>C$ {parseFloat(total).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Estimated Tax:</td>
                                        <td>C$ {parseFloat(estimatedTax).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Delivery: FedEx</td>
                                        <td>C$ {parseFloat(fedEx).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Estimated Total:</td>
                                        <td>C$ {parseFloat(estimatedTotal).toFixed(2)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="empty_cart">
                        <div>
                            <h2>Your cart is empty, but it doesn’t have to be.</h2>
                            <Link to="/">Continue Shopping</Link>
                        </div>
                    </div>
                }
                {cartArray === null || cartArray ===[] ?
                    "" : <div className="checkoutBtn">
                        {this.props.orderStatus === false ?
                            <button onClick={() => this.props.checkOut()}>
                                {this.props.loading === true ?
                                    <img style={{width: 40}} src={checkout} alt=""/> : "Checkout"}
                            </button>
                            : <Payment> </Payment>
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state',state)
    return {
        cartArray: state.cartReducer.cartItem,
        orderStatus: state.orderReducer.orderStatus,
        loading: state.orderReducer.loading,
        backToPage: state.paymentReducer.backToPage,
        reLogin: state.orderReducer.reLogin
    }
};

const mapDispatchToProps = {
    fetchCart,
    cartDelItem,
    cartChangeQty,
    actPayment,
    actCreateOrder
};

export default connect(mapStateToProps,mapDispatchToProps)(CartDisplay)