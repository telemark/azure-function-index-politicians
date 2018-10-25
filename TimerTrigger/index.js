const getData = require('../lib/get-data')

module.exports = async function (context) {
  const data = await getData()

  if (data.length > 0) {
    context.log(`Got data - ${data.length}`)
  } else {
    context.log(`Nothing to see.. move on`)
  }
}
