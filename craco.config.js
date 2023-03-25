const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@constants": path.resolve(__dirname, "src/constants"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@providers": path.resolve(__dirname, "src/providers"),
            "@router": path.resolve(__dirname, "src/router"),
            "@service": path.resolve(__dirname, "src/service"),
            "@store": path.resolve(__dirname, "src/store"),
            "@customTypes": path.resolve(__dirname, "src/types"),
            "@utils": path.resolve(__dirname, "src/utils"),
        },
    },
};
