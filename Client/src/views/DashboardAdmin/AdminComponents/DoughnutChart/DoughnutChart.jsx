import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { fetcher } from '../../../../utils/fetcherGet';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
    const [yearSales, setYearSales] = useState();

    const getInfo = async () => {
        const response = await fetcher(`/adminDashboard/tickets/year`)
        setYearSales(response)
    }

    useEffect(() => {
        getInfo()
    }, [])

    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Ventas mensuales',
                data: yearSales,
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

    return <Doughnut data={data} options={options} />;
}
