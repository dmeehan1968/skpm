import path from 'path'

const fileRegex = /^(?!.*\.(jsx?|tsx?|json)$).*/ // match everything except .jsx? and .tsx? and json

const commandResourceLoader = {
  test: fileRegex,
  use: {
    loader: '@skpm/file-loader',
    query: {
      raw: true,
      outputPath(url) {
        return path.posix.join('..', 'Resources', '_webpack_resources', url)
      },
      publicPath(url) {
        // See https://github.com/airbnb/react-sketchapp/issues/216
        const resource = url.split('../Resources/')[1]
        return `((context) => {

          const parts = context
            .scriptPath
            .split('/')

          const index = parts
            .slice(0)
            .reverse()
            .findIndex(part => /.sketchplugin$/i.test(part))

            const root = parts.slice(0, -index).concat(['Contents', 'Resources']).join('/')

            return \`file://\${root}/${resource}\`;

        })(context)`
      },
    },
  },
}

export default commandResourceLoader
