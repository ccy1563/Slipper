import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class DeckTitle extends React.Component {
  constructor(props){
    super(props);
    // this.state = this.props.decks[this.props.deckId];
    this.state = {
      flag: false,
    }
    this.state["title"] = this.props.target.title;

    // this.titleEdited = React.createRef();
    this.handleTitleEdit = this.handleTitleEdit.bind(this);
  }

  // componentDidMount() {
  //   debugger
  //   this.props.fetchDeck(this.props.deckId)
  // }

  handleTitleEdit(e){
    e.preventDefault();

    // debugger;
    // let editTitle = this.titleEdited.current.value;
    
    let editedDeck = {
      id: this.props.target._id,
      user: this.props.target.user,
      title: this.state.title,
    }
    // console.log(editedDeck)
    this.props.reviseDeck(editedDeck);
    // this.props.history.push('/user');
    window.location.reload(false);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
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

  render(){
    // debugger
    if (!this.state.flag) {
      return (
        <button 
        onClick={(e) => this.handleOpen(e)}
        className='user-profile-button'>
          Edit Title
        </button>
      )
    }

    if (this.state.flag) {
      return (
        <div>
          <button
            onClick={(e) => this.handleOpen(e)}
            className='user-profile-button'>
            Edit Title
          </button>

          <div className='modal'>
            <form onSubmit={this.handleTitleEdit}>
              <div className='flashcard-form'>
                <input
                  className='user-profile-create-deck-text-box-modal'
                  type="text"
                  // ref={this.titleEdited}
                  value={this.state.title}
                  onChange={this.update('title')}
                />
                <br />
                <input className='user-profile-create-deck-button-edit' type="submit" value="Edit Title" />

                <button
                  className='edit-card-close-title'
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

export default withRouter(DeckTitle);