const getData = require('../lib/get-data')
const wakeupService = require('../lib/wakeup-service')
const deleteIndex = require('../lib/delete-index')
const repackPoliticians = require('../lib/repack-politician')
const prepareIndex = require('../lib/prepare-index')

module.exports = async function (context) {
  const data = await getData(context)

  if (data.length > 0) {
    context.log(`Got data - ${data.length}`)
    const service = await wakeupService(context)
    context.log(`Service awake: ${service ? 'yes' : 'no'}`)
    const result = await deleteIndex(context)
    context.log(`index deleted ${JSON.stringify(result)}`)
    context.log(`repacks data adds indexes to queue`)
    context.bindings.mySbQueue = data
      .map(repackPoliticians)
      .map(prepareIndex)
      .map(item => Object.assign({}, { id: item.id, payload: item }))
  } else {
    context.log(`Nothing to index`)
  }
  context.log(`finished`)
}
