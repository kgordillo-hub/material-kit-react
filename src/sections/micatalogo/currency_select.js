import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';
import Divider from '@mui/material/Divider';

import {
  Stack
} from '@mui/material';

const currencies = [
  {
    value: 'USD',
    label: 'USD',
  },
  {
    value: 'EUR',
    label: 'EUR',
  },
  {
    value: 'COP',
    label: 'COP',
  },
  {
    value: 'JPY',
    label: 'JPY',
  }
];

export default function SelectTextFields({updateCurrencyO,updateCurrencyD,updateDateIni,updateDateFin}) {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var today_str = yyyy + '-' + mm + '-' + dd;


const [value1, setValue1] = React.useState(dayjs('2022-01-01'));
const [value2, setValue2] = React.useState(dayjs(today_str));



  return (
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Origen"
          defaultValue="USD"
          helperText="Seleccione la divisa de origen"
          onChange={(event) => {
              updateCurrencyO(event.target.value);}}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Destino"
          defaultValue="COP"
          helperText="Seleccione la divisa de destino"
          onChange={(event) => {
            updateCurrencyD(event.target.value);}}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction="row">
            <DateField
              label="Fecha inicio"
              value={value1}
              onChange={(newValue) => updateDateIni(newValue)}
              format="yyyy-MM-dd"
              helperText="Seleccione la fecha de inicio para los datos de entrenamiento"
            />
            <DateField
              label="Fecha fin"
              value={value2}
              onChange={(newValue) => updateDateFin(newValue)}
              format="yyyy-MM-dd"
              helperText="Seleccione la fecha fin para los datos de entrenamiento"
            />
          </Stack>
        </LocalizationProvider>
      </div>

    </Box>
  );
}