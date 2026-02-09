const express=require("express")
const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port=3000
const morgan=require("morgan")
app.use(morgan("combined"))

const path=require("path")
app.use(express.static("public"))

const cors=require('cors')
app.use(cors())
//Create default API
app.get("/",(req,res)=>{
    res.send('Welcome to <font color="red">K2341111E</font> API');
})
app.get('/about',(req,res)=>{
    tbl="<table border='1'>"
    tbl+="<tr>"
    tbl+="<td> Student id: </td> <td>K234111409</td>"
    tbl+="</tr>"
    tbl+="<tr>"
    tbl+="<td> Student name: </td> <td>Yen Nhi</td>"
    tbl+="</tr>"
    tbl+="<tr>"
    tbl+="<td colspan='2'> <img src='images/nhi.jpg' width='210' height='250'/></td>"
    tbl+="</tr>"
    tbl+="</table>"
    res.send(tbl)
})
app.listen(port,()=>{
    console.log(`My server listening on port ${port}`)
})
let database=[
{"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản",
"Price":70,"Image":"b1.png"},
{"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao",
"Price":100,"Image":"b2.png"},
{"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"b3.png"},
{"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"b4.png"},
{"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"b5.png"},
]
app.get("/books",(req,res)=>{
    res.send(database)
})
app.get("/books/:id",cors(),(req,res)=>{
id=req.params["id"]
let p=database.find(x=>x.BookId==id)
res.send(p)
})