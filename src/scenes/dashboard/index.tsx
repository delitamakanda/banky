import { Box, useMediaQuery, useTheme } from "@mui/material";
import DashboardBox from '@/components/DashboardBox';
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

const gridTemplateLargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
`;

const gridTemplateSmallScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"
`;

const Dashboard = () => {
    const isAboveMediumScreen = useMediaQuery("(min-width: 1200px)");
    const { palette } = useTheme()
    return <Box color={ palette.grey[300]} width="100%" height={isAboveMediumScreen? "100%": "auto"} display="grid" gap="1.5rem" sx={ isAboveMediumScreen ? { gridTemplateColumns: "repeat(3, minmax(370px, 1fr))", gridTemplateRows: "repeat(10, minmax(60px, 1fr))" ,gridTemplateAreas: gridTemplateLargeScreens} : { gridAutoColumns: "1fr", gridAutoRows: "80px" , gridTemplateAreas: gridTemplateSmallScreens }}>
        <Row1 />
        <Row2 />
        <Row3 />
    </Box>
}

export default Dashboard;