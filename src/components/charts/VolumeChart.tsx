import { BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2"

Chart.register(BarElement,CategoryScale, LinearScale,Tooltip, Legend)

interface Props {
    percent_change_1h: string,
    percent_change_24h: string,
    percent_change_7d: string
}

export default function VolumeChart({percent_change_1h,percent_change_24h,percent_change_7d}:Props) {

    const chartData = {
        labels: ['1 Hour Change','24 Hours Change', '7 Days Change'],
        datasets: [
            {
                label: 'Percentage Change',
                data: [
                    parseFloat(percent_change_1h),
                    parseFloat(percent_change_24h),
                    parseFloat(percent_change_7d)
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', // Red
                    'rgba(54, 162, 235, 0.2)', // Blue
                    'rgba(75, 192, 192, 0.2)', // Green
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Red
                    'rgba(54, 162, 235, 1)', // Blue
                    'rgba(75, 192, 192, 1)', // Green
                ],
                borderWidth: 1,
            }
        ]
        
    }

    const chartOptions = {
        plugins: {
            title: {
              display: true,
              text: 'Chart.js Bar Chart - Stacked',
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
    };

  return <Bar data={chartData} options={chartOptions}/>;

}
