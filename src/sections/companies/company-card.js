import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography,CardActions, Button } from '@mui/material';
import InboxArrowDownIcon from '@heroicons/react/24/solid/InboxArrowDownIcon';
import React, { useState, useEffect  } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const CompanyCard = (props) => {

  function generateUUID(digits) {
      let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
      let uuid = [];
      for (let i = 0; i < digits; i++) {
          uuid.push(str[Math.floor(Math.random() * str.length)]);
      }
      return uuid.join('');
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const { company } = props;

  const [disabled, setDisabled] = useState(false);
  const [miCatalogStatus, setMiCatalogStatus] = useState('1');
  const [httpMessage, setHttpMessage] = useState('')
  const [open, setOpen] = useState(false);

  const addPostsMiCatalogo =  async (appName, version, transaccion) => {
     await fetch('http://localhost:8087/agregarMiCatalogo', {
        method: 'POST',
        body: JSON.stringify({
           nombreApp: appName,
           version: version,
           idTransaccion: transaccion,
           idUsuario: 'ksgordillo'
        }),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        },
     })
        .then((response) => {response
        setMiCatalogStatus(response.status);
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

const cleanAndRefresh = () => {
     setOpen(true);
};

const handleClose = (event, reason) => {
  setOpen(false);
};

const handleMyCatalog = (company) => {
  console.log(company)
  const id = generateUUID(15);
  console.log(id)
  addPostsMiCatalogo(company.nombreApp, company.version, id);
  setDisabled(true);
  setOpen(true);
};

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={'/assets/logos/ML/'+company.nombreApp+'.png' }
            variant="square"
            sx={{ width: 140, height: 100 }}
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {company.nombreApp +': '+company.version}
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          {company.descripcion}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            4 Downloads
          </Typography>
        </Stack>
      </Stack>
     <CardActions sx={{ justifyContent: 'center' }}>
       <Button
          disabled={disabled}
          onClick={() => handleMyCatalog(company)}
         startIcon={(
           <SvgIcon fontSize="small">
             <InboxArrowDownIcon />
           </SvgIcon>
         )}
         variant="text">
         Añadir a mi catálogo
       </Button>
     </CardActions>
     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="info" >
         {httpMessage}
       </Alert>
     </Snackbar>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
