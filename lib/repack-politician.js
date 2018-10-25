const buildDescription = require('./build-description')

module.exports = data => {
  if (!data) {
    throw new Error('Missing required input')
  }

  const info = {
    title: data.name,
    description: buildDescription(data),
    url: `${process.env.SITE_URL}/politicians/${data.recno}`
  }

  const extras = {
    mobile: data.mobilePhone,
    mail: data.publicMail,
    committees: data.committees,
    committeeIds: data.committeeIds
  }

  return { ...info, ...extras }
}
