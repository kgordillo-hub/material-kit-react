import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, CardActions, CardContent, Divider, Button } from '@mui/material';


export const CompaniesSearch = () => (
  <Card sx={{ p: 2 }}>
  <CardContent>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Buscar algoritmo"
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
      />
    </CardContent>
    <Divider />
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button
        startIcon={(
          <SvgIcon fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        )}
        variant="contained">
        Buscar
      </Button>
    </CardActions>
  </Card>
);
