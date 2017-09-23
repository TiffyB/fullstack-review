import React from 'react';

const Repo = (props) => (
  <div>
    <a href={props.repo.url}>{props.repo.reponame}</a>
    <span> from {props.repo.username}</span>
  </div>
)

export default Repo;