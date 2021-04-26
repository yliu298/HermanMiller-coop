import React, {Component} from "react"
import ModalImage from "react-modal-image";
import {connect} from "react-redux";
import {actSelectChair} from "../../../action/chairAction";
import "../../css/singleProduct.css"
import StickyBar from "./StickyBar";

class SingleProduct extends Component{

    state = {
        checkedItemIndex: [],
        itemPrice:[],
        buildedChair:{},
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.actSelectChair(id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("prevProps.chairDetail", prevProps.chairDetail)
        console.log("this.props.chairDetail", this.props.chairDetail)
        if (prevProps.chairDetail !== this.props.chairDetail){
            const tempChair = this.props.chairDetail;
            console.log('tempChair',tempChair)
            console.log('tempChair',tempChair.profileCategories)
            if (tempChair.profileCategories){
            let itemPriceT = [];
            let checkedItemIndexT = [];
            for (let i = 0; i < tempChair.profileCategories.length; i++) {
                for (let j = 0; j < tempChair.profileCategories[i].profileItems.length; j++) {
                    if (tempChair.profileCategories[i].profileItems[j].checked) {
                        checkedItemIndexT.push(j);
                        itemPriceT.push(tempChair.profileCategories[i].profileItems[j].price)
                    }
                }
            }
            console.log('updated', itemPriceT, checkedItemIndexT, tempChair)
            this.setState({
                checkedItemIndex: checkedItemIndexT,
                itemPrice: itemPriceT,
                buildedChair: tempChair
            })

            }
        }
    }

    showSmallImg = (imgArray) =>{
        if (imgArray){
            let tempArr = imgArray.split("|");
            console.log(tempArr.length);
            if (tempArr.length > 6){
                tempArr = imgArray.split("|").slice(0,6)
            }
            console.log('tempArr', tempArr)
            return tempArr.map((img, index)=>{
                if (index === 0 ){
                    return(
                        <div key={index} className="small_image_li default_img">
                            <a href="#">
                                <ModalImage
                                    small={img.trim()}
                                    large={img.trim()}
                                    alt=""
                                />
                            </a>
                        </div>
                    )
                }else{
                    return(
                        <div key={index} className="small_image_li">
                            <a href="#">
                                <ModalImage
                                    small={img.trim()}
                                    large={img.trim()}
                                    alt=""
                                />
                            </a>
                        </div>
                    )
                }
            })
        }else{
            return(
                <div>No image.</div>
            )
        }
    }

    moreImgCounter = (imgArray) =>{
        let finalCount = 0;
        if (imgArray){
            console.log('imgArray length', imgArray.split("|").length);
            if (imgArray.split("|").length > 5){
                finalCount = imgArray.split("|").length - 5;
            }
        }
        return finalCount;
    }

    selectedProfile = (indexC, price, indexI) => {
        let checkItemArrayT = this.state.checkedItemIndex;
        let itemPriceT = this.state.itemPrice;
        let tempChair = this.state.buildedChair
        checkItemArrayT[indexC] = indexI;
        itemPriceT[indexC] = price;
        for (let i = 0; i < tempChair.profileCategories.length; i++){
            for (let j = 0; j < tempChair.profileCategories[i].profileItems.length; j++){
                if (j === indexI) {
                    tempChair.profileCategories[i].profileItems[j].checked = true;
                }else{
                    tempChair.profileCategories[i].profileItems[j].checked = false;
                }
            }
        }
        console.log(checkItemArrayT)
        this.setState({
            buildedChair:tempChair,
        })

    }

    render() {

        console.log(this.state.itemPrice,this.state.buildedChair,this.state.checkedItemIndex)

        const {name, price, media} = this.props.chairDetail;
        return (
            <div>
                <div className="current_path">
                    Home > Office > Office Chairs > {name}
                </div>
                <div>
                    <div className="image_container">
                        <div className="small_image">
                            <div className= "small_image_left">
                                {this.showSmallImg(media)}
                            </div>
                            <div className= "image_video_logo">
                                <i className="fab fa-youtube fa-3x" ></i>
                            </div>
                            <div className={media?.split("|").length > 6 ? "more_image" : "no_image"}>
                                <strong>+{this.moreImgCounter(media)}</strong>
                            </div>
                        </div>
                        <div className="big_image">
                            <ModalImage
                                small={media?.split("|")[0]}
                                large={media?.split("|")[0]}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="chair_info_detail">
                        <h1>{name}</h1>
                        <p>{this.props.chairDetail.slug}</p>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <p>&nbsp;4.7</p>
                        </div>
                        <div className="detail_price">
                            <strong>C$ {price}</strong>
                        </div>
                        <div className="detail_warranty">
                            <a href="#">
                                <i className="fas fa-check" style={{color: 'red'}}>
                                </i>
                                <span>12-Year Warranty</span>
                            </a>
                            <a href="#">
                                <i className="fas fa-check" style={{color: 'red'}} >
                                </i>
                                <span>Free Standard Shipping</span>
                            </a>
                            <a href="#">
                                <i className="fas fa-check" style={{color: 'red'}}>
                                </i>
                                <span>130-Day No Hassle Return</span>
                            </a>
                        </div>
                        <div>
                            {this.props.chairDetail?.profileCategories?.map((profileC, indexC) =>
                                <div key={indexC}>
                                    <label className='radio_categories'>
                                        {profileC.name}
                                    </label>
                                    {profileC.profileItems.map((profileI, indexI) =>
                                        <div key={indexI}>
                                            <label className="radio_container">
                                                <input
                                                    name={profileC.name}
                                                    type="radio"
                                                    className="radio"
                                                    value={profileI.name}
                                                    onClick={e => this.selectedProfile(indexC, profileI.price, indexI)}
                                                    defaultChecked={profileI.checked}
                                                />{profileI.name}
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="description">
                    <h4> Description </h4>
                    <div className="description-list">
                        <div className="left-side">
                            {this.props.chairDetail.description}
                        </div>
                        <div className="right-side">
                            <h6>
                                Key Features
                            </h6>
                            <ul className="right-side-description-list">
                                <li>12-year warranty</li>
                                <li>Inclusive design with 3 distinct sizes</li>
                                <li>Breathable seat and back</li>
                                <li>Pellicle 8Z® provides 8 zones of varying tension for sophisticated
                                    support
                                </li>
                                <li>Made in Michigan at a 100% green-energy facility</li>
                                <li>Adjustable tilt and seat angle</li>
                                <li>Superior back support</li>
                                <li>Fully adjustable arms (height, depth and angle)</li>
                                <li>For questions about lead times, in-stock options or delivery please give
                                    us
                                    a call at 888.798.0202
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <StickyBar name={name} price={price} state={this.state}></StickyBar>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log('signle chair detail', state)
    return{
        chairDetail:state.officeChairReducer.singleChair
    }
}

export default connect(mapStateToProps,{actSelectChair})(SingleProduct)
