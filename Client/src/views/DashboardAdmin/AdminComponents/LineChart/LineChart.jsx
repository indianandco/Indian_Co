import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

let dailySales = [0, 56, 20, 36, 80, 40, 30, 25, 30, 12, 60];
let days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]


const weekSales = {
    labels: days,
    datasets: [
        {
            label: 'Ventas',
            data: dailySales,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(0, 0, 0, 0.589)',
            backgroundColor: 'rgba(221, 112, 28, 0.492)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 255, 255)',
            pointBackgroundColor: 'rgba(255, 255, 255)',
        },
    ],
};

const options = {
    plugins: {
        legend: {
            labels: {
                color: 'black', // Cambia el color del texto de los labels aquí
            }
        }
    },
    scales: {
        y: {
            min: 0
        },
        x: {
            ticks: { color: 'rgb(255, 255, 255)' }
        }
    }
};

export default function LinesChart() {
    return <Line data={weekSales} options={options} />
}