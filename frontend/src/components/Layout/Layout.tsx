import { Box, Container } from "@mui/material";
import{Outlet} from "react-router-dom";
import Navbar from "../Navbar/Navbar"
 
 const Layout = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Navbar />
            <Container component="main" sx={{flexGrow: 1, mt: 2}}>
                <Outlet />
            </Container>
            <Box>Footer</Box> 
        </Box>
    );
 }
 
 export default Layout;
 