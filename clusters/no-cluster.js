const http = require("node:http");

const server = http.createServer((req, res) => {
	// home route
	if (req.url === "/") {
		res.writeHead(200, { "Content-type": "text/plain" });
		res.end("Home Page");
	}

	// slow page simulation route
	if (req.url === "/slow-page") {
		// create a process that simulates heavy cpu usage
		for (let i = 0; i < 9999999999; i++) {}
		res.writeHead(200, { "Content-type": "text/plain" });
		res.end("Slow Page");
	}
});

server.listen(8000, () => {
	console.log("Server is running in port 8000");
});
