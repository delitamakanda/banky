import { useState } from "react";
import {Link} from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import FlexBetween from "@/components/FlexBetween";
type Props = {};

const Footer = (props: Props) => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    return <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
        <FlexBetween gap="0.75rem">
            <DiamondIcon sx={{ fontSize: "30px"}} />
            <Typography variant="h4" fontSize="16px">
                Banky
            </Typography>
        </FlexBetween>
        <FlexBetween gap="2rem">
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link to="/contact" onClick={() => setSelected("contact")} style={{ color: selected === "contact" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                    contact
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link to="/about" onClick={() => setSelected("about")} style={{ color: selected === "about" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                    about
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link to="/pages/cgv" onClick={() => setSelected("pages/cgv")} style={{ color: selected === "pages/cgv" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                    cgv
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link to="/pages/legal" onClick={() => setSelected("pages/legal")} style={{ color: selected === "pages/cgv" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                    legal
                </Link>
            </Box>
            <Box></Box>
        </FlexBetween>
    </FlexBetween>
}

export default Footer;