import React, {Component} from 'react'
import Menu from '../../img/bars-solid.svg'
import Close from '../../img/times-solid.svg'
import CartIcon from '../../img/shopping-cart-solid.svg'
import {Link} from 'react-router-dom'
import '../css/header.css'
import logo from '../../img/logo.svg'
import {connect} from "react-redux";
import {fetchCart} from '../../action/cartAction'
import CartTimeout from "../route/Cart/CartTimeout";
import {TOKEN} from "../../helper";

class Header extends Component {


    state = {
        opacity: 0,
        visibility: "hidden",
        displayStatus: "block",
        tokenState: false,
        toggle: false,
        cartQuantity: 0
    }

    componentDidMount () {
        this.setCartQuantity();
    }

    setCartQuantity(){
        let cartArray = JSON.parse(localStorage.getItem("cartArray"));
        let tokenTemp = JSON.parse(localStorage.getItem("user"))
        if (cartArray){
            let qty = cartArray.reduce((sum, chair) => sum + parseInt(chair.itemQuantity), 0);
            this.setState({
            cartQuantity: qty
            })
        }
        if (tokenTemp){
            this.setState({
                tokenState:true
            })
        }
        console.log(this.cartQuantity)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.cartItem !== this.props.cartItem){
            let qty = this.props.cartItem?.reduce((sum, chair) => sum + parseInt(chair.itemQuantity), 0);
            this.setState({
            cartQuantity: qty
            })
        }
    }

    logout = () => {
        localStorage.removeItem(TOKEN)
        localStorage.removeItem("user");
        this.setState({
            tokenState: false,
            loginClose:true
        })
    }

    onClickDisplay = () => {
        this.setState({displayStatus: "none"})
    }

    handleLogin = () => {
        this.setState({
            loginClose: !this.state.loginClose
        })
    }


    menuToggle = () => {
        this.setState({toggle: !this.state.toggle})
    }

    render() {
        const {toggle, displayStatus} = this.state
        return (
            <div>
                <div className="shipping_info" style={{display: displayStatus}}>
                    <div className="shipping_info_text">
                        <a href="#">
                            Free Shipping on Performance Seating
                        </a>
                    </div>
                    <div className="shipping_info_close" onClick={this.onClickDisplay}>
                    <span>
                        <i className="fas fa-times"></i>
                    </span>
                    </div>
                </div>
                <div className="login_bar">
                    <div className="login_bar_l">
                        <div>
                            <Link to="/">Store</Link>
                        </div>
                        <div>
                            <a href="#">Contract</a>
                        </div>
                    </div>
                    <div className="login_bar_m">
                        <div>
                            <a href="#">Customer Service</a>
                        </div>
                        <div>
                            <a href="#">888 798 0202</a>
                        </div>


                    </div>
                    <div className="login_bar_r">
                        <div className="my_account">
                            {this.state.tokenState === true ?
                                <div>
                                    <span onClick={()=>this.handleLogin()}>Mark2Win </span>
                                    <i className="fas fa-user"></i>
                                    <div className={this.state.loginClose ? "login_show": "login_hide"}>
                                        <Link to="/login" onClick={this.logout} >
                                            Sign out
                                        </Link>
                                    </div>
                                </div>
                                :
                                <div>
                                    <span onClick={()=>this.handleLogin()}>My Account </span>
                                    <i className="fas fa-user"></i>
                                    <div className={this.state.loginClose ? "login_show": "login_hide"}>
                                        <Link to="/login">
                                            Login
                                        </Link>
                                    </div>

                                </div>

                            }


                        </div>
                        <div className="shopping_cart">
                            <Link className={this.state.cartQuantity > 0 ? "show_cart_timeout" : "hide_cart_timeout"}
                                  to="/cart">Cart: <b>{this.state.cartQuantity}</b> &nbsp;
                                <i className="fas fa-shopping-cart"></i>
                                <span>
                                        <CartTimeout cartQuantity={this.state.cartQuantity}></CartTimeout>
                                    </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <header className="header">
                    <div className="menu" onClick={this.menuToggle}>
                        <img src={Menu} alt="" width="20"/>
                    </div>
                    <div className="header_logo">
                        <a href="/">
                            <img src={logo} alt="" />
                        </a>
                    </div>
                    <div className="navbar_route">
                        <div className={toggle ? "toggle" : ""}>
                            <Link to="/new">New</Link>
                            <Link to="/office">Office</Link>
                            <Link to="/dining">Dining</Link>
                            <Link to="/bedroom">Bedroom</Link>
                            <Link to="/outdoor">Outdoor</Link>
                            <Link to="/lighting">Lighting</Link>
                            <Link to="/accessories">Accessories</Link>
                            <Link to="/gaming">Gaming</Link>
                            <div className="close" onClick={this.menuToggle}>
                                <img src={Close} alt="" width="20"/>
                            </div>
                        </div>
                    </div>
                    <div className="navbar_search">
                        <form>
                            <input type="text" name="search" placeholder="Search.." />
                        </form>
                    </div>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('state from cart', state.cartReducer.cartItem)
    return {
        cartItem: state.cartReducer.cartItem,
    }
};



export default connect(mapStateToProps, {fetchCart})(Header)
