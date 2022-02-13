const fs = require("fs").promises;
const path = require("path");

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const recSearch = async (dir, filelist = []) => {
	const files = await fs.readdir(dir);

	for (file of files) {
		const filepath = path.join(dir, file);
		const stat = await fs.stat(filepath);

		if (stat.isDirectory()) {
			filelist = await recSearch(filepath, filelist);
		} else {
			filelist.push([stat.size, file]);
		}
	}

	return filelist;
};

// Set your path here
recSearch("/Users/restedarm/Desktop/Music/").then((res) => {
	res.sort((a, b) => b[0] - a[0]);

	for (var x in res) {
		fs.appendFile(
			"sorted_files.txt",
			`${res[x][1]} _____________ ${formatBytes(res[x][0])}` + "\n"
		);
	}
});
