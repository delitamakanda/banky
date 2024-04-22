/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetTransactionsQuery, useGetProductsQuery, useGetKpisQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";


const Row3 = () => {
    const { palette } = useTheme()
    const { data: operationalData } = useGetKpisQuery();
    const { data: transactionData } = useGetTransactionsQuery();
    const { data: productData } = useGetProductsQuery();

    const productColumns = [
        { field: 'id', headerName: 'id', flex: 1 },
        { field: 'expense', headerName: 'Expense', flex: 0.5, renderCell: (params: GridCellParams) => `$${(params.value as string)}` },
        { field: 'price', headerName: 'Price', flex: 0.5, renderCell: (params: GridCellParams) => `$${(params.value as string)}` },
    ];

    const transactionColumns = [
        { field: 'id', headerName: 'id', flex: 1 },
        { field: 'buyer', headerName: 'Buyer', flex: 0.5, renderCell: (params: GridCellParams) => `$${(params.value as string)}` },
        { field: 'amount', headerName: 'Amount', flex: 0.5, renderCell: (params: GridCellParams) => `$${(params.value as string)}` },
        { field: 'products_ids', headerName: 'Count', flex: 0.5, renderCell: (params: GridCellParams) => (params.value as Array<string>).length },
    ];

    const data = useMemo(() => {
        if (operationalData) {
            const totalExpenses = operationalData[0].total_expenses;
            return Object.entries(operationalData[0].expenses_by_category).map(([key, value]) => {
                return [
                    {
                        name: key,
                        value: +value.split('$')[1] as unknown as number,
                    },{
                        name: `${key} of Total`,
                        value: +totalExpenses - +value.split('$')[1] as unknown as number,
                    }
                ]
            })
        }
    }, [operationalData]);
    const COLORS = [palette.primary[800], palette.primary[300]];

    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader progression={`${productData?.length || 0 } products`} title="List of Products" />
                <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{"& .MuiDataGrid-root": {
                    color: palette.grey[300],
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                },
                "& .MuiDataGrid-columnHeaders": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                },
                "& .MuiDataGrid-columnSeparator": {
                    visibility: "hidden",
                }}}>
                    <DataGrid rows={productData || []} columns={productColumns} hideFooter={true} rowHeight={35} columnHeaderHeight={25} />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="h">
                <BoxHeader progression={`${transactionData?.length || 0} latest transactions`} title="Recent Orders" />
                <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{"& .MuiDataGrid-root": {
                    color: palette.grey[300],
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                },
                "& .MuiDataGrid-columnHeaders": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                },
                "& .MuiDataGrid-columnSeparator": {
                    visibility: "hidden",
                }}}>
                    <DataGrid rows={transactionData || []} columns={transactionColumns} hideFooter={true} rowHeight={35} columnHeaderHeight={25} />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="i">
                <BoxHeader progression="+5%" title="Expense Breakdown By Category" />
                <FlexBetween mt="0.5rem" gap="0.5rem" textAlign="center" p="0 1rem">
                    {data?.map((d, i) => (    
                    <Box key={`${d[0].name}-${i}`}>
                    <PieChart width={110} height={100} margin={{top: 0, right: -10, left: 10, bottom: 0}}>
                    <Pie
                    stroke="none"
                    data={d}
                    innerRadius={18}
                    outerRadius={35}
                    paddingAngle={2}
                    dataKey="value"
                    >
                    {d.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] as string} />
                    ))}
                    </Pie>
                    </PieChart>
                    <Typography variant="h5">{d[0].name}</Typography>
                    </Box>
                    ))}
                </FlexBetween>
            </DashboardBox>
            <DashboardBox gridArea="j">
                <BoxHeader progression="+15%" title="Overall Summary and Explanation Data" />
                <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={palette.primary[800]} borderRadius="1rem">
                <Box height="15px" bgcolor={palette.primary[600] as string} borderRadius="1rem" width="40%">
                </Box>
                </Box>
                <Typography margin="0 1rem" variant="h6">Overall Summary</Typography>
            </DashboardBox>
        </>
    )
}

export default Row3;