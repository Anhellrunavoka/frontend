import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { baseApi } from "../../api/baseApi";
import { removeToken } from "../../store/authSlice";
import { useDispatch } from "react-redux";


const Navbar = () => {
    const {user,isAuth}=useAuth();
    const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(removeToken());
        dispatch(baseApi.util.resetApiState());
        //dispatch(baseApi.util.invalidateTags(["User"]));
    };
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
                    {isAuth && (
                        <Button component={NavLink} to="/create-article" >
                            Create Article
                        </Button>
                    )}
                    {isAuth?(
                        <>
                            <Link to="/profile">
                                <Avatar>
                                    {user?.name?.[0]?.toUpperCase()??"?"}
                                </Avatar>
                            </Link>
                            <Button onClick={handleLogout}>
                                Exit
                            </Button>
                    </>
                    ):(<Button component={NavLink} to="/login">
                        Login
                    </Button>)}

                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
