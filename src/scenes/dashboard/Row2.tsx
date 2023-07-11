import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { ResponsiveContainer, LineChart, ScatterChart, Scatter, CartesianGrid, XAxis, Tooltip, YAxis, Line, Cell, PieChart, Pie, ZAxis } from "recharts";


const Row2 = () => {
    const { palette } = useTheme()
    const data = [
        { name: 'Group A', value: 600 },
        { name: 'Group B', value: 400 },
    ];
    const COLORS = [palette.primary[800], palette.primary[300]];
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
    const productExpenseData = useMemo(() => {
        return (
            productData && productData.map(({ id, expense, price }) => {
                return {
                    id,
                    expense,
                    price
                }
            })
        )
    }, [productData])
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
        <DashboardBox gridArea="e">
            <BoxHeader progression="+5%" title="Campaigns and Targets" />
            <FlexBetween>
                <PieChart width={110} height={100} margin={{top: 0, right: -10, left: 10, bottom: 0}}>
                <Pie
                stroke="none"
                data={data}
                innerRadius={18}
                outerRadius={38}
                paddingAngle={2}
                dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                </PieChart>
                <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                    <Typography variant="h5">Target Sales</Typography>
                    <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>83</Typography>
                    <Typography variant="h6">Finance goals of the campaign that is desired</Typography>
                </Box>
                <Box flexBasis="40%">
                    <Typography variant="h5">Losses in Revenue</Typography>
                    <Typography variant="h6">Losses are down 25%</Typography>
                    <Typography variant="h5" mt="0.4rem">Profit Margins</Typography>
                    <Typography variant="h6">Margins are up by 30% from last month.</Typography>
                </Box>
            </FlexBetween>
        </DashboardBox>
        <DashboardBox gridArea="f">
            <BoxHeader progression="+5%" title="Product Prices vs Expenses" />
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                margin={{
                    top: 20,
                    right: 25,
                    bottom: 40,
                    left: -10,
                }}
                >
                <CartesianGrid stroke={palette.grey[800]} />
                <XAxis type="number" dataKey="price" name="price" tickLine={false} axisLine={false}  style={{ fontSize: '10px'}} tickFormatter={(v) => `$${v}`} />
                <YAxis type="number" dataKey="expense" name="expense" tickLine={false} axisLine={false}  style={{ fontSize: '10px'}}  tickFormatter={(v) => `$${v}`}  />
                <ZAxis type="number" range={[20]} />
                <Tooltip formatter={(v) => `$${v}`} />
                <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
                </ScatterChart>
            </ResponsiveContainer>
        </DashboardBox>
        </>
    )
}

export default Row2;