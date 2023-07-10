import { Box } from "@mui/material";
import { styled } from "@mui/system";
const DashboardBox = styled(Box)(({ theme }) =>({
    backgroundColor: theme.palette.background.light,
    boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0, 0.8)",
    borderRadius: "1rem",
}));
export default DashboardBox;