import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
        {
            label: 'Ventas mensuales',
            data: [12, 19, 3, 5, 2, 3, 1, 22, 23, 25, 33, 7],
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)',
                'rgba(18, 37, 248, 0.4)',
                'rgba(237, 250, 48, 0.4)',
                'rgba(0, 238, 28, 0.4)',
                'rgba(255, 40, 117, 0.4)',
                'rgba(150, 99, 232, 0.4)',
                'rgba(99, 255, 180, 0.4)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(18, 37, 248, 1)',
                'rgba(237, 250, 48, 1)',
                'rgba(0, 238, 28, 1)',
                'rgba(255, 40, 117, 1)',
                'rgba(150, 99, 232, 1)',
                'rgba(99, 255, 180, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    plugins: {
        legend: {
            labels: {
                color: 'black',
            }
        }
    }
};

export function DoughnutChart() {
    return <Doughnut data={data} options={options} />;
}
