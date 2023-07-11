import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetTransactionsQuery, useGetProductsQuery } from "@/state/api";
import { useTheme } from "@mui/material";

type Props = {};

const Row3 = (props: Props) => {
    const { palette } = useTheme()
    const { data: transactionData } = useGetTransactionsQuery();
    const { data: productData } = useGetProductsQuery();
    console.log('data: ', productData);
    console.log('data: ', transactionData);
    const countProducts = productData && productData.length || 0;
    const countTransactions = transactionData && transactionData.length || 0;
    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader progression={`${countProducts} products`} title="List of Products" />
            </DashboardBox>
            <DashboardBox gridArea="h">
                <BoxHeader progression={`${countTransactions} latest transactions`} title="Recent Orders" />
            </DashboardBox>
            <DashboardBox gridArea="i">
                <BoxHeader progression="+5%" title="Expense Breakdown By Category" />
            </DashboardBox>
            <DashboardBox gridArea="j">
                <BoxHeader progression="+15%" title="Overall Summary and Explanation Data" />
            </DashboardBox>
        </>
    )
}

export default Row3;