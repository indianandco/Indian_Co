import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
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

import { fetcher } from '../../../../utils/fetcherGet';
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



export default function LinesChart() {

    const [response, setResponse] = useState(null)


    const getInfo = async () => {
        const responseFn = await fetcher(`/adminDashboard/tickets/week`)
        setResponse(responseFn)
    }

    useEffect(() => {
        getInfo()
    }, [])
    if (!response) return null
    let days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

    const weekSales = {
        labels: days,
        datasets: [
            {
                label: 'Ventas',
                data: Object.values(response),
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(0, 0, 0, 0.589)',
                backgroundColor: 'rgba(16, 160, 237, 0.903)',
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

    return <Line data={weekSales} options={options} />
}