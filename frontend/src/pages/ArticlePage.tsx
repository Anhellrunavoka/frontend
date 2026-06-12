import { useParams } from "react-router-dom";
import { useGetArticleByIdQuery } from "../api/articlesApi";

const ArticlePage = () => {
    const { id } = useParams();
    const{data}=useGetArticleByIdQuery(id);
    const article = data?.data||{};
    return (
        <div>
            <h1>Article {article.title}</h1>
        </div>
    );
}

export default ArticlePage;