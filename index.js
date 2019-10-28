var express =require('express'),
path = require('path'),
bodyParser =  require('body-parser'),
cons = require('consolidate'),
dust = require('dustjs-helpers'),
pg = require('pg')
app = express();

// DB Connect String
var connect = "postgres://lomash:test123@localhost/tododb";

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

app.get('/',(req,res)=>{
    pg.connect(conString, (err,client,done){
        if(err){
            return console.error('error fetching client from pool',err)
        }
        client.query('SELECT ',['1'],(err,result))
    })
});

app.listen(3008,()=>console.log('successfully running on port'));