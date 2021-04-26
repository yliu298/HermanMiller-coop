import {Component} from "react";
import {actPayment} from "../../../action/paymentAction";
import {connect} from "react-redux";


class Payment extends Component {

    payPalIntegrate = (paypal, actPayment) => {
        return  {
            // Configure environment
            env: 'sandbox',
            client: {
                sandbox: 'AT00CBFees-dWFZkvRZIdRoC-HcSBflw-Bi2e7S1Y1mCGOlY46BUkBEOTElGDUFwfPEuyy9afsitY7xF',
                production: 'AWy7L0BwPpJU1qoh9hNZiR9-sadMHUpnOhlRbTw9ha-4LOhB9y4biARxSpBnk1KjbaXEHCnv1pBhumgI'
            },
            // Customize button (optional)
            locale: 'en_US',
            style: {
                size: 'medium',
                color: 'white',
                shape: 'pill',
                // layout: 'vertical',
                fundingicons: 'true',
            },
            funding: {
                allowed: [ paypal.FUNDING.CARD ],
                disallowed: [ paypal.FUNDING.CREDIT ]
            },

            // Enable Pay Now checkout flow (optional)
            commit: true,

            // Set up a payment
            payment: (data, actions) => {
                return actions.payment.create({
                    transactions: [{
                        amount: {
                            total: '0.36',
                            currency: 'USD',
                            details: {
                                subtotal: '0.30',
                                tax: '0.03',
                                shipping: '0.02',
                                handling_fee: '1.00',
                                shipping_discount: '-1.00',
                                insurance: '0.01'
                            }
                        },
                        description: 'Mark2win Full Stack Developer Bootcamp Ultimate version',
                        custom: '90048630024435',
                        //invoice_number: '12345', Insert a unique invoice number
                        payment_options: {
                            allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
                        },
                        soft_descriptor: 'ECHI5786786',
                        item_list: {
                            items: [
                                {
                                    name: 'React',
                                    description: 'React-from scratch to master',
                                    quantity: '2',
                                    price: '0.10',
                                    tax: '0.01',
                                    sku: '1',
                                    currency: 'USD'
                                },
                                {
                                    name: '',
                                    description: 'Front end developer.',
                                    quantity: '1',
                                    price: '0.10',
                                    tax: '0.01',
                                    sku: 'product34',
                                    currency: 'USD'
                                }],
                            shipping_address: {
                                recipient_name: 'testing',
                                line1: 'testing',
                                line2: 'testing',
                                city: 'testing',
                                country_code: 'CA',
                                postal_code: 'L3R 0B3',
                                phone: 'testing',
                                state: 'Ontario'
                            }
                        }
                    }],
                    note_to_payer: 'Contact us markxu@mark2win.com for any questions on your order.'
                });
            },
            // Execute the payment
            onAuthorize: (data, actions) => {
                return actions.payment.execute().then(function(res) {
                    // Show a confirmation message to the buyer
                    console.log('1--->>>>>>', res);
                    //let cart = JSON.parse(localStorage.getItem("chatArr"))
                    //console.log(cart)
                    actPayment(res)
                    // window.alert('Thank you for your purchase!' + JSON.stringify(res))
                    //     .catch(reason => console.log("transcation failed", reason.response) );
                });
            }

        }
    }


    render() {
        return(
            <div id="paypal-button"></div>
        )
    }

    componentDidMount() {
        console.log('window.paypal', window.PAYPAL)
        window.PAYPAL.Button.render(this.payPalIntegrate(window.PAYPAL, this.props.actPayment),'#paypal-button');

    }
}

const mapStateToProps = state => {

    return{

    }
}

export default connect(mapStateToProps, {actPayment})(Payment)
