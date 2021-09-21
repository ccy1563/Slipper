import React from 'react';
import { withRouter } from 'react-router-dom';


class DeckForm extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      title: '',
      user: this.props.user_id,
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToUserPage = this.navigateToUserPage.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchUserDecks("6148fcd4300bf698b2d71234");
  //   debugger
  // }

  update(field) {
    return e => this.setState({
        [field]: e.currentTarget.value
    });
  }

  navigateToUserPage() {
    // debugger
    const url = `/user`
    this.props.history.push(url);
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let deck = {
        title: this.state.title,
        user: this.state.user
    };
    this.props.composeDeck(deck);
    this.navigateToUserPage();
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

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
              <input type="text"
                  value={this.state.title}
                  onChange={this.update('title')}
                  placeholder="Title"
              />
              <br />
              <input type="submit" value="Create Deck" />
          </div>
        </form>
      </div>
    )
  }

}

export default withRouter(DeckForm);