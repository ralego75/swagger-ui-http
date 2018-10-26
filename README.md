# swagger-ui-http
Swagger UI HTTP module.

---

[![Build Status](https://travis-ci.org/ralego75/swagger-ui-http.svg?branch=master)](https://travis-ci.org/ralego75/swagger-ui-http)
[![dependencies Status](https://david-dm.org/ralego75/swagger-ui-http/status.svg)](https://david-dm.org/ralego75/swagger-ui-http)

## Installation
npm install swagger-ui-http

## Prerequisites
If you are going to run your application on a different computer than your local one you will have to change the default IP defined for that purpose (IP: 127.0.0.1) in the index.html file belonging to our swagger-ui-http module.
In the same way, if you want to run your application in a different port than the one normally used for nodejs (port 3000), you will have to modify it as well in the same file.
```html
  <body>
    <div id="swagger-ui"></div>

    <script src="./swagger-ui-bundle.js"> </script>
    <script src="./swagger-ui-standalone-preset.js"> </script>
    <script>
    window.onload = function() {

      // Build a system
      const ui = SwaggerUIBundle({
        url: "http://127.0.0.1:3000/swagger.json",
        validatorUrl: false,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      })

      window.ui = ui
    }
  </script>
  </body>
```

```
// New server address: servername.domain.com
// New port: 5010
url: "http://servername.domain.com:5010/swagger.json"
```

## Usage
When you require to usage  of the  swagger-ui-http module you must get the router first, indicating in the same moment the server name and the port number in which your application will be executed.
The 'apis' parameter have to be defined with the file name list in which you have included endpoints within the router and you want them to be added equally in the Swagger UI display.
Finally, within the parameter 'info' you could include all that predefined information, such as application configuration, version, url published and any other information relevant to your application, sensitive to be consulted at any time.
```javascript
const host = 'servername.domain.com'
const port = 5010
const apis = ['./index.js']
const info = {
    appName: 'Swagger-UI-HTTP-Example',
    appVersion: '1.0.0',
    endpoints: {
        urlStatus: '/status'
    }
}

const router = require("swagger-ui-http").getRouter(host, port, apis, info)

const http = require("swagger-ui-http")

/**
 * @swagger
 * /status:
 *   get:
 *     tags:
 *       - status
 *     description: Return UP if the applications is running sucessfully.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK.
 */
router.addRoute(info.endpoints.urlStatus, (req, res, params) => http.sendJSONResponse(res, {status: http.getHTTP().STATUS.CODE.OK, body: { message: http.getHTTP().STATUS.CODE.MESSAGE } }))
```