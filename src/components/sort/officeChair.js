import React, {Component} from "react";
import {connect} from "react-redux"
import {actFetchOfficeChair, actSelectChair} from "../../action/chairAction";

class OfficeChair extends Component {

    state = {
        priceClose: true,
        materialClose: true,
        blockStatus: false
    }

    handlePrice = () => {
        this.setState({
            priceClose: !this.state.priceClose,
        })
    }

    handleMaterial = () => {
        this.setState({
            materialClose: !this.state.materialClose,
        })
    }

    onClick = () => {
        const blockStatus = this.state.blockStatus;
        this.setState({blockStatus: !blockStatus})
        this.props.handleClick()
    }

    render() {
        const {priceClose, materialClose} = this.state
        return (
            <div>
            <div className="filter_container">
                <div className="filter_product">
                        <span className="filter_product_item">Price &nbsp;&nbsp;
                            <i className="fas fa-angle-down" onClick={() => this.handlePrice()}></i>
                                <ul className={priceClose ? "content_hide" : "content_show"}>
                                <li className="content_li">
                                    <input type="checkbox" className="content_li_input"/>
                                    <span>$500 or less</span>
                                </li>
                                <li className="content_li">
                                    <input type="checkbox" className="content_li_input"/>
                                    <span>$500 or $1000</span>
                                </li>
                                <li className="content_li">
                                    <input type="checkbox" className="content_li_input"/>
                                    <span>$1000 or $2000</span>
                                </li>
                                <li className="content_li">
                                    <input type="checkbox" className="content_li_input"/>
                                    <span>$2000 or $3000</span>
                                </li>
                                <li className="content_li">
                                    <input type="checkbox" className="content_li_input"/>
                                    <span>$3000 or more</span>
                                </li>
                                <li className="content_li" onClick={() => this.handlePrice()}>
                                    <span>Close</span>
                                </li>
                            </ul>
                        </span>
                        <span className="filter_product_item">Material &nbsp;&nbsp;
                        <i className="fas fa-angle-down" onClick={() => this.handleMaterial()}></i>
                        <ul className={materialClose ? "content_hide" : "content_show"}>
                            <li className="content_li">
                                <input type="checkbox" className="content_li_input"/>
                                <span>Fabric</span>
                            </li>
                            <li className="content_li">
                                <input type="checkbox" className="content_li_input"/>
                                <span>Leather</span>
                            </li>
                            <li className="content_li">
                                <input type="checkbox" className="content_li_input"/>
                                <span>Plastic</span>
                            </li>
                            <li className="content_li">
                                <input type="checkbox" className="content_li_input"/>
                                <span>Combination</span>
                            </li>
                            <li className="content_li">
                                <input type="checkbox" className="content_li_input"/>
                                <span>MCL Leather</span>
                            </li>
                            <li className="content_li" onClick={() => this.handleMaterial()}>
                                <span>Close</span>
                            </li>
                        </ul>
                    </span>
                        <span className="filter_product_item">Sort By:</span>
                        <select className="content_select">
                            <option value="featuredProduct">Featured Product</option>
                            <option value="priceHigh">Price High to Low</option>
                            <option value="priceLow">Price Low to High</option>
                            <option value="NameA">Name A to Z</option>
                            <option value="NameZ">Name Z to A</option>
                            <option value="Rating">Average Rating</option>
                        </select>
                </div>
                <div className="grid_sort">
                    <div>
                        <span>Showing&nbsp;</span>
                        <span>{this.props.officeChair.length}&nbsp;</span>
                        <span>of&nbsp;</span>
                        <span>{this.props.officeChair.length}&nbsp;</span>
                        <span>items&nbsp;</span>
                    </div>
                    <span className={this.state.blockStatus ? "sorting-icon small" : "sorting-icon"}
                          onClick={this.onClick}></span>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        officeChair: state.officeChairReducer.allChair

    }
}

export default connect(mapStateToProps, {actFetchOfficeChair})(OfficeChair);