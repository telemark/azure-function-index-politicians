const sleep = require('then-sleep')
const getData = require('../lib/get-data')
const repackPoliticians = require('../lib/repack-politician')
const prepareIndex = require('../lib/prepare-index')

module.exports = async function (context) {
  const data = await getData(context)

  if (data.length > 0) {
    context.log(`Got data - ${data.length}`)
    const deleteIndex = { action: 'delete', payload: prepareIndex({}) }
    context.log(deleteIndex)
    sleep(10000)
    const addIndexes = data.map(repackPoliticians).map(prepareIndex).map(item => Object.assign({}, { action: 'add', payload: item }))
    context.log(`indexes - ${addIndexes.length}`)
    context.log(addIndexes[0])
  } else {
    context.log(`Nothing to index`)
  }
}
