import { ArticleStructure, Card, Markdown, Metadata } from "../components";

/** page after submission */
export default function Submitted({ markdownText, author, date }) {
    return (
        <ArticleStructure>
            <Markdown markdownText={ markdownText } />
            
            <div className="space-y-6 text-lg">
                <Metadata author={ author } date={ date } />
                <Card className="py-3">
                    <div>submitted emailed to</div>
                    <div className="text-base text-right text-primary">tadahiroueta@gmail.com</div>
                </Card>
                <Card className="text-3xl font-semibold text-center text-primary">THANK YOU!</Card>
            </div>
        </ArticleStructure>
)}