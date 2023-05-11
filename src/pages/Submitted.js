import { ArticleStructure, Card, Markdown, Metadata } from "../components";

/** page after submission */
export default function Submitted({ markdownText, author, date }) {
    return (
        <ArticleStructure>
            <Markdown markdownText={ markdownText } />
            
            <div className="text-lg space-y-6">
                <Metadata author={ author } date={ date } />
                <Card className="py-3">
                    <div>submitted emailed to</div>
                    <div className="text-base text-primary text-right">tadahiroueta@gmail.com</div>
                </Card>
                <Card className="text-3xl text-primary text-center font-semibold">THANK YOU!</Card>
            </div>
        </ArticleStructure>
)}