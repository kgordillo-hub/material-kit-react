import React, { useState, useEffect } from 'react';
import {ChartTabs} from 'src/sections/overview/chart-tabs';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewBudget } from 'src/sections/overview/overview-budget';


export function Dashboard() {

const [trainingData, setTrainingData] = useState();
const [predictData, setPredictData] = useState();
const [metricasData, setMetricasData] = useState();
const now = new Date();

const getResultados = () => {
   fetch('http://localhost:8088/consultarResultados/ksgordillo')
      .then((response) => response.json())
      .then((data) => {
         var new_data = []
         var predict = []
         for (var i = 0; i < data.length; i++){
            var obj = data[i];
            if(obj.endPoint && obj.endPoint.endsWith('trainModel')){
              var b64Decode_result = atob(obj.resultado);
              obj.resultado = JSON.parse(b64Decode_result);
              new_data.push(obj)
            }else if(obj.endPoint && obj.endPoint.endsWith('predict')){
              var b64Decode_result = atob(obj.resultado);
              obj.resultado = JSON.parse(b64Decode_result);
              predict.push(obj)
            }
         }
         setTrainingData(new_data);
         setPredictData(predict);
         }
      )
      .catch((err) => {
         console.log(err.message);
      });
};

const getMetricas = () => {
   fetch('http://localhost:8089/getMetricasGeneral/ksgordillo')
      .then((response) => response.json())
      .then((data) => {
         console.log('Metricas: ', data);
         for (var i = 0; i < data.length; i++){
            var obj = data[i];
            if(obj.metricas){
                for(var j = 0; j<obj.metricas.length; j++){
                    var obj2 = obj.metricas[j];
                    if(obj2.nombre=='MAE'){
                      obj.MAE=obj2.valor;
                    }else if(obj2.nombre=='MAPE'){
                      obj.MAPE=obj2.valor;
                    }else if(obj2.nombre=='RMSE'){
                      obj.RMSE=obj2.valor;
                    }
                }
            }
         }

         setMetricasData(data);
         console.log(data);
         }
      )
      .catch((err) => {
         console.log(err.message);
      });
};



useEffect(() => {
  getResultados();
  getMetricas();
}, [""]);

if (trainingData === undefined){
  return <>loading...</>;
}
return (
  <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
            key={predictData.idTransaccion+'-sum'}
          >
           {predictData.map((data) => {
              return(
                       <Grid
                         xs={12}
                         sm={6}
                         lg={4}
                         key={data.idTransaccion+'-chart'}
                       >
                         <OverviewBudget
                           title={data.descripcion + "-"+ data.nombreApp}
                           sx={{ height: '100%' }}
                           difference={Number(data.resultado.Predicted_values[1] - data.resultado.Predicted_values[0]).toFixed(2)}
                           positive={data.resultado.Predicted_values[1] - data.resultado.Predicted_values[0] > 0}
                           value={"$"+ Number(data.resultado.Predicted_values[1]).toFixed(2)  }
                           date={data.resultado.Dates[1]}

                         />
                       </Grid>
                  )
             }
           )}

          <ChartTabs id="tabs" data={trainingData}/>



            <Grid
              xs={12}
              sm={6}
              lg={3}
            >

            </Grid>


            <Grid
              xs={12}
              sm={6}
              lg={3}
            >

            </Grid>


            <Grid
              xs={12}
              md={12}
              lg={12}
            >

              <OverviewLatestOrders
                orders={metricasData}
                sx={{ height: '100%' }}
              />
            </Grid>
        </Grid>
      </Container>
  </Box>

);
}