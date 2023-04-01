import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';

const useChartOptions = (categories) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: true
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.5)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: true
    },

    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: categories,
      labels: {
        offsetY: 5,
        rotate: -75,
        style: {
          fontSize: '9px',
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
       labels: {
         formatter: (value) => (value > 0 ? `${value}` : `${value}`),
         offsetX: -10,
         style: {
           colors: theme.palette.text.secondary
         }
       }
     }
  };
};

export const OverviewSales = (props) => {
  const { chartSeries, sx, categories, title } = props;
  const chartOptions = useChartOptions(categories);

  return (
    <Card sx={sx}>
      <CardHeader
        title={"Resultado entrenamiento: " +title}
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="line"
          width="100%"
        />
      </CardContent>

    </Card>
  );
};

OverviewSales.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
