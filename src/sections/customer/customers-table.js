import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  SvgIcon
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';


export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead >
              <TableRow>
                <TableCell align='center'>
                  Algoritmo
                </TableCell>
                <TableCell align='center'>
                  Version
                </TableCell>
                <TableCell align='center'>
                  Id. Transaccion
                </TableCell>
                <TableCell align='center'>
                  Validación estructura OpenAPI
                </TableCell>
                <TableCell align='center'>
                  Analisis Vulnerabilidad Código
                </TableCell>
                <TableCell align='center'>
                  Generación imagen Docker
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {

                return (
                  <TableRow
                    hover
                    key={customer.uid}
                  >

                    <TableCell>
                    <Typography variant="subtitle2">
                      {customer.nombreApp}
                    </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      {customer.version}
                    </TableCell>
                    <TableCell align='center'>
                      {customer.uid}
                    </TableCell>
                    <TableCell>
                      <Avatar sx={{ width: 24, height: 24, margin: "auto" }}
                      src={customer.mensaje.openAPIFileCorrect ==null? '/assets/icons/Loading_2.gif' :customer.mensaje.openAPIFileCorrect? '/assets/icons/right-icon.png':'/assets/icons/wrong-icon.png'}></Avatar>
                    </TableCell>
                    <TableCell>
                      <Avatar sx={{ width: 24, height: 24, margin: "auto" }}
                      src={customer.mensaje.codigoVulnerable ==null? '/assets/icons/Loading_2.gif' : !customer.mensaje.codigoVulnerable ?'/assets/icons/right-icon.png':'/assets/icons/wrong-icon.png'}></Avatar>
                    </TableCell>
                    <TableCell>
                      <Avatar sx={{ width: 24, height: 24, margin: "auto" }}
                      src={customer.mensaje.imagenGenerada ==null? '/assets/icons/Loading_2.gif' : customer.mensaje.imagenGenerada ? '/assets/icons/right-icon.png':'/assets/icons/wrong-icon.png'}></Avatar>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
