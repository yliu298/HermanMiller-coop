import React,{Component} from 'react'

class CartTimeout extends Component{

    state = {
        cart:[],
        cartQuantity: 0
    }

    componentDidMount() {
        this.setState({cartQuantity:this.props.cartQuantity})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cartQuantity !== prevProps.cartQuantity){
            if (JSON.parse(localStorage.getItem("cartArray")) !== null){
                this.setState({
                    cartQuantity:this.props.cartQuantity,
                    cart: JSON.parse(localStorage.getItem("cartArray"))
                })
            }else{
                this.setState({
                    cartQuantity:this.props.cartQuantity,
                    cart: []
                })
            }

        }
    }

    checkCart = () =>{

        console.log("cart in cart", this.state.cart)
    }

    render() {
        if (this.state.cart.length === 0){
            return (
                <div className="cart_timeout_wrapper">
                    You Cart is empty {this.state.cartQuantity}
                </div>
            )
        }
        return(
            <div className="cart_timeout_wrapper">
                <h2>Cart Contents </h2>
                {this.state.cart.map((chair,index) => {
                    return(
                        <div className="single_cart" key={index}>
                            <div className="mini_car_image">
                                <img src={chair.buildedChair.media.split("|\n")[0]}></img>
                            </div>
                            <div className="mini_cart_info">
                                <div>Product:&nbsp;{chair.buildedChair.name}</div>
                                <div>Price:&nbsp; ${chair.priceTemp}</div>
                                <div>Quantity:&nbsp;{chair.itemQuantity}</div>
                            </div>

                        </div>
                    )
                })}
            </div>
        )
    }
}

export default CartTimeout;
