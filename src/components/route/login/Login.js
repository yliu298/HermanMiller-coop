import React, {Component} from "react";
import {Field, reduxForm} from "redux-form"
import '../../css/login.css';
import {connect} from "react-redux";
import {actFetchUser} from "../../../action/userAction";



class Login extends Component{

    onSubmit2 = formValues =>{
        console.log(formValues);
        this.props.actFetchUser(formValues)
    }

    renderInput(field){
        return(
            <div>
                <div>
                    <label>{field.input.name}</label>
                    {field.meta.error && field.meta.touched && <span style={{color:'red', fontSize:'12px', marginLeft:'10px'}}>field.meta.error</span>}

                </div>
                <input {...field.input} type={field.type} className="form-control"  placeholder={field.placeholder}>
                </input>
            </div>

        )
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="login_form">
                <form onSubmit={handleSubmit(this.onSubmit2)}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <Field
                            name="email"
                            type="email"
                            component={this.renderInput}
                            placeholder='Enter email'
                        />
                    </div>

                    <div className="form-group">
                        <Field
                            name="password"
                            type="password"
                            component={this.renderInput}
                            placeholder='Enter password'
                        />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        );
    }
}

const loginWrapped = reduxForm({
    form: 'loginForm',
})(Login);

export default connect(null,{actFetchUser})(loginWrapped);