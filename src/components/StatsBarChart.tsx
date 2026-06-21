'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface StatsBarChartProps {
  data: { name: string; value: number }[]
}

export function StatsBarChart({ data }: StatsBarChartProps) {
  // 데이터가 없을 때
  if (!data || data.length === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center text-sm text-slate-400">
        데이터가 부족합니다.
      </div>
    )
  }

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 11, fill: '#64748b' }}
            width={85}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            formatter={(value: any) => [`${value}회`, '클릭 수']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
          />
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
