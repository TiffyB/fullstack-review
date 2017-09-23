import React from 'react';

const Repo = (props) => (
  <div>
    <div>{props.repo.username}</div>
    <div>{props.repo.reponame}</div>
  </div>
)

export default Repo;