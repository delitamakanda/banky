/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { Avatar, Box, Divider, ListItemIcon, Typography, useTheme, Tooltip } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import FlexBetween from "@/components/FlexBetween";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from "@/state/auth";
import { Logout } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const lngs = {
    fr: { nativeName: 'FR' } as any,
    en: { nativeName: 'EN' } as any,
}

const Navbar = () => {
    const { palette } = useTheme();
    const { i18n } = useTranslation();
    const [selected, setSelected] = useState("dashboard");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [accountEl, setAccountEl ] = useState<null | HTMLElement>(null);
    
    const dispatch = useDispatch();

    const { token } = useSelector((state: { auth: { token: string }}) => state.auth);

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };
    const openAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAccountEl(event.currentTarget);
    };

    const closeAccountMenu = () => {
        setAccountEl(null);
    };

    const handleLogout = () => {
        dispatch(clearCredentials());
    }
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
            {!token ? 
                <>
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
                </>
            : <><Box sx={{ "&:hover": { color: palette.primary[100]}}}>
            <Tooltip title="Account settings">
          <IconButton
            onClick={openAccountMenu}
            size="small"
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
        </Box>
        <Menu
        anchorEl={accountEl}
        id="account-menu"
        open={Boolean(accountEl)}
        onClose={closeAccountMenu}
        onClick={closeAccountMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={closeAccountMenu}>
            <Avatar /> <Link to="/profile" style={{ color: palette.grey[800], textDecoration: "inherit"}}>
                    Profile
                </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={closeAccountMenu}>
                <ListItemIcon>
                <Logout fontSize="small" />
                </ListItemIcon>
                <Link to="/login" onClick={handleLogout} style={{ color: palette.grey[800], textDecoration: "inherit"}}>
                    logout
                </Link>
            </MenuItem>
      </Menu>
        </>
        }
        <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                {Object.keys(lngs).map((lng: string) => (
                    <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                    {lng}
                  </button>
                ))}
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
                <Link to="/contact" style={{ color: palette.grey[700], textDecoration: "inherit"}}>
                    contact
                </Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
                <Link to="/about" style={{ color: palette.grey[700], textDecoration: "inherit"}}>
                    about
                </Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
                <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                    <Link to="/pages/cgv" onClick={() => setSelected("pages/cgv")} style={{ color: selected === "pages/cgv" ? "inherit": palette.grey[700], textDecoration: "inherit"}}>
                        cgv
                    </Link>
                </Box>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
                <Link to="/pages/legal" style={{ color: palette.grey[700], textDecoration: "inherit"}}>
                    legal
                </Link>
            </MenuItem>
            </Menu>
        </FlexBetween>
    </FlexBetween>
}

export default Navbar;