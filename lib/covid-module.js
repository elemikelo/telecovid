const got = require('got');

exports.getInfectedByCovid = (inputDate) => {
  return new Promise((resolve, reject) => {
    const date = inputDate ? new Date(inputDate) : new Date()
    const formattedDate = date.toISOString().slice(0,10)
    const url = `https://api.covid19tracking.narrativa.com/api/${formattedDate}/country/spain`

    return got(url)
      .then(res => {
        const parsedResponse = JSON.parse(res.body).dates[formattedDate].countries['Spain']
        return resolve(parsedResponse)
      })
      .catch(reject)
  })
}
