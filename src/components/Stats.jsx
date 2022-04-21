import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

const Stats = (props) => {
    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        weight: 'bold'
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'minutes'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const minutes = tooltipItem.raw;
                        return `Total: ${String(Math.floor(minutes)).padStart(2, '0')}:${String((minutes * 60) % 60).padStart(2, '0')}`;
                    }
                },
                displayColors: false
            }
        }
    };

    const data = {
        labels: Object.keys(props.data).map(date => date.slice(0, date.length - 5)),  // remove year
        datasets: [
            {
                data: Object.values(props.data),
                borderColor: '#759374',
                backgroundColor: '#759374',
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    return (
        <Line options={options} data={data} />
    );
}

export default Stats;