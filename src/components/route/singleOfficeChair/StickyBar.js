import React, {Component} from "react";
import {connect} from "react-redux";
import {addToCart} from "../../../action/cartAction";
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from "react-bootstrap";

class StickyBar extends Component{
    state = {
        itemQuantity:1,
        open: false
    }

    displayTotalAmount(price, itemPrice){
        let totalAmount = 0;
        itemPrice.forEach(item=>totalAmount+=parseFloat(item));
        totalAmount = (parseFloat(price) + totalAmount).toFixed(2)
        return(
            <div>
                <div>
                    <span>C${totalAmount}</span>
                </div>
            </div>
        )
    }

    handleChange = (e) =>{
        this.setState({itemQuantity:e.target.value})
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open:false
        })
    };

    submitToCart = (buildedChair, price, itemPrice, itemQuantity,checkedItemIndex) =>{
        let priceTemp = parseFloat(price);
        itemPrice.forEach(p => priceTemp += parseFloat(p));
        priceTemp = priceTemp.toFixed(2)
        console.log('addtocart object',{buildedChair, priceTemp, itemQuantity, checkedItemIndex});
        this.props.addToCart({buildedChair, priceTemp, itemQuantity, checkedItemIndex});
        this.setState({
            open:true
        })
    }



    render() {
        const{name, price, state} = this.props;
        const{checkedItemIndex, itemPrice, buildedChair} = state;
        const{itemQuantity} = this.state;

        return (
            <div>
                <div className="total_info" id="sticky_bar">
                    <div className="info_left">
                        <h3>{name}</h3>
                    </div>
                    <div className="info_right">
                        <div className="info_shipping"><p>Ready to ship in 2 weeks</p></div>
                        <div className="info_amount">{this.displayTotalAmount(price, itemPrice)}</div>
                        <input type="number" className="info_quantity" id="quantity_type" value={itemQuantity} onChange={this.handleChange}
                        />
                        <button className="add_to_cart"
                                onClick={e => this.submitToCart(buildedChair, price, itemPrice, itemQuantity,checkedItemIndex)}>
                            Add To Cart
                        </button>
                        <Snackbar className="snackbar" open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                            <Alert className="snackbar_alert" onClose={this.handleClose} severity="success">
                                {name} has been added to cart successfully!
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = {
    addToCart
}

export default connect(mapStateToProps,mapDispatchToProps)(StickyBar)