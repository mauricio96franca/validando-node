const { request } = require('express');
const express = require('express');
const yup = require('yup');


const app = express();
app.use(express.urlencoded({extended:true}))//// permissão do front para back, forçado. 

app.use(express.json());///para usar arquivos JSON




///routs
app.get('/', function(req, res){
    res.sendFile(__dirname+"/cadastro.html")
})

app.post('/add-user', async ( req, res ) => {
    const schema = yup.object().shape({
        senha: yup.string("Erro: Necessário prencher o campo senha").required("Erro: Necessário prencher o campo senha").min(6, "Erro: A senha precisa de pelo menos 6 caracteres").matches(/[a-zA-Z]/,"Erro: A senha precisa conter pelo menos 1 letra"),
        confirmSenha: yup.string().required("Erro: Necessário repetir a senha").oneOf([yup.ref('senha'), null], 'Senhas diferem'),
        email: yup.string("Erro: Necessário prencher o campo email").required("Erro: Necessário prencher o campo E-mail").email("Erro: E-mail inválido"),
        nome: yup.string("Erro: Necessário prencher o campo senha").required("Erro: Necessário prencher o campo nome")
    });

    try{
        await schema.validate( req.body ); 
    }catch( err ){
        return res.status(400).json({
               erro: true,
               mensagem: err.errors
        })
    }


    return res.json(
        {
            erro: false,
            mensagem:"Dados validados com sucesso"
        }
    )
})





////server
app.listen(3000, () => {
    console.log('Server rodando');
})