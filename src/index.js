const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//Initializations
const app = express();
require("./database");
//require("./config/passport");

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"), //dirección de carpeta "layouts".
    partialsDir: path.join(app.get("views"), "partials"), //son pequeñas partes de html para reutilizar.
    extname: ".hbs", //sirve para colocar que extensión van a tener nuestros archvivos.
    runtimeOptions:{  //es para poder tener acceso a las propiedades directamente de la base de datos MALA PRACTICA.
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
    }
    
}));

app.set('view engine', '.hbs');


//Middlewares -------------------------------------------------------------------------------------

app.use(express.urlencoded({extended: false})) //sirve para que reciba los datos que envia un user por form. False para no aceptar imagenes
app.use(methodOverride("_method")); //especificamos a traves de que input los formularios nos enviaran otros metodos no solo get o post
app.use(session({
    secret: "mySecretApp",
    resave: true,
    saveUninitialized: true
})); //apartir de estas sesiones de express nos va a permitir autenticar al usuario y almacenar los datos temporalmente.
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null; //guarda la información de CADA USUARIO.
    next();
});

//Routes
app.use(require("./routes/index"));
app.use(require("./routes/users"));
app.use(require("./routes/admin"));
app.use(require("./routes/client"));

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Server is listening
app.listen(app.get("port"), () =>{
    console.log("Server on port", app.get("port"));
});