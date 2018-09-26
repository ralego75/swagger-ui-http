const env = require('./environmnets/environment')
const httpController = require('./controllers/http-controller')

const indexHtmlFile = 'index.html'
const jsExtension = '.js'
const cssExtension = '.css'
const urlSwaggerJson = '/swagger.json'
const urlFileNameJs = '/:file_name' + jsExtension
const urlFileNameCss = '/:file_name' + cssExtension

var router, swaggerSpec


exports.getRouter = (port, apis) => {
    // set server port.
    httpController.setPort(port)
    httpController.setSwaggerApis(apis)

    // router
    router = httpController.getRouter()

    // initialize swagger-jsdoc
    swaggerSpec = httpController.getSwaggerSpec()

    /**
     * @swagger
     * /actuator/info:
     *   get:
     *     tags:
     *       - ACTUATOR
     *     description: Retrieve the information of the application.
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Data information relative to the application.
     */

    router.addRoute(httpController.getUrlActuatorInfo(), (req, res, params) => httpController.sendJSONResponse(res, env.getInfo()))

    /**
     * @swagger
     * /actuator/helth:
     *   get:
     *     tags:
     *       - ACTUATOR
     *     description: Gives an UP value if the application is running properly.
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: "{ \"status\": \"UP\" }"
     */

    router.addRoute(httpController.getUrlActuatorHelth(), (req, res, params) => httpController.sendJSONResponse(res, env.getHelth()))

    router.addRoute(urlSwaggerJson, (req, res, params) => httpController.sendResponse(res, env.getHTTP().STATUS.CODE.OK, JSON.stringify(swaggerSpec, null, ' '), env.getHTTP().OPTIONS.HEADERS.JSON))

    router.addRoute(httpController.getUrlApiDocs(), (req, res, params) => httpController.readFile(res, indexHtmlFile, env.getHTTP().OPTIONS.HEADERS.HTML))

    router.addRoute(urlFileNameJs, (req, res, params) => httpController.readFile(res, params.file_name + jsExtension, env.getHTTP().OPTIONS.HEADERS.JSON))

    router.addRoute(urlFileNameCss, (req, res, params) => httpController.readFile(res, params.file_name + cssExtension, env.getHTTP().OPTIONS.HEADERS.CSS))

    httpController.createServer(router)

    return router
}