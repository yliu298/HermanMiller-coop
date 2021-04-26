import React, {Component} from 'react'
import CartDisplay from "./CartDisplay";
import {connect} from "react-redux";
import {actCreateOrder} from "../../../action/paymentAction";
import {fetchCart} from "../../../action/cartAction";
import {TOKEN} from "../../../helper";


class Cart extends React.Component {

    state = {
        refresh: false
    }

    componentDidUpdate(prevProps, prevState,snapshot) {
        if (prevProps.backToPage !== this.props.backToPage){
            this.props.fetchCart();
            this.setState({
                refresh: !this.state.refresh
            })
        }
        if (prevProps.reLogin !== this.props.reLogin){
            this.props.history.push('/login')
        }
    }

    checkout = () =>{
        console.log(this.props.cartArr)
        if (localStorage.getItem(TOKEN)){
            this.props.actCreateOrder(this.props.cartArr)
        }else {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div>
                <CartDisplay checkOut={this.checkout}/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    console.log(state)
    return {
        cartArr: state.cartReducer.cartItem,
        backToPage: state.paymentReducer.backToPage,
        reLogin: state.orderReducer.reLogin
    }
}

const mapDispatchToProps = {
    fetchCart,
    actCreateOrder
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
