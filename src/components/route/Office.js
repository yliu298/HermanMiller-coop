import React, {Component} from 'react'
import {connect} from "react-redux"
import {actFetchOfficeChair, actSelectChair} from "../../action/chairAction";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../css/office.css'
import OfficeChair from "../sort/officeChair";


class Office extends Component {

    state = {
        chair: {},
        colWidth:4,
    }

    componentDidMount() {
        this.props.actFetchOfficeChair();
    }

    handleClick = () => {
        const {colWidth} = this.state;
        console.log('this.state',this.state)
        this.setState({colWidth: colWidth === 4? 3:4})
        console.log('colWitdh',this.state.colWidth)
    }

    renderChairList() {
        console.log(typeof (this.props.officeChair))


        return this.props.officeChair?.map(chair => {
            return (
                <Col xs={this.state.colWidth}>
                    <div className="card" key={chair.id} >
                        <Link to={`/office/${chair.id}`} className="card_base">
                            <img src={chair.media.split("|")[0]} alt="" />
                            <img src={chair.media.split("|")[1]} alt=""
                            className="card_back"
                            />

                        </Link>
                        <div className="card_content">
                            <h3>
                                {chair.name}
                            </h3>
                            <span>C$ {chair.price}</span>
                        </div>
                        <div className="card_product_color">
                            {chair.profileCategories[0].profileItems.map((color, index) => {
                                return (
                                    <a key={index} href="foo">
                                        <img
                                            src={color.media}
                                            alt=""
                                            className="chair_color"
                                        />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </Col>

            )
        })
    }

    render() {

        return (
            <div className="product">
                <div className="current_path">
                    Home > Office > Office Chairs
                </div>
                <div className="current_title">
                    Office Chairs
                </div>
                <div className="item_sort">
                    <OfficeChair handleClick = {this.handleClick}/>
                </div>
                <div>
                    <Container>
                        <Row>
                            {this.renderChairList()}
                        </Row>
                    </Container>

                </div>

            </div>

        )

    }
}


const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        officeChair: state.officeChairReducer.allChair

    }
}

export default connect(mapStateToProps, {actFetchOfficeChair, actSelectChair})(Office);