import React from 'react';
import { PieChart,Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function Graph({ transactions }) {
    const revenus = transactions
    .filter (t => t.amount >= 0 )    
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const depenses = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
    const data = [
        { name: 'Revenus', value: revenus },
        { name: 'Dépenses', value: depenses }
    ];


    const total = revenus - depenses;



    const COLORS = ['#9B59B6', '#E04949'];
    const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'Galdeano, sans-serif',
      padding: '2rem',
      color: '#fff',
    },
    title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: '0.5rem 1rem',
    display: 'inline-block',
    borderRadius: '8px',
    color: '#fff',
    textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
    },
    total: {
      fontSize: '1.5rem',
      marginTop: '1rem',
      color: total >= 0 ? '#9B59B6' : '#E04949',
      fontWeight: 'bold',
    },
  };


    return (
        <div style={styles.container}>
            <div style = {styles.title}>Répartition Revenus/Dépenses</div>
        
            <div style ={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            dataKey="value"
                            labelLine={false}
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="#fff"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    style={{
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                                    }}
                                >
                                    {(percent * 100).toFixed(0)}%
                                </text>
                                );
                            }}
                            >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div style={styles.total}>
                Total: {total >= 0 ? '+' : ''}{total.toFixed(2)} €
            </div>
        </div>    
    );
}
export default Graph;