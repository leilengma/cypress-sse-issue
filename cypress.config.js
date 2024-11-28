const startTestServer = require('./testServer/testServer');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {

      on('before:browser:launch', (browser, launchOptions) => {
        startTestServer()
      })
    }
  },
}
