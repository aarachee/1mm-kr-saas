'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'

interface StatsBarChartProps {
  data: { name: string; value: number }[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 p-2 shadow-md rounded-md border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100">
        <p className="font-bold">{`${payload[0].value}회`}</p>
        <p className="text-slate-500 dark:text-slate-400 text-[10px]">클릭 수</p>
      </div>
    );
  }
  return null;
};

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
          <Tooltip 
            cursor={{ fill: 'hsl(var(--muted))' }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={24}>
            <LabelList 
              dataKey="value" 
              position="right" 
              formatter={(val: number) => `${val}회`} 
              style={{ fill: 'hsl(var(--foreground))', fontSize: '11px', fontWeight: 'bold' }} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
