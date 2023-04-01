import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography,CardActions, Button, CardActionArea } from '@mui/material';
import InboxArrowDownIcon from '@heroicons/react/24/solid/InboxArrowDownIcon';
import MaxWidthDialog from 'src/sections/micatalogo/dialog_form'

export const CompanyCard2 = (props) => {
  const { company } = props;




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
          {company.nombreApp + ': '+company.version}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {company.descripcion}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <MaxWidthDialog
        title={company.nombreApp + ': '+company.version}
        version={company.descripcion}
        enableUse={company.enPreparacion}
        ip={company.ipAPI}
        puerto={company.numeroPuerto}
        idTrans={company.uid}
        entrenando={company.enEntrenamiento}
        />
      </CardActions>
   </Card>

  );
};

CompanyCard2.propTypes = {
  company: PropTypes.object.isRequired
};
