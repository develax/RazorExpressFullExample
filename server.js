const path = require("path");
const express = require("express");
const app = express();

// Create & register Razor-Express view engine for Express.
const raz = require("raz");
raz.register(app); 

const port = 1337;
app.use(express.static("public"));

app.get('/', (req, res) => {
    let links = [
        { name: "Nested layouts", url: "/nested-layouts", group: "Layouts" },
        { name: "Full path layout", url: "/full-path-layout", group: "Layouts" }
    ];
    
    res.render("./index", { links });
});

app.get('*', (req, res) => {
    if (req.path.endsWith("favicon.ico"))
        return null;
        
    let routePath = path.join(".", req.path, "index");
    res.render(routePath, { });
});

// Init default Razor error handler.
raz.handleErrors(app);

// Start server.
app.listen(port, () => {
    console.log("Server is up on port " + port);
}).on("error", (err) => {
    console.error("[!] Error starting server: " + err.message);
});