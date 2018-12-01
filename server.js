const path = require("path");
const express = require("express");
const app = express();
const raz = require("raz");
const port = 1337;

// Register Razor view engine for Express.
raz.register(app);
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
    // https://stackoverflow.com/a/50325607/1844247
    console.error("\x1b[5m", "\x1b[31m", "\x1b[43m","[!] Error starting server: " + err.message, "\x1b[0m");
});