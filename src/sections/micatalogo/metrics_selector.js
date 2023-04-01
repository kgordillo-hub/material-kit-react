import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormControlLabelPosition({handleChange}) {


  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Métricas a calcular</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          control={<Checkbox defaultChecked onChange={handleChange} name="RMSE"/>}
          label="RMSE"
          labelPlacement="top"
        />
        <FormControlLabel

                  control={<Checkbox defaultChecked onChange={handleChange} name="MAPE"/>}
                  label="MAPE"
                  labelPlacement="top"
        />
        <FormControlLabel

                  control={<Checkbox defaultChecked onChange={handleChange} name="MAE"/>}
                  label="MAE"
                  labelPlacement="top"
        />
      </FormGroup>
    </FormControl>
  );
}