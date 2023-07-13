import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import FlexBetween from "@/components/FlexBetween";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';

const Navbar = () => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };
    return <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
        <FlexBetween gap="0.75rem">
            <DiamondIcon sx={{ fontSize: "30px"}} />
            <Typography variant="h4" fontSize="16px">
                Banky
            </Typography>
        </FlexBetween>
        <FlexBetween gap="2rem">
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link to="/" onClick={() => setSelected("dashboard")} style={{ color: selected === "dashboard" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                    dashboard
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link to="/balance" onClick={() => setSelected("balance")} style={{ color: selected === "balance" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                    balance
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link to="/predictions" onClick={() => setSelected("predictions")} style={{ color: selected === "predictions" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                    predictions
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link to="/login" onClick={() => setSelected("login")} style={{ color: selected === "login" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                    login
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link to="/signup" onClick={() => setSelected("signup")} style={{ color: selected === "signup" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                signup
                </Link>
            </Box>

            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                onClick={openMenu}
                color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </Box>

            <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="account-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            >
            <MenuItem onClick={closeMenu}>
                <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                    <Link to="/contact" onClick={() => setSelected("contact")} style={{ color: selected === "contact" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                        contact
                    </Link>
                </Box>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
                <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                    <Link to="/about" onClick={() => setSelected("about")} style={{ color: selected === "about" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                        about
                    </Link>
                </Box>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
                <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                    <Link to="/pages/cgv" onClick={() => setSelected("pages/cgv")} style={{ color: selected === "pages/cgv" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                        cgv
                    </Link>
                </Box>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
                <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                    <Link to="/pages/legal" onClick={() => setSelected("pages/legal")} style={{ color: selected === "pages/cgv" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                        legal
                    </Link>
                </Box>
            </MenuItem>
            </Menu>
        </FlexBetween>
    </FlexBetween>
}

export default Navbar;