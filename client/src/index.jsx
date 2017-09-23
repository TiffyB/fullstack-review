import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
// import Repo from './components/Repo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.refreshData = this.refreshData.bind(this);
    this.state = { 
      repos: this.refreshData() || []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // console.log(this);
    var context = this;
    var searchTerm = {
      term: term
    }

    $.ajax({
      url: 'http:\//\//127.0.0.1:1128/repos',
      method: "POST",
      data: JSON.stringify(searchTerm),
      success: function(data) {
        console.log("success: ", data);
        context.refreshData();

      },
      error: function(error) {
        console.log("error", error);
      }
    })
  }

  refreshData () {
    // console.log(`${term} was searched`);
    // console.log('got here');
    // var searchTerm = {
    //   username: term
    // }
    var context = this;


    $.ajax({
      url: 'http:\//\//127.0.0.1:1128/repos',
      method: "GET",
      // data: JSON.stringify(searchTerm),
      success: function(data) {
        // console.log("success from refreshData: ", data);
        // context.refreshData(term);
        // console.log(typeof data);
        if (data) {
          var parsedData = JSON.parse(data);
          console.log(parsedData);
          context.setState({
            repos: parsedData.slice(0, 25)
          });
        }
      },
      error: function(error) {
        console.log("error", error);
      }
    })


    // $.ajax({
    //   url: 'http:\//\//127.0.0.1:1128/repos',
    //   method: "GET",
    //   data: JSON.stringify(searchTerm),
    //   success: function(data) {
    //     console.log("success: ", data);
    //     var repos = JSON.parse(data);
    //     context.setState({
    //       repos: repos
    //     });
    //   },
    //   error: function(error) {
    //     console.log("error", error);
    //   }
    // })
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