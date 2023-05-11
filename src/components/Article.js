import ReactMarkdown from 'react-markdown'

const lorem = 
`# Lorem Ipsum

### Lorem Ipsum: What is it and Why is it Used?
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tortor tellus. Sed sit amet magna odio. Aliquam erat volutpat. Nullam luctus quam sapien, vitae facilisis quam varius ac.

### The History of Lorem Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elementum varius lorem vel suscipit. Nunc ornare nulla in tortor hendrerit ultricies. Vestibulum et massa eget lacus semper pharetra. Sed sit amet eleifend ipsum. Quisque id nibh ac lectus aliquam placerat.

### Why is Lorem Ipsum Used?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit tellus et metus vestibulum, sed pharetra augue commodo. Aenean faucibus libero in massa ullamcorper euismod. Sed ornare ex ac arcu euismod, ut bibendum nulla sollicitudin. Sed viverra vel purus id mollis. Donec id turpis ut libero malesuada consequat.`;

export default function Article() {
    return (
        <div className="flex justify-center">
            <div className="mb-32 w-2/3 flex justify-between">
                
                <ReactMarkdown className="px-7 py-6 w-160 bg-white prose">{ lorem }</ReactMarkdown>
                
                <div className="px-6 py-5 w-80 h-min bg-white">
                    <div className="text-xl">by <span className="text-3xl font-semibold text-primary">Hugh Jass</span></div>
                    <div className="flex justify-end text-lg">04/10/2023</div>
                </div>
            
            </div>
        </div>
    )
}