//3 steps
var express= require("express");//express we need to download
var app= express();
var path= require("path"); //this is build-in package
var bodyParser= require("body-parser");

//==========Settings: view engine, public folder, body-parser
app.set('view enine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

//=====Create dummy data
var camps= [{
   name: 'C1',
   image:"http://images.nymag.com/sw15_camping_3_540.jpg"
},{
   name: 'C2',
   image:"https://imagesus-ssl.homeaway.com/mda01/02b395e4-bd21-4c0c-8585-8b8ce56eb2c4.1.10"
},{
   name: 'C3',
   image:"https://www.mikkelpaige.com/wp-content/uploads/2014/10/mikkelpaige-berkshires_camp_wedding_photos-carly_devin_0058.jpg"
}];

//2: routes
app.get('/', function(req,res){
   res.render('landing.ejs'); 
});
app.get('/camps', function(req,res){
   res.render('camps.ejs',{camps:camps}); //pass value to camps.ejs
});
app.get('/camps/new', function(req,res){
   res.render('new.ejs',{camps: camps}); 
});
// this is the place when user submit the form
app.post('/camps', function(req, res){
   //1: get the user data
   var campName= req.body.name;
   var campImage= req.body.image;
   var newCamp= {name: campName, image: campImage};
   //2: update out camp array
   camps.push(newCamp);
   //3: re-render the /camps
   res.redirect('/camps');
});

//3: bring up your server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("camps setver is up!");
});