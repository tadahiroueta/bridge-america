import { ArticleStructure, CardOnRight, Markdown, Metadata } from "../components";

export default function Submitted({ markdownText, author, date }) {
    return (
        <ArticleStructure>
            <Markdown markdownText={ markdownText } />
            
            <div className="text-lg">
                <Metadata author={ author } date={ date } />
                <CardOnRight className="py-3">
                    <div>submitted emailed to</div>
                    <div className="text-base text-primary text-right">tadahiroueta@gmail.com</div>
                </CardOnRight>
                <CardOnRight className="text-3xl text-primary text-center font-semibold">THANK YOU!</CardOnRight>
            </div>
        </ArticleStructure>
    )
}