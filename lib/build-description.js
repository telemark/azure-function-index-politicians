module.exports = data => {
  if (!data) {
    throw new Error('Missing required input')
  }

  let content = []
  const committeeNames = data.committees.map(item => item.name).join(', ')

  content.push(data.name)

  content.push(committeeNames)

  if (data.phone && data.phone.length > 0) {
    content.push('Telefon: ' + data.phone)
  }

  if (data.mobilePhone && data.mobilePhone.length > 0) {
    content.push('Mobil: ' + data.mobilePhone)
  }

  if (data.publicMail && data.publicMail.length > 0) {
    content.push('E-post: ' + data.publicMail)
  }

  return content.join(', ')
}
