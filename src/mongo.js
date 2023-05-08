const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://public:public@cluster0.paewxxq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { serverApi: { // Stable API version
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}});

async function getMarkdown(name) { 
    await client.connect();
    const document = await client.db('database').collection('articles')
        .findOne({ name });
    
    client.close();
    return document.markdown;
} 

async function getTerms() { 
    await client.connect();
    const document = await client.db('database').collection('articles')
        .findOne({ name: "terms" });
    
    client.close();
    return document.terms;
}

async function upload(name, markdown) {
    await client.connect();
    await client.db('database').collection('uploads').insertOne({ name, markdown });
    client.close();
}

module.exports = { getMarkdown, getTerms, upload };
