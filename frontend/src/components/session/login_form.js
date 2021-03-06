import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../stylesheets/login.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.demoLogin = this.demoLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.navigateToSplashPage = this.navigateToSplashPage.bind(this);
    }

    // Once the user has been authenticated, redirect to the Tweets page
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/');
        }

        // Set or clear errors
        this.setState({ errors: nextProps.errors })
    }

    // componentDidMount() {
    //     debugger
    // }

    // Handle field updates (called in the render method)
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.login(user);
        if(this.props.auth){
            this.navigateToSplashPage();
        }
    }

    navigateToSplashPage() {
        // debugger
        const url = `/`
        this.props.history.push(url);
    }

    demoLogin(e){
        e.preventDefault();
        const demo = {email: "asd@asd.com", password: "asdasd"}
        this.props.processDemo(demo);
    }

    render() {
        return (
            <div className='form-container'>
                <div className="login">
                    <form className='form-box' onSubmit={this.handleSubmit}>
                        <p className="form-header">Log in to Flashcard Wars</p>
                        <div className = "session-form-errors">
                            {this.state.errors.email}
                        </div>
                        <input 
                            className="login-input"
                            type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <div className = "session-form-errors">
                            {this.state.errors.password}
                        </div>
                        <input
                            className="login-input"
                            type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <div className="button-input">
                            <input className="session-submit" type="submit" value="Submit" />
                            <input className="session-demo" type="submit" value="Demo Login" onClick={this.demoLogin}/>
                        </div>

                        <div>
                            <p className="session-redirect">
                                Not a Flashcard War member? <Link to="/signup">Sign up here.</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginForm);