const cluster = require("node:cluster");
const http = require("node:http");

const os = require("node:os");

if (cluster.isMaster) {
	console.log(`Master process ${process.pid} is running`);

    // inicializamos un proceso por cada core que tengamos disponible.
	os.cpus().forEach(() => {
		cluster.fork();
	});

	// events handlers
	cluster.on("online", (worker) => {
		console.log("Worker with Process ID :- " + worker.process.pid + " online");
	});
	cluster.on("exit", (worker) => {
		console.log("worker " + worker.process.pid + " died...So setting up a new worker");
		cluster.fork();
	});
} else {
	const server = http.createServer((req, res) => {
		// home route
		if (req.url === "/") {
			console.log(process.pid);
			res.writeHead(200, { "Content-type": "text/plain" });
			res.end("Home Page");
		}

		// slow page simulation route
		if (req.url === "/slow-page") {
			console.log(process.pid);
			// create a process that simulates heavy cpu usage
			for (let i = 0; i < 9999999999; i++) {}
			res.writeHead(200, { "Content-type": "text/plain" });
			res.end("Slow Page");
		}
	});

	server.listen(8000, () => {
		console.log("Server is running in port 8000");
	});
}
