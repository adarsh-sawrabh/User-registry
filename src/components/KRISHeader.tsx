import React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { Avatar, Button, Typography, Menu, MenuItem } from "@mui/material";
import { ExitToApp as LogoutIcon } from "@mui/icons-material";

interface Admin {
    displayName: string;
}

interface KRISHeaderProps {
    currentUser: Admin | null;
    onLogin: () => void;
    onLogout: () => void;
}

const KRISHeader: React.FC<KRISHeaderProps> = ({ currentUser, onLogin, onLogout }) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const welcomeText = currentUser ? `Admin Dashboard` : "User Registration";

    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        onLogout();
        handleCloseUserMenu();
    };

    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: "#FFFFFF", boxShadow: "none", borderBottom: '1px solid gray' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
                        <Box sx={{ display: "flex" }}>
                            <img src={`/kris_logo.svg`} className="brand-logo" alt="logo" style={{ height: '30px' }} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {currentUser ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography variant="body1" sx={{ mr: 2 }}>
                                        Welcome, {currentUser.displayName}
                                    </Typography>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="user-menu"
                                        aria-haspopup="true"
                                        onClick={handleUserMenu}
                                        color="inherit"
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }}>
                                            {currentUser.displayName.charAt(0)}
                                        </Avatar>
                                    </IconButton>
                                    <Menu
                                        id="user-menu"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleLogout}>
                                            <LogoutIcon sx={{ mr: 1 }} />
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            ) : (
                                <Button variant="text" onClick={onLogin} sx={{ textTransform: "none", color: "black" }}>
                                    Admin
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box
                sx={{
                    backgroundImage: 'url("/background.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'left',
                    py: { xs: 2, sm: 3 },
                    px: 1,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        margin: '0px',
                        lineHeight: 1.5,
                        paddingLeft: '72px',
                        paddingRight: '120px',
                        fontFamily: 'KPMG Light',
                        fontWeight: 300,
                        fontSize: { xs: '28px', sm: '36px' },
                        color: 'rgb(255, 255, 255)'
                    }}
                >
                    Welcome
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        margin: '0px',
                        lineHeight: 1,
                        paddingLeft: '72px',
                        paddingRight: '120px',
                        fontFamily: 'KPMG Bold',
                        fontWeight: 400,
                        fontSize: { xs: '36px', sm: '46px' },
                        color: 'rgb(255, 255, 255)'
                    }}
                >
                    {welcomeText}
                </Typography>
            </Box>
        </>
    );
};

export default KRISHeader;