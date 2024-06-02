import { ArcElement, Chart, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement, Tooltip, Legend)

interface Props {
    csupply: number,
    tsupply: number,
    msupply: number
}

export default function SupplyChart({csupply, tsupply, msupply}:Props) {
    const remainingSupply = msupply - csupply;

    
    const chartData = {
        labels: ['Suministro Circulante', 'Suministro restante'],
        datasets: [
            {
                data: [csupply, remainingSupply],
                backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(201, 203, 207, 0.2)'],
                borderColor: ['rgba(255, 205, 86, 1)', 'rgba(201, 203, 207, 1)'],
                borderWidth: 1,
            }
        ]
    }
  return (
    <Doughnut data={chartData} />
  )
}
