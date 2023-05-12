import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { app, credentials } from '../mongo';
import { ArticleStructure, Markdown, Metadata } from '../components';

export default function Article() {
    const [content, setContent] = useState({})
    
    const { term } = useParams()

    useEffect(() => { 
        (async () => {
            const user = await app.logIn(credentials);
            user.functions.getArticle(term)
                .then(article => setContent(article));
        })();
    }, [term])

    return (
        <ArticleStructure>
            <Markdown markdownText={ content.markdown } />
            <Metadata author={ content.author } date={ content.date } />
        </ArticleStructure>
    )
}