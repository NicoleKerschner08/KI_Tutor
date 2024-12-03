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
        '/privacy-policy.html': 'privacy-policy.html',
        '/KI_tutorial.mp4': 'KI_tutorial.mp4'
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
        '/style.css': 'CSSFolder/style.css',
        '/LandingCSS.css': 'CSSFolder/LandingCSS.css',
        '/tutorPage.css': 'CSSFolder/tutorPage.css',
        '/Kontaktliste.css': 'CSSFolder/Kontaktliste.css',
        '/WieFunktionierts.css': 'CSSFolder/WieFunktionierts.css',
        '/TermsOfUse.css': 'CSSFolder/TermsOfUse.css',
        '/privacy-policy.css': 'CSSFolder/privacy-policy.css',
        '/LandingJS.js': 'JSFolder/LandingJS.js', 
        '/tutorPage.js': 'JSFolder/tutorPage.js', 
        '/support-svgrepo-com.svg': 'ImagesFolder/support-svgrepo-com.svg',
        '/learn-svgrepo-com.svg': 'ImagesFolder/learn-svgrepo-com.svg',
        '/LandingLogo.svg': 'ImagesFolder/LandingLogo.svg',
        '/favicon.ico': 'ImagesFolder/favicon.ico',
        '/time-sand-svgrepo-com.svg': 'ImagesFolder/time-sand-svgrepo-com.svg',
        '/Andra.png': 'ImagesFolder/Andra.png',
        '/Nicole.png': 'ImagesFolder/Nicole.png',
        '/Armin.png': 'ImagesFolder/Armin.png',
        '/Roman.png': 'ImagesFolder/Nicole.png',
        '/gruppenfoto.jpg': 'ImagesFolder/gruppenfoto.jpg',
        '/Instagram.png': 'ImagesFolder/Instagram.png',
        '/Maps.png': 'ImagesFolder/Maps.png',
        '/Youtube.png': 'ImagesFolder/Youtube.png',
        '/Facebook.webp': 'ImagesFolder/Facebook.webp',
        '/Email.png': 'ImagesFolder/Email.png',
        '/Schritt1.png': 'ImagesFolder/Schritt1.png',
        '/Schritt2.png': 'ImagesFolder/Schritt2.png',
        '/Schritt3.png': 'ImagesFolder/Schritt3.png',
        '/Schritt4.png': 'ImagesFolder/Schritt4.png'
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
            case '.mp4':
                contentType = 'video/mp4';
                break;
                
            case '.webp':
                contentType = 'image/webp';
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
