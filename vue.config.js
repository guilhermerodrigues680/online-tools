module.exports = {
  publicPath: "",

  chainWebpack: (config) => {
    // vue inspect --plugin html
    // Alterar titulo do html
    config.plugin("html").tap((args) => {
      args[0].title = "Online Tools - Webapp";
      return args;
    });
  },
};
