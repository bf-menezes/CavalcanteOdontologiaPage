//Chamar o express:
const express = require('express')

//Nunjucks = template engine = motor que trabalha com templates.
//fazer reuso de código / usar algumas lógicas para apresentar uma página.
const nunjucks = require('nunjucks')

//Criar o servidor: irá executar o express que 
// é uma variável que se tornou uma função. 
//A função será chamada para dentro do servidor:
const server = express()

const videos = require("./data")

//Configurar o styles: o servidor precisa usar arquivos estáticos
//use(express.static('pasta desejada'))
// o server irá observar a pasta para servir os arquivos estáticos
server.use(express.static('public'))

// configurar a template engine (motor de view, onde vai usar)
server.set("view engine", "njk")

//arquivos njk são servidos pelo proprio nunjucks e não mais pelo html

//configurar com nunjucks 
//(caminho, objeto{vai usar o expresse na variavel server})
nunjucks.configure("views", {
    express:server
})

//adicionar rota (rota, callback: request: cliente; response: servidor)
server.get('/', function(req, res){
    const about = {
        imagem: "./Marca.png",
        propaganda: "Renove sua Auto estima e conheça sua melhor versão",
        descrição: "Clínica Odontológica com profissionais qualificados, acesso facilitado e estacionamento em frente. Aceita convênios ondológicos e atende todas as idades.",
        especialidades: [
            "Profilaxia (limpeza), raspagem",
            "Clareamento Dental",
            "Restaurações Estéticas: Lentes de contato e facetas",
            "Aparelhos Ortodônticos",
            "Próteses Odontológicas",
            "Implantes dentais"
        ],
        links: [
            { name: "Instagram", url: "https://www.instagram.com/cavalcante_odontologia/" },
            { name: "GoogleMaps", url: "https://g.page/cavalcante_odontologia?share" }
        ]
    }
    
    
    //responder a renderização de alguma view (pagina, {dados})
    return res.render("about", { about: about })
})

server.get('/portfolio', function(req, res){
    //enviar os dados pro frontend (videos)
    return res.render("portfolio", { items: videos })
})

server.get('/video', function(req, res) {
    const id = req.query.id
    
    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("video not found")
    }

    return res.render('video', {item: video})

})

//rota para pagina de erro 404 - not-found
server.use(function(req, res) {
    res.status(404).render("not-found")
  })

// Início do servidor (porta, callback)
server.listen(5000, function(){
})
