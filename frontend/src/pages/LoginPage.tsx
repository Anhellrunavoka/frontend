import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginData } from "../validation/RegisterShceme";
import { useLoginMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";

const LoginPage = () => {

    const[loginUser, { isLoading,error }]=useLoginMutation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const{register,handleSubmit,formState:{errors}}=useForm({
        mode:"onChange",
        resolver: zodResolver(LoginSchema)
    });
    const onSubmit=async (data: LoginData)=>{
        const user=await loginUser(data);
        dispatch(setToken(user.data.token));
        navigate("/");
    };
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Login Page
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField variant="outlined" fullWidth label="Email" margin="normal" {...register("email")}  error={!!errors.email} helperText={errors.email?.message}/>
                <TextField variant="outlined" fullWidth label="Password" type="password" margin="normal" {...register("password")}  error={!!errors.password} helperText={errors.password?.message}/>
                <Button type="submit" variant="contained" fullWidth >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default LoginPage;