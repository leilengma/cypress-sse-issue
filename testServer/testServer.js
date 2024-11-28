const http = require('http')
const fs = require('fs')

const startTestServer = () => {
    const server = http.createServer((req, res) => {
        if(req.url.endsWith('/events')) {
            handleSse(res);
        } else {
            deliverHtml(res)
        }
    })

    const deliverHtml = (res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.readFile(`${__dirname}/test.html`, (err, data) => {
            if(err) {
                console.error(err);
                res.writeHead(500);
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end()
        })
    }

    const handleSse = (res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("X-Accel-Buffering", "no");
        res.setHeader("Cache-Control", "no-cache");
        setInterval(() => {
            const data = `data: test\n\n`;
            res.write(data);
        }, 10000)
    }
    
    const PORT = 3008;
    server.listen(PORT, () => {
        console.log(`Test server running at http://localhost:${PORT}/`);
    });
}

module.exports = startTestServer