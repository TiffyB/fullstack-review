import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.refreshData = this.refreshData.bind(this);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    var searchTerm = {
      term: term
    }

    $.ajax({
      url: 'http:\//\//127.0.0.1:1128/repos',
      method: "POST",
      data: JSON.stringify(searchTerm),
      // contentType: 'application/json',
      success: function(data) {
        console.log("success: ", data);
        this.refreshData(searchTerm);
      },
      error: function(error) {
        console.log("error", error);
      }
    })

    // var url = 'https:\//\//api.github.com/search/repositories?q=user:'+ term 
    // $.ajax({
    //   url: url,
    //   method: "GET",
    //   data: {
    //     access_token: module.exports.TOKEN,
    //     // q: term
    //     sort: "updated",
    //     order: "desc"
    //   },
    //   success: function(data) {
    //     console.log("success: ", data);
    //   },
    //   error: function(error) {
    //     console.log("error: ", error);
    //   }
    // })


  }

  refreshData (term) {
    // console.log(`${term} was searched`);
    console.log('got here');
    var searchTerm = {
      term: term
    }

    $.ajax({
      url: 'http:\//\//127.0.0.1:1128/repos',
      method: "GET",
      data: JSON.stringify(searchTerm),
      // contentType: 'application/json',
      success: function(data) {
        console.log("success: ", data);
        var repos = JSON.parse(data);
        this.setState({
          repos: repos
        });
      },
      error: function(error) {
        console.log("error", error);
      }
    })
  } 

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)} onRefresh={this.refreshData.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));