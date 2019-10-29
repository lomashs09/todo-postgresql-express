var express =require('express'),
path = require('path'),
bodyParser =  require('body-parser'),
cons = require('consolidate'),
dust = require('dustjs-helpers'),

app = express();


const { Client } = require('pg')

const client = new Client({
  user:"postgres",
  password:"test123",
  host:"localhost",
  port:5432,
  database:"tododb"
})
client.connect()
.then(()=>console.log('connected successfully'))
.catch(e=>console.log)
// .finally(()=>client.end())

// Assign Dust Engine to .dust files
app.engine('dust',cons.dust);

// Set Default Ext .dust
app.set('view engine','dust');
app.set('views',__dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',async(req, res)=>{
var result = await client.query('SELECT * FROM item')
console.log(result.rows)
  res.render('index',{item:result.rows})
    });
app.post('/add',async(req,res)=>{
  console.log(req.body)
  var item = req.body.newitem
  await client.query("INSERT INTO item(items) VALUES ($1)",[item])
  res.redirect('/');
})
app.delete('/delete',async(req,res)=>{
console.log(req.body)
})
app.post('/delete',async(req,res)=>{
  result = Object.keys(req.body)[0]
  await client.query(`DELETE FROM item WHERE id = ${result}`)
  res.redirect('/')
})

app.listen(3089,()=>console.log('successfully running on port'));