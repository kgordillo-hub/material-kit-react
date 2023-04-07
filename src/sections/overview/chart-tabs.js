import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Box} from '@mui/material';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export function ChartTabs(props) {


  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState(props.data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
        {
             data.map((data2, index) => {
                  if(data2.endPoint.endsWith('trainModel')){
                   return (
                   <Tab label={data2.nombreApp +' | '+ data2.descripcion} {...a11yProps(index)} key={data2.idTransaccion+'-tab'}/>
                   );
                }
            })
        }
        </Tabs>
      </Box>
     {
          data.map((data2, index) => {
           //console.log(data2);
              return (

                <TabPanel value={value} index={index} key={data2.idTransaccion+'-graph'}>
                    <OverviewSales
                      chartSeries={[
                        {
                          name: 'Valores reales',
                          data: data2.resultado.Real_values
                        },
                         {
                          name: 'Valores estimados',
                          data: data2.resultado.Predicted_values
                        }
                      ]}
                      sx={{ height: '100%' }}
                      categories = {data2.resultado.Dates}
                      title= {data2.nombreApp  +' | '+ data2.descripcion}
                    />
                </TabPanel>
            );

         })
     }
    </Box>
  );

}



