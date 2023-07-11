import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend, Line } from "recharts";


const Row2 = () => {
    const { palette } = useTheme()
    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    console.log('data:', operationalData);
    const operationalExpenses = useMemo(() => {
        return (
            operationalData && operationalData[0].monthly_data.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
                return {
                    name: month.substring(0,3),
                    "Operational Expenses": operationalExpenses.split('$')[1],
                    "Non Operational Expenses": nonOperationalExpenses.split('$')[1]
                }
            })
        )
    }, [operationalData])
    return (
        <>
        <DashboardBox gridArea="d">
            <BoxHeader progression="+5%" title="Operational vs Non-Operational Expenses" />
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={operationalExpenses}
                margin={{
                    top: 20,
                    right: 0,
                    left: -10,
                    bottom: 55,
                }}
                >
                <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                <XAxis dataKey="name" tickLine={false} style={{ fontSize: '10px'}} />
                <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} style={{ fontSize: '10px'}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} style={{ fontSize: '10px'}} />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dot={true} dataKey="Non Operational Expenses" stroke={palette.tertiary[500]} />
                <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" dot={true} stroke={palette.primary.main} />
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox gridArea="e"></DashboardBox>
        <DashboardBox gridArea="f"></DashboardBox>
        </>
    )
}

export default Row2;