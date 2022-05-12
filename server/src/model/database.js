const {MongoClient} = require('mongodb');


const connectToDb = async ()=>{
    try {
        const client= await MongoClient.connect('mongodb://localhost:27017/')

        return client.db("bookhouse")
    } catch (error) {
        console.log(error, "database Error")
    }
   
}

module.exports= {
    connectToDb
}