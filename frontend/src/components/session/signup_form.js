import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            handle: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            handle: this.state.handle,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user, this.props.history);
    }

    render() {
        return (
            <div className="signup-form-container">
                <div className ="login">
                    <form onSubmit={this.handleSubmit} className="form-box">
                        <p className="form-header">Sign up for Flashcard War</p>
                            <div className = "session-form-errors">
                              {this.state.errors.email}
                            </div>
                            <input type="text"
                                value={this.state.email}
                                onChange={this.update('email')}
                                placeholder="Email"
                                className="signup-input"
                            />
                            <div className = "session-form-errors">
                              {this.state.errors.handle}
                            </div>
                            <input type="text"
                                value={this.state.handle}
                                onChange={this.update('handle')}
                                placeholder="Username"
                                className="signup-input"
                            />
                            <div className = "session-form-errors">
                              {this.state.errors.password}
                            </div>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Password"
                                className="signup-input"
                            />
                            <div className = "session-form-errors">
                              {this.state.errors.password2}
                            </div>
                            <input type="password"
                                value={this.state.password2}
                                onChange={this.update('password2')}
                                placeholder="Confirm Password"
                                className="signup-input"
                            />

                            <div className="button-input">
                                <input className="session-submit" type="submit" value="Submit" />
                            </div>
                            <div>
                                <p className="session-redirect">
                                    Already a Flashcard War member? <Link to="/login">Log in here.</Link>
                                </p>
                            </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(SignupForm);