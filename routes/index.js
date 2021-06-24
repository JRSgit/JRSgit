const express = require('express')
const router = express.Router()
const db = require('../db')

/* GET home page. */
router.get('/',  function (req, res, next) {
  db.findCustomers().then((result) => {
    return res.render('index', {
      title: "Clientes",
      titleFor: "Cadastre seus clientes",
       customers: result,
       customer: {}
      })
  }).catch((err) => {
    return res.render('error',{
       message: 'Não foi possivel listar os clientes',
      error:err
      })
  });
  
})
// Inserir dados no banco
router.post('/post', (req, res) =>{
  const { nome, idade, regiao, uf, id} = req.body;
  const customers = {nome, idade,regiao, uf}
  if(!nome){
    return res.redirect('/?error=Coloque um nome')
  }
  if(!regiao){
    return res.redirect('/?error=Coloque seu Estado')
  }
  if(idade && !/[0-9]+/.test(idade)){
    return res.redirect('/?error=O campo idade é numérico')
  }
  console.log(`Esse é o ${id}`);

  const promise = id ? db.updateCustomers(id, customers)
                     : db.insertCustomers(customers)
  promise.then((result) => {
    return res.redirect('/')
  }).catch((err) => {
    return res.render('error',
    { message: 'Não foi possivel salva os dados do cliente', err})
  });

})
// Deletar dados do banco
router.get('/delete/:id', (req, res) =>{
  const { id } = req.params
  db.deleteCustomers(id).then((result) => {
    return res.redirect('/')
  }).catch((err) => {
    return res.render('error',{ message: 'Não foi possivel deetar o cliente', err})
  });
})
// Atualizar dados no banco
router.get('/edit/:id', (req, res) => {
  const { id } = req.params
  db.findOneCustomer(id).then((result) => {
    return res.render('index', {
      title: 'Edição de Clientes',
      titleFor: "Edite seu Cliente",
      customers: result,
      customer: result[0]
    })
  }).catch((err) => {
    return res.render('error',{ message: 'Não foi possivel editar o cliente', err})
  });
})



module.exports = router
