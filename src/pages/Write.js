import { useRef, useState } from "react";

import { ArticleStructure, Card, Markdown, Metadata } from "../components";

const writy = `
# {title}

This is markdown, a special text file type that lets you add styling through text alone. For example, to italicise text simply use ‘*’ around your text (*example*) or use ‘#’ to make headers like this:

### {header}

Don’t worry too much about this whole markdown stuff; just write clearly and concisely. This website was made to make information easily accessible, not to earn you a good English grade.

One last thing: make sure to edit the placeholders at the top of this file so properly displays the name, date, title... 

Thanks for help, by the way. You’re amazing.
 
Love, 

-L`;

const writy2 = 
`{name}
mm/dd/yyyy
` + writy;

/** where people can submit articles */
export default function Write() {
    const reference = useRef(null);
    const [markdownText, setMarkdownText] = useState(writy2);

    const handleChange = () => {}

    const handleClick = () => {}

    return (
        <ArticleStructure>
            <div className="">
                <Markdown markdownText={ writy } />
                <Metadata author="{name}" date="04/10/2023" />
            </div>
            <div>
                <textarea ref={reference} value={markdownText} onChange={handleChange}></textarea>
                <button onClick={handleClick}>
                    <Card>Submit</Card>
                </button>
            </div>
        </ArticleStructure>
    )
}