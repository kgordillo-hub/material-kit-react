import { CompanyCard } from 'src/sections/companies/company-card';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Pagination,
  Stack,
  Card,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const CatalogGeneral = () => {

const [catalogo, setCatalogo] = useState([]);


const getCatalogo = () => {
   fetch('http://localhost:8087/consultarCatalogoGral')
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         setCatalogo(data);
      })
      .catch((err) => {
         console.log(err.message);
      });
};

useEffect(() => {
  getCatalogo();
}, [""]);

return (

      <Grid
        container
        spacing={3}>
        {catalogo.map((cata) => (
          <Grid
            xs={12}
            md={6}
            lg={4}
            key={cata.uid}>
            <CompanyCard company={cata} />
          </Grid>
        ))}
      </Grid>

  );
};
