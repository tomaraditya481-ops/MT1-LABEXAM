
import http from 'http';
import fs from 'fs';

const cart = [
    {
        id: 1,
        productName: 'Laptop',
        price: 50000,
        quantity: 1
    },
    {
        id: 2,
        productName: 'Mouse',
        price: 500,
        quantity: 2
    }
];

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Welcome to Shopping Cart</h1>');
    }

    else if (req.url === '/cart' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(cart));
    }

    else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>About Shopping Cart</h1><p>This application manages shopping cart items.</p>');
    }

    else if (req.url === '/home') {
        fs.readFile('./public/index.html', (err, data) => {

            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.end('Error loading home page');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }

        });
    }

});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});
