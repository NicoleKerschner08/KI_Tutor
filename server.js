var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function (req, res) {
    console.log(`Requested URL: ${req.url}`); 


    var filePathMap = {
        '/LandingPageSite.html':'LandingPageSite.html',
        '/': 'LandingPageSite.html',
        '/TutorPage.html': 'tutorPage.html',
        '/tutorPage.html': 'tutorPage.html',
        '/index.html': 'index.html',
        '/Kontaktliste.html': 'Kontaktliste.html',
        '/WieFunktionierts.html': 'WieFunktionierts.html',
        '/TermsOfUse.html': 'TermsOfUse.html',
        '/privacy-policy.html': 'privacy-policy.html'
    };

  
    var filePath = filePathMap[req.url];

    if (filePath) {
        serveFile(res, path.join(__dirname, filePath), 'text/html');
    } else {
        
        serveStaticAssets(req.url, res);
    }
});


function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.error("Error reading file:", err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<html><body><p>Server error: Could not read file.</p></body></html>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

function serveStaticAssets(url, res) {
   
    var assetPathMap = {
        '/style.css': 'style.css',
        '/LandingCSS.css': 'LandingCSS.css',
        '/tutorPage.css': 'tutorPage.css',
        '/Kontaktliste.css': 'Kontaktliste.css',
        '/WieFunktionierts.css': 'WieFunktionierts.css',
        '/TermsOfUse.css': 'TermsOfUse.css',
        '/privacy-policy.css': 'privacy-policy.css',
        '/LandingJS.js': 'LandingJS.js', 
        '/tutorPage.js': 'tutorPage.js', 
        '/support-svgrepo-com.svg': 'support-svgrepo-com.svg',
        '/learn-svgrepo-com.svg': 'learn-svgrepo-com.svg',
        '/LandingLogo.svg': 'LandingLogo.svg',
        '/favicon.ico': 'favicon.ico',
        '/time-sand-svgrepo-com.svg': 'time-sand-svgrepo-com.svg'
    };

    var filePath = assetPathMap[url];

    if (filePath) {
        var extname = path.extname(filePath);
        var contentType = 'text/plain';

        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.html':
                contentType = 'text/html';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            case '.svg':
                contentType = 'image/svg+xml';
                break;
            case '.ico':
                contentType = 'image/x-icon';
                break;
        }

        serveFile(res, path.join(__dirname, filePath), contentType);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><p>404 Not Found</p></body></html>');
    }
}
var IP_ADDRESS = '0.0.0.0'; 
var PORT = 9000;

server.listen(PORT, IP_ADDRESS, function () {
    console.log(`Node.js server running at http://${IP_ADDRESS}:${PORT}/`);
});
