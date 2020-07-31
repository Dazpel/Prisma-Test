import React from 'react';
import gql from 'graphql-tag';
import { Query, useQuery } from 'react-apollo';
import { useHistory } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loader from '../loader/Loader';

// This query  gets us the Users stored in the DB

const GET_USERS = gql`
  {
    users {
      name
      userName
      email
    }
  }
`;

//THIS GETS THE CURRENT USER FROM TOKEN
const FETCH_USER = gql`
  {
    user {
      name
      userName
      email
    }
  }
`;

export default function Home({ user, setLogin }) {
  // let currentUSer = this.props.user; // get the user name currently logged
  let history = useHistory()

  const logOut = () => {
    localStorage.clear()
    history.push('/SignIn')
  };

  const { loading, error, data: isData } = useQuery(FETCH_USER);        //On load get User from token authentication
  if (loading) return <Loader />;
  if (error) return `Error! ${error.message}`;
  return (
    <Query query={GET_USERS}>                                           
      {({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) return `Error! ${error.message}`;

//If successfull authenticated, retrieve database users

        return (
          <div style={{ margin: '10px' }}>
            <h3
              style={{ textAlign: 'center' }}
            >{`Welcome, ${isData.user.name}`}</h3>
            <h4 style={{ textAlign: 'left' }}>
              The following table contains the current data stored in the Primsa
              DB
            </h4>
            <div style={{ margin: '10px 0 0 0' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="bold">UserName</TableCell>
                    <TableCell className="bold" align="right">
                      Name
                    </TableCell>
                    <TableCell className="bold" align="right">
                      Email
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.users.map((el, i) => (
                    <TableRow key={i}>
                      <TableCell className="bold">{el.userName}</TableCell>
                      <TableCell align="right">{el.name}</TableCell>
                      <TableCell align="right">{el.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div style={{ margin: '10px' }}>
              <button onClick={logOut}>Log Out</button>
            </div>
          </div>
        );
      }}
    </Query>
  );
}
