// eslint-disable-next-line no-undef
module.exports = function (api) {
	api.cache(true);
	// [
	// 	[
	// 		"react-native-reanimated/plugin",
	// 	]
	// ];
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["."],
					extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
					alias: {
						"components": "./src/components",
						"src": "./src",
					}
				},
			],
			"react-native-reanimated/plugin"
		]
	};
};
