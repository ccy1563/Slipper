import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/flashcard_form.css'


// title: {
//     type: String,
//         required: true,
//     },
// text: {
//     type: String,
//         required: true,
//     },
// deck: {
//     type: Schema.Types.ObjectId,
//         ref: "decks",
//     },

class FlashcardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            deck: this.props.target._id,
            flag: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.navigateToUserPage = this.navigateToUserPage.bind(this);
    }

    componentDidMount() {
        // debugger
        // this.props.match.params.deckId;
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        let flashcard = {
            title: this.state.title,
            text: this.state.text,
            deck: this.state.deck,
        };
        this.props.createFlashcard(flashcard);
        // this.navigateToUserPage();
        window.location.reload(false);
    }

    navigateToUserPage() {
        // debugger
        const url = `/user`
        this.props.history.push(url);
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    handleOpen(e) {
        e.preventDefault();
        this.setState({
            flag: true,
        })
    }

    handleClose(e) {
        e.preventDefault();
        this.setState({
            flag: false,
        })
    }

    render() {
        if (!this.state.flag) {
            return (
                <button 
                onClick={(e) => this.handleOpen(e)}
                className='user-profile-button'>
                    Create Card
                </button>
            )
        }

        if (this.state.flag) {
            return (
                <div>
                    <button
                        onClick={(e) => this.handleOpen(e)}
                        className='user-profile-button'>
                        Create Card
                    </button>
                    <div className='modal'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='flashcard-form'>
                                <input
                                    className='flashcard-form-title-input'
                                    type="text"
                                    value={this.state.title}
                                    onChange={this.update('title')}
                                    placeholder="title"
                                />
                                <br />
                                <textarea
                                    className='flashcard-form-textarea'
                                    placeholder="enter text here..."
                                    cols="65"
                                    rows="4"
                                    value={this.state.text}
                                    onChange={this.update("text")}
                                />
                                <input className='flashcard-form-submit' type="submit" value="Add card" />

                                <button
                                    className='edit-card-close'
                                    onClick={(e) => this.handleClose(e)}>
                                    X
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

}

export default withRouter(FlashcardForm);