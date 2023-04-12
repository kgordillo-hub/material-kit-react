import LinkIcon from '@heroicons/react/24/solid/LinkIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, CardActions, CardContent, Divider, TextField, CardHeader } from '@mui/material';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';

import React, { useState, useEffect } from 'react';
import { CustomersTable } from 'src/sections/customer/customers-table';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const UploadAlg = () => {

const [repo, setRepo] = useState('');
const [version, setVersion] = useState('1');
const [appName, setAppName] = useState('');
const [appDesc, setAppDesc] = useState('')
const [vinculacionStatus, setVinculacionStatus] = useState('0');
const [data, setData] = useState([]);

const [open, setOpen] = React.useState(false);
const [httpMessage, setHttpMessage] = useState('')

const addPostsVincular =  async () => {
   await fetch('http://localhost:8083/vincularCodigo', {
      method: 'POST',
      body: JSON.stringify({
         nombreApp: appName,
         version: "v"+version,
         descripcion: appDesc,
         mensaje: {esPublico: true, linkRepo: repo, idUsuario: 'ksgordillo', branchRepoName: 'master'}
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => {response
      setVinculacionStatus(response.status);
      return response.text()
      }
      )
      .then((data) => {
      setHttpMessage(data);
      cleanAndRefresh();
      })
      .catch((err) => {
         console.log(err.message);
      });
};



const handleSubmit = (e) => {
   e.preventDefault();
   addPostsVincular();


};

const getVinculaciones = () => {
   fetch('http://localhost:8083/consultarVinculaciones/ksgordillo')
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         setData(data);
      })
      .catch((err) => {
         console.log(err.message);
      });
};


const cleanAndRefresh = () => {
     setRepo('');
     setVersion(1);
     setAppName('');
     getVinculaciones();
     setOpen(true);
};


useEffect(() => {
  getVinculaciones();
}, [""]);

const handleClose = (event, reason) => {
  setOpen(false);
};

return (

<form onSubmit={handleSubmit}>
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="info" >
    {httpMessage}
  </Alert>
</Snackbar>
  <Card sx={{ p: 2 }}>
  <CardContent>
    <Stack spacing={2} direction="column">
    <OutlinedInput
      value={repo}
      onChange={(e) => setRepo(e.target.value)}
      required
      fullWidth
      placeholder="Link del repositorio"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <LinkIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 750 }}
    />
    <Stack spacing={3} direction="row">
    <TextField
      fullWidth
      required
      id="nombre-app"
      label="Ingrese el nombre del algoritmo"
      sx={{ maxWidth: 750 }}
      value = {appName}
      onChange={(e) => setAppName(e.target.value)}
    />
    <TextField
      fullWidth
      required
      id="version"
      label="Seleccione la versión"
      type="number"
      value={version}
      inputProps={{min: 0, style: { textAlign: 'center' }}}
      onChange={(e) => setVersion(e.target.value)}
      InputLabelProps={{
        shrink: true,

      }}
      sx={{ maxWidth: 250 }}
    />
    </Stack>
        <TextField
          fullWidth
          required
          id="descripcion-app"
          label="Agregue una descripción del algoritmo"
          sx={{ maxWidth: 750 }}
          value = {appDesc}
          onChange={(e) => setAppDesc(e.target.value)}
        />
    </Stack>
    </CardContent>
    <Divider />
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button
        startIcon={(
          <SvgIcon fontSize="small">
            <PlusIcon />
          </SvgIcon>
        )}
        type="submit"
        variant="contained">
        Agregar
      </Button>
    </CardActions>
  </Card>

 <Card>
   <CardHeader
     action={(
       <Button
         color="inherit"
         size="small"
         onClick={getVinculaciones}
         startIcon={(
           <SvgIcon fontSize="small">
             <ArrowPathIcon />
           </SvgIcon>
         )}
       >
         Refrescar
       </Button>
     )}
     title="Info. vinculaciones"
   />
  <CustomersTable
                count={data.length}
                items={data}
              />
  </Card>
</form>


);
};

export default UploadAlg;