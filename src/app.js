letapp= require("./db")
app.conecta.connect(function(err) {
if(err) throwerr;
console.log("Banco Test Conectado!");
});