import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
     // this.onChange = this.onChange.bind(this);
    // this.refreshData = this.refreshData.bind(this);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    // console.log(this.state.term);
    // console.log(this);
    this.props.onSearch(this.state.term);
  }

  refreshData() {
    console.log('called from search');
    this.props.refreshData(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange.bind(this)}/>       
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>) 
  }
}

export default Search;