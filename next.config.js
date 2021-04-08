module.exports = {
  webpack: (config) => {
    return Object.assign({}, config, {
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.gltf$/,
            loader: 'raw-loader',
          },
        ]),
      }),
    })
  },
}
