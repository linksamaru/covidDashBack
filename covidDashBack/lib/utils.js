/*
* @Author: Marcos Martin Davila
*/

const colores = {
	Reset: "\x1b[0m",
	Bright: "\x1b[1m",
	Dim: "\x1b[2m",
	Underscore: "\x1b[4m",
	Blink: "\x1b[5m",
	Reverse: "\x1b[7m",
	Hidden: "\x1b[8m",
	FgBlack: "\x1b[30m",
	FgRed: "\x1b[31m",
	FgGreen: "\x1b[32m",
	FgYellow: "\x1b[33m",
	FgBlue: "\x1b[34m",
	FgMagenta: "\x1b[35m",
	FgCyan: "\x1b[36m",
	FgWhite: "\x1b[37m",
	BgBlack: "\x1b[40m",
	BgRed: "\x1b[41m",
	BgGreen: "\x1b[42m",
	BgYellow: "\x1b[43m",
	BgBlue: "\x1b[44m",
	BgMagenta: "\x1b[45m",
	BgCyan: "\x1b[46m",
	BgWhite: "\x1b[47m"
};

/*
* @params: origin: primary object
* @params: target: secondary object
* @function: it merges content from secondary object overwriting with possible coincident properties of primary target
* @returns: it returns an object with a merge of those entering objects and overwriting the coincident properties
*/

let merge = (origin,target) => {
	return new Promise((resolve,reject) => {
		try { let originKeys = Object.keys(origin), targetKeys = Object.keys(target), res = {};
			  targetKeys.forEach((t) => { res[t] = target[t]; });
			  originKeys.forEach((o) => { res[o] = origin[o]; });
			  resolve(res);
		} catch (e) { console.error('Error while merging objects',e); reject(e); }
	});
};
module.exports = {colores,merge};
