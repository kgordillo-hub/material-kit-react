import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import SelectTextFields from 'src/sections/micatalogo/currency_select'
import FormControlLabelPosition from 'src/sections/micatalogo/metrics_selector'
import dayjs from 'dayjs';
import { format } from 'date-fns'
import LoadingButton from '@mui/lab/LoadingButton';
import RocketLaunchIcon from '@heroicons/react/24/solid/RocketLaunchIcon';
import ArrowTrendingUpIcon from '@heroicons/react/24/solid/ArrowTrendingUpIcon';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'


export default function MaxWidthDialog(props) {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var today_str = yyyy + '-' + mm + '-' + dd;

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [dataSource, setDataSource] = React.useState('yahoo');
  const [enableUpload, setEnableUpload] = React.useState('sm');

  const [currencyO, setCurrencyO] = React.useState('USD');
  const [currencyD, setCurrencyD] = React.useState('COP');
  const [dateIni, setDateIni] = React.useState('2022-01-01');
  const [dateFin, setDateFin] = React.useState(today_str);

  const [serviceResponse, setServiceResponse] = React.useState('');
  const [requestB64, setRequestB64] = React.useState('');
  const [inTraining, setInTraining] = React.useState(props.entrenando);
  const [state, setState] = React.useState({
    MAE: true,
    MAPE: true,
    RMSE: true,
  });
  const [dias, setDias] = React.useState(1);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const updateCurrencyO = (currency) => {
    setCurrencyO(currency);
  }

  const updateCurrencyD = (currency) => {
    setCurrencyD(currency);
  }

  const updateDateIni = (date) => {
    var new_date = format(date, 'yyyy-MM-dd')
    setDateIni(new_date);
  }

  const updateDateFin = (date) => {
    var new_date = format(date, 'yyyy-MM-dd')
    setDateFin(new_date);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState({   MAE: true,
                 MAPE: true,
                 RMSE: true,
               });
  };

  const handleTraining = async () => {
    setInTraining(true);
    await getYahooData(currencyO, currencyD, dateIni, dateFin);

  };

  const handlePredict = async () => {

    let objJsonStr = JSON.stringify({"days_to_predict": Number(dias)});
    let requestB64 = Buffer.from(objJsonStr).toString("base64");
    addPostsMiCatalogo(requestB64, null, '/predict');
    handleClose();
  };

  const handleEnableUpload = (event) => {
    setEnableUpload(
      event.target.value=="yahoo"
    );
    setDataSource(
      event.target.value
    );
  };

  const getYahooData = async (origen, destino, fecha_ini, fecha_fin) => {
     await fetch('http://localhost:5010/getYahooFinanceData?origen='+ origen+'&destino='
        +destino+'&fecha_ini='+fecha_ini+'&fecha_fin='+fecha_fin)
        .then((response) => response.json())
        .then((data) => {
           var metricas = [];
           if (state.MAE) {metricas.push("MAE")};
           if (state.MAPE) {metricas.push("MAPE")};
           if (state.RMSE) {metricas.push("RMSE")};
           console.log(data);
           let objJsonStr = JSON.stringify(data);
           let requestB64 = Buffer.from(objJsonStr).toString("base64");
           setRequestB64(requestB64);
           //console.log(requestB64);
           addPostsMiCatalogo(requestB64, metricas, '/trainModel');
           //setInTraining(true);
           updateTrainingState();
        })
        .catch((err) => {
           console.log(err.message);
        });
  };

  const addPostsMiCatalogo =  async (data, metricas, endPoint) => {
     await fetch('http://localhost:8088/llamarModelo', {
        method: 'POST',
        body: JSON.stringify({
           nombreApp: props.title,
           version: props.version,
           idUsuario: 'ksgordillo',
           idTransaccion: props.idTrans,
           endPoint: 'http://'+props.ip+':'+props.puerto + endPoint,
           protocol: 'POST',
           metricasCalcular: metricas,
           requestB64: data,
           descripcion: currencyO+'/'+currencyD
        }),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        },
     })
        .then((response) => {
        setServiceResponse(response.status);
        return response.text()
        }
        )
        .then((data) => {
        console.log(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  };

    const updateTrainingState =  async () => {
       await fetch('http://localhost:8087/actualizarMiCatalogo/entrenamiento', {
          method: 'POST',
          body: JSON.stringify({
             idTransaccion: props.idTrans,
             endPoint: 'http://'+props.ip+':'+props.puerto+'/trainModel',
             enEntrenamiento: true,
             descripcion: currencyO+'/'+currencyD
          }),
          headers: {
             'Content-type': 'application/json; charset=UTF-8',
          },
       })
          .then((response) => {
          return response.text()
          }
          )
          .then((data) => {
          console.log(data);
          })
          .catch((err) => {
             console.log(err.message);
          });
    };

  return (
    <React.Fragment>
      <LoadingButton disabled={props.enableUse} loading={props.enableUse} onClick={handleClickOpen} loadingPosition="start" variant="outlined"
      startIcon={(<SvgIcon fontSize="small"> <RocketLaunchIcon /></SvgIcon>)}>
        <span>{!props.enableUse ? 'Utilizar modelo':'Preparando entorno'}</span>
      </LoadingButton>
      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <Divider>Fase de entrenamiento</Divider>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              m: 'auto',
            }}
          >

            <FormControl sx={{ mt: 2, minWidth: 440 }}>
            <Stack direction="column" spacing={4}>
              <InputLabel htmlFor="max-width">Seleccione la fuente de datos</InputLabel>
              <Select
                autoFocus
                value={dataSource}
                onChange={handleEnableUpload}
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value="yahoo">Yahoo finance</MenuItem>
                <MenuItem value="archivo">Archivo CSV</MenuItem>
              </Select>
              { enableUpload ?<SelectTextFields updateCurrencyO = {updateCurrencyO}
                updateCurrencyD = {updateCurrencyD} updateDateIni = {updateDateIni} updateDateFin = {updateDateFin}
                    />:<Button
                                  fullWidth
                                  variant="text"
                                  disabled={enableUpload}
                                  variant="outlined"
                                >
                                  Upload file
                                </Button>
              }


            <FormControlLabelPosition handleChange={handleChange}/>
            </Stack>
            </FormControl>

          </Box>
        </DialogContent>
        <DialogActions>
        <Stack direction="row" spacing={2}>
          <Button onClick={handleClose}>Cerrar</Button>
          <LoadingButton loading={inTraining == null ? false: inTraining} onClick={handleTraining} loadingPosition="start" variant="contained"
          startIcon={(<SvgIcon fontSize="small"> <ArrowTrendingUpIcon /></SvgIcon>)}>
            <span>{inTraining ? 'Entrenando':'Entrenar'}</span>
          </LoadingButton>
         </Stack>
        </DialogActions>

        <Divider>Funcionalidades adicionales</Divider>
        <Box sx={{ width: '100%', p:5 }}>
        <Grid container spacing={9}>
            <Grid item />
            <Grid item xs={6} md={6}>
              <div>
                  <Typography variant="button" display="block" gutterBottom>
                    Predicción
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Realizar predicción de n días a futuro
                  </Typography>
              </div>
            </Grid>
            <Grid item xs={6} md={2}>
               <TextField
                 disabled={inTraining == null ? true : inTraining}
                 fullWidth
                 required
                 id="dias"
                 label="No. dias"
                 type="number"
                 value={dias}
                 inputProps={{min: 0, max: 12, style: { textAlign: 'center' }}}
                 onChange={(e) => setDias(e.target.value)}
                 InputLabelProps={{
                   shrink: true,
                 }}
                 sx={{ maxWidth: 120 }}
               />
            </Grid>
            <Grid item xs={6} md={2}>
              <Button size="small" disabled={inTraining == null ? true : inTraining} onClick={handlePredict} variant="contained">Predecir</Button>
            </Grid>
        </Grid>
        </Box>

      </Dialog>
    </React.Fragment>
  );
}