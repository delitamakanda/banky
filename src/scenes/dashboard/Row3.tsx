import DashboardBox from "@/components/DashboardBox";
import { useGetTransactionsQuery } from "@/state/api";
import { useTheme } from "@mui/material";

type Props = {};

const Row3 = (props: Props) => {
    const { palette } = useTheme()
    const { data } = useGetTransactionsQuery();
    console.log('data: ', data);
    return (
        <>
            <DashboardBox gridArea="g"></DashboardBox>
            <DashboardBox gridArea="h"></DashboardBox>
            <DashboardBox gridArea="i"></DashboardBox>
            <DashboardBox gridArea="j"></DashboardBox>
        </>
    )
}

export default Row3;