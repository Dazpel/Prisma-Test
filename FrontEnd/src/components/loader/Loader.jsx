import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Loader() {

  return (

      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>

  );
}