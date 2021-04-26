import React, {Component} from "react";
import {Route} from "react-router-dom";
import Office from "../route/Office";
import Living from "../route/Living";
import Dining from "../route/Dining";
import Bedroom from "../route/Bedroom";
import Lighting from "../route/Lighting";
import Outdoor from "../route/Outdoor";
import Accessories from "../route/Accessories";
import Gaming from "../route/Gaming";
import New from "../route/New"
import Cart from "../route/Cart/Cart";
import {Redirect} from "react-router";
import SingleProduct from "../route/singleOfficeChair/SingleProduct";
import Login from "../route/login/Login";


export class Section extends Component{
    render(){
        return(
            <section>
                <Route exact path='/' render={() => (
                    <Redirect push to={"/office"} />
                )} />
                <Route path="/office" component={Office} exact  />
                <Route path="/office/:id" component={SingleProduct} exact  />
                <Route path="/new" component={New} exact  />
                <Route path="/living" component={Living} exact  />
                <Route path="/dining" component={Dining} exact  />
                <Route path="/bedroom" component={Bedroom} exact  />
                <Route path="/outdoor" component={Outdoor} exact  />
                <Route path="/lighting" component={Lighting} exact  />
                <Route path="/accessories" component={Accessories} exact  />
                <Route path="/gaming" component={Gaming} exact  />
                <Route path="/login" component={Login} exact  />

                {/*<Route path="/product/:id" component={Details} exact />*/}
                <Route path="/cart" component={Cart}  exact/>
                {/*<Route path="/payment" component={Payment} exact />*/}
            </section>
        )
    }
}
export default Section