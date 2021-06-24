// db.js
const {ObjectId } = require('mongodb')
const mongoClient = require('mongodb').MongoClient
// variavel de conecção som o banco
function connect(){
    if(!global.connection){
        mongoClient.connect(process.env.MONGODB_CONNECTION,
          { useUnifiedTopology: true, useNewUrlParser: true })
            .then( result => {
                //cria uma variavel global connection
                global.connection = result.db("aula3")
                console.log("Connected");
        
            }).catch(error => {
                global.connection = null
            }) 
    }
}
connect()
//Busca na coleção clientes
function findCustomers(){
    return global.connection
                 .collection('clientes')
                 .find({})
                 .toArray()
                 
}
// Busca um arquivo na coleção clientes
function findOneCustomer(id){
    return global.connection
                .collection('clientes')
                .find({ _id : ObjectId(id)})
                .toArray()
}
function insertCustomers(customers){
    return global.connection
                 .collection('clientes')
                 .insert(customers)
}
//Atuaiza arquivo na coleção clientes
function updateCustomers(id, customers){
    return global.connection
                 .collection('clientes')
                 .updateOne({_id: ObjectId(id)}, {$set : customers}, {new: true})
}
// Deleta aruivo na coleção clientes
function deleteCustomers(id){
     return global.connection
                 .collection('clientes')
                 .deleteOne({_id: ObjectId(id)})
    
                 
}
module.exports = {
     findCustomers, findOneCustomer,
      insertCustomers, updateCustomers,
       deleteCustomers 
    }
