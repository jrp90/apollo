import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { link } from 'fs';

import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';
import UserForm from './UserForm';
import Goal from './resolutions/Goal';

const App = ({ loading, resolutions, client, user }) => {
  if (loading) {
    return null;
  }

  return (
    <div>
      <UserForm user={user} client={client} />
      {user._id && (
        <React.Fragment>
          <ResolutionForm />
          <ul>
            {resolutions.map(resolution => (
              <li key={resolution._id}>
                <span
                  style={{
                    textDecoration: resolution.completed ? 'line-through' : 'none'
                  }}
                >
                  {resolution.name}
                </span>
                <ul>{resolution.goals.map(goal => <Goal goal={goal} key={goal._id} />)}</ul>
                <GoalForm resolutionId={resolution._id} />
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      completed
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
    }
  }
`;

export default graphql(resolutionsQuery, {
  props: ({ data }) => ({ ...data })
})(withApollo(App));
