import { Button, Typography } from "@mui/material";
import { useCreateArticleMutation, useGetArticlesQuery, useUpdateArticleMutation } from "../api/articlesApi";
import { Link } from "react-router-dom";

const Home = () => {
    const{data, isLoading, isError} = useGetArticlesQuery();
    const [createArticle,{isLoading: isCreating}] = useCreateArticleMutation();
    const[updateArticle] = useUpdateArticleMutation();
    if(isLoading) return <Typography>Loading...</Typography>;
    if(isError) return <Typography>Error loading articles.</Typography>;

    const articles = data?.data || [];
    const handleCreate = () => {
        createArticle({
            title: "New Article 3",
            content: "This is a new article.",
        })
    };
    const handleUpdate = () => {
        updateArticle({
            id: 1,
            title: "Updated Article 1",
            content: "This article has been updated.",
        });
    }
    return (
        <div>
            <Typography variant="h4" component="h1" color="secondary"  >
                Home
            </Typography>
            <Button variant="contained" onClick={handleCreate}>
                Create Article
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
                Update Article
            </Button>
            {articles.map((article:any) => (
                <Typography key={article.id} variant="h6" component="h2">
                    <h2><Link to={`/article/${article.id}`}>{article.title}</Link></h2>
                    <p>{article.content}</p>
                </Typography>
            ))}
        </div>
    );
}

export default Home;
