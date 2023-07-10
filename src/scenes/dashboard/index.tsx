import { Box, useTheme } from "@mui/material";

type Props = {}

const Dashboard = (props: Props) => {
    const { palette } = useTheme()
    return <Box color={ palette.grey[300]}>
        Dashboard
    </Box>
}

export default Dashboard;