import { Box, Button, TextField, Typography, Alert, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleSchema, type ArticleData } from "../validation/RegisterShceme";
import { useCreateArticleMutation } from "../api/articlesApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateArticlePage = () => {
    const [createArticle, { isLoading }] = useCreateArticleMutation();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<ArticleData>({
        mode: "onChange",
        resolver: zodResolver(ArticleSchema),
    });

    const onSubmit = async (data: ArticleData) => {
        try {
            setError(null);
            await createArticle(data).unwrap();
            navigate("/");
        } catch (err: any) {
            setError(err?.data?.message || "Failed to save article. Please try again later.");
            console.error("Create Article - Error:", err);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, px: 2 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Create New Article
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Заголовок статті"
                        margin="normal"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Текст статті"
                        margin="normal"
                        multiline
                        rows={8}
                        {...register("content")}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isLoading}
                        sx={{ mt: 3 }}
                    >
                        {isLoading ? "Publishing..." : "Publish Article"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreateArticlePage;