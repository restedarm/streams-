const fs = require("fs");
const moment = require("moment");
const Stream = require("stream");

fs.writeFile("./date.txt", "", function () {}); // to clear a txt file

function dateLogger() {
	readStream.push(moment().format());
}

const readStream = Stream.Readable({
	read() {},
});

const writeStream = Stream.Writable({
	write(chunk, encoding, next) {
		fs.appendFile("./date.txt", chunk, (err) => {
			if (err) {
				console.log(err);
			}
		});
		next();
	},
});

const transform = Stream.Transform({
	transform(chunk, encoding, next) {
		const transformChunk = chunk.toString().split("T").join("  ") + "\n";
		this.push(transformChunk);
		next();
	},
});

readStream.pipe(transform).pipe(writeStream);

setInterval(dateLogger, 1000);
