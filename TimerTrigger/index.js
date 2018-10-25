const getData = require('../lib/get-data')
const repackPoliticians = require('../lib/repack-politician')
const prepareIndex = require('../lib/prepare-index')

module.exports = async function (context) {
  const data = await getData(context)

  if (data.length > 0) {
    context.log(`Got data - ${data.length}`)
    context.bindings.mySbQueue = []
    const deleteIndex = prepareIndex({})
    const deleteMessage = { id: deleteIndex.id, action: 'delete', payload: deleteIndex }
    context.log(`adds deleteIndex to queue`)
    context.bindings.mySbQueue.push(deleteMessage)
    context.log(`repacks data adds indexes to queue`)
    data
      .map(repackPoliticians)
      .map(prepareIndex)
      .map(item => Object.assign({}, { id: item.id, action: 'add', payload: item }))
      .map(index => context.bindings.mySbQueue.push(index))
  } else {
    context.log(`Nothing to index`)
  }
  context.log(`finished`)
}
