import React, {Component} from "react";
import '../css/footer.css'
import logo from '../../img/logo-footer.svg'

class Footer extends Component {
    render() {
        return(
            <div className="footer_container">
                <div className="footer">
                    <div className="footer_left">
                        <div className="footer_logo">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="customer_service">
                            <ul>
                                <li><span><strong>Customer Service</strong></span></li>
                                <li><a href="#">Catalog Opt Out</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Returns</a></li>
                                <li><a href="#">Shipping and Delivery</a></li>
                                <li><a href="#">Warranty and service</a></li>
                                <li><a href="#">Assembly Instructions</a></li>
                                <li><a href="#">Care and Maintenance</a></li>
                                <li><a href="#">Site FeedBack</a></li>
                                <li><a href="#">Track Your Order</a></li>
                                <li><a href="#">Nelson Product Recall</a></li>
                            </ul>
                        </div>
                        <div className="customer_service">
                            <ul>
                                <li><span><strong>Locations</strong></span></li>
                                <li><a href="#">Find a Retailer</a></li>
                                <li><a href="#">Our New York Store</a></li>
                                <li><a href="#">Our Century City Store</a></li>
                            </ul>
                        </div>
                        <div className="customer_service">
                            <ul>
                                <li><span><strong>About Herman Miller</strong></span></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Our Designers</a></li>
                                <li><a href="#">careers</a></li>
                                <li><a href="#">Accessibility Statement</a></li>
                                <li><a href="#">Term of Sale</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer_right">
                        <div>
                            <div>
                                <span><strong>Join our malling list</strong></span>
                            </div>
                            <input type="" placeholder="Enter your email"/>
                            <input type="submit" value="Subscribe" className="email_input"/>
                        </div>
                        <div>
                            <div>
                                <span><strong>Follow Us</strong></span>
                            </div>
                            <ul className="social-icons">
                                <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
                                <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="copyright-text">
                        Copyright &copy; 2021 All Rights Reserved by Mark2Win 40_coop
                    </p>
                </div>
            </div>

        )
    }
}

export default Footer