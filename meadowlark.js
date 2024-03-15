const express=require('express')
const expressHandlebars=require('express-handlebars')
const app=express()
//const { engine } = require ('express-handlebars');
//app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout:'main',
}))
//app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//app.set("views", "./views");
const port=process.env.PORT||3000
app.use(express.static(__dirname+'/public'))
const fortunes=[
    'mugi',
    'mugiiiiii',
    'mugiiiiiiiiiii',
    "mugïiiiiiiiiiiiii"
]
app.get('/',(req,res)=>res.render('home'))
app.get('/about/content',(req,res)=>{
    res.type('text/plain')
    res.send('content')
})
app.get('/about/direction',(req,res)=>{
    res.type('text/plain')
    res.send('direction')
})
app.get('/about',(req,res)=>{
    const randomFortune=fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about',{fortune:randomFortune})})

app.use((req,res)=>{
    res.status(404)
    res.render('404')
})
app.use((err,req,res,next)=>{
    console.error(err.message)
    res.status(500)
    res.render('500')
})
app.listen(port,()=>console.log('Express started on http://localhost:${port};'+'press ctrl c to terminate.'))