// eslint-disable-next-line no-undef
module.exports = function (api) {
	api.cache(true),
	[
		[
			"module-resolver",
			{
				root: ["."],
				extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
				alias: {
					"@components": "./src/components",
					"@src": "./src",
					"@assets": "./assets",
				}
			}
		]
	];
	return {
		presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
		plugins: [[
			"module-resolver",
			{
				root: ["."],
				extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
				alias: {
					"components": "./src/components",
					"src": "./src",
				}
			}
		]]
	};
};
