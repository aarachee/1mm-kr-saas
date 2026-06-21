'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts'

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
          margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            width={85}
          />
          <Bar dataKey="value" className="fill-primary" radius={[0, 4, 4, 0]} barSize={24}>
            <LabelList 
              dataKey="value" 
              position="right" 
              formatter={(val: any) => `${val}회`} 
              style={{ fill: 'hsl(var(--foreground))', fontSize: '11px', fontWeight: 'bold' }} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
