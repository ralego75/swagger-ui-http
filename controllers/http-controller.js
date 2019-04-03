const fs = require("fs")
const http = require("http")
const router = require('routes')()
const hostname = require('os').hostname()
const swaggerJSDoc = require('swagger-jsdoc')
const env = require("./../environmnets/environment")

var port = undefined
var host = undefined

const urlApiDocs = "/api-docs"
const urlActuatorInfo = "/actuator/info"
const urlActuatorHealth = "/actuator/health"

const INFO_MSG = "INFO"

const HTTP_STRING = "http://%s:%d"
const HTTP_WITH_ENDPOINT_STRING = "http://%s:%d%s"
const JSON_STRING = "JSON"
const JSON_HEADER = {
  "Content-Type": "application/json; charset=utf8",
  "Access-Control-Allow-Origin": "*"
}
const HTML_STRING = "HTML"
const HTML_HEADER = {
  "Content-Type": "text/html; charset=utf8",
  "Access-Control-Allow-Origin": "*"
}

const getDateTime = () => {
  var date = new Date()

  var hour = date.getHours()
  hour = (hour < 10 ? "0" : "") + hour

  var min = date.getMinutes()
  min = (min < 10 ? "0" : "") + min

  var sec = date.getSeconds()
  sec = (sec < 10 ? "0" : "") + sec

  var year = date.getFullYear()

  var month = date.getMonth() + 1
  month = (month < 10 ? "0" : "") + month

  var day = date.getDate()
  day = (day < 10 ? "0" : "") + day

  return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec
}

const getMessage = (msg, option, err) => {
  var message = ": [" + getDateTime() + "] ==> "
  if (msg)
    if (err)
      if (err.message) message += msg + ": " + err.message
  else message += msg + ": " + err
  else message += msg
  else
  if (err)
    if (err.message) message += err.message
  else message += err
  if (option) return message + " <<" + option + ">>"
  else return message
}

const getInfoMessage = (msg, option) => { return INFO_MSG + getMessage(msg, option) }

const printInfo = (msg, option, ...params) => console.log(getInfoMessage(msg, option), ...params)

const initLogs = () => {
  printInfo("Your server has started at port %d (" + HTTP_STRING + ")", null, port, hostname, port);
  printInfo("API Docs definition: " + HTTP_WITH_ENDPOINT_STRING, null, hostname, port, urlApiDocs)
  printInfo("Actuator Info API endpoint: " + HTTP_WITH_ENDPOINT_STRING, null, hostname, port, urlActuatorInfo)
  printInfo("Actuator Health API endpoint: " + HTTP_WITH_ENDPOINT_STRING, null, hostname, port, urlActuatorHealth)
}

const writeHead = (res, status, type) => {
  if (type === JSON_STRING) res.writeHead(status, JSON_HEADER)
  else if (type === HTML_STRING) res.writeHead(status, HTML_HEADER)
}

const distPath = "/dist/"


// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.1.0',
    description: 'Describing an API with Swagger',
  },
  host: host + ':' + port,
  basePath: '/'
}

// options for the swagger docs
const swaggerOptions = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./node_modules/swagger-ui-http/index.js'],
}

const getError = (error) => {
  return "{ \"message\": \"" + error.message.replace(/\\/g, "\\\\") + "\" }"
}

exports.readFile = (res, fileName, options) => {
  fs.readFile(__dirname.replace("\controllers", "") + distPath + fileName, (error, data) => {
    if (error) this.sendResponse(res, env.getHTTP().STATUS.CODE.NOT_FOUND, getError(error), env.getHTTP().OPTIONS.HEADERS.JSON)
    else this.sendResponse(res, env.getHTTP().STATUS.CODE.OK, data, options)
  })
}

exports.createServer = (router) => {
  http.createServer((req, res) => {
    var m = router.match(req.url)
    if (m) m.fn(req, res, m.params)
    else this.sendResponse(res, env.getHTTP().STATUS.CODE.INTERNAL_SERVER_ERROR, env.getHTTP().STATUS.MESSAGE.INTERNAL_SERVER_ERROR, env.getHTTP().OPTIONS.HEADERS.JSON)
  }).listen(this.getPort(), () => initLogs())
}

exports.sendResponse = (res, status, data, options) => {
  if (options) res.writeHead(status, options)
  else res.writeHead(status)
  res.end(data)
}

exports.sendJSONResponse = (res, data) => {
  writeHead(res, data.status, JSON_STRING)
  res.end(JSON.stringify(data.body));
}

exports.getRouter = () => { return router }

exports.getSwaggerSpec = () => { 
  swaggerOptions.swaggerDefinition.host = hostname + ':' + port
  return swaggerJSDoc(swaggerOptions)
}

exports.getPort = () => { return port }
exports.setPort = (serverPort) => { port = serverPort }

exports.getHost = () => { return host }
exports.setHost = (serverName) => { host = serverName }

exports.setSwaggerApis = (apis) => swaggerOptions.apis = swaggerOptions.apis.concat(apis)

exports.getUrlApiDocs = () => { return urlApiDocs }
exports.getUrlActuatorInfo = () => { return urlActuatorInfo }
exports.getUrlActuatorHealth = () => { return urlActuatorHealth }