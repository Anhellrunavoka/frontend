import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterData, RegisterSchema } from "../validation/RegisterShceme";
import { useRegisterMutation } from "../api/authApi";
import{Link} from "react-router-dom";
const RegisterPage = () => {

    const[registerUser]=useRegisterMutation();
    const{register,handleSubmit,formState:{errors}}=useForm({
        mode:"onChange",
        resolver: zodResolver(RegisterSchema)
    });
    const onSubmit=(data: RegisterData)=>{
        registerUser(data);
    };
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Register Page
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField variant="outlined" fullWidth label="Name" 
                margin="normal"
                 {...register("name")}  error={!!errors.name} helperText={errors.name?.message} />
                <TextField variant="outlined" fullWidth label="Email" margin="normal" {...register("email")}  error={!!errors.email} helperText={errors.email?.message}/>
                <TextField variant="outlined" fullWidth label="Password" type="password" margin="normal" {...register("password")}  error={!!errors.password} helperText={errors.password?.message}/>
                <TextField variant="outlined" fullWidth label="Confirm Password" type="password" margin="normal" {...register("confirmPassword")}  error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}/>
                <Button  variant="contained" fullWidth type="submit">
                    Register
                </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                    Already have an account? <Link to="/login">Login here</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default RegisterPage;