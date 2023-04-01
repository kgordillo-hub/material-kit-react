import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


import {Dashboard} from 'src/sections/overview/dashboard'







const Page = () => (

  <>
    <Head>
      <title>
        Overview | MLForex
      </title>
    </Head>
    <Dashboard />
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
