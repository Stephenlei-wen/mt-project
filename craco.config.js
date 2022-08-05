const CracoAntDesignPlugin = require("craco-antd");

const lessModuleRegex = /\.module\.less$/;

module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                // less loader optoins
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                        sourceMap: false,
                    },
                },
                // 这个是按需导入
                babelPluginImportOptions: {
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: true,
                },
            },
        },
    ],
};
