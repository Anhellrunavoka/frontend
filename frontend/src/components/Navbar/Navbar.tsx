import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
             <Toolbar>
                <Typography variant="h6"  sx={{flexGrow: 1}}>
                    My App
                </Typography>
                <Box>
                    <Button  component={NavLink} to="/">
                        Home
                    </Button>
                    <Button component={NavLink} to="/articles">
                        Articles
                    </Button>
                    <Button component={NavLink} to="/products">
                        Products
                    </Button>
                    <Button component={NavLink} to="/register">
                        Register
                    </Button>
                    <Button component={NavLink} to="/apply">
                        Apply
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
