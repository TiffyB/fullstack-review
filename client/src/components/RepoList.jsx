import React from 'react';
// import Repo from './components/Repo.jsx';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    Here are the top {props.repos.length} most recently updated repos.
    {props.repos.map((repo) => 
    	<Repo repo={repo} />
    )}
  </div>
)

export default RepoList;