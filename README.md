# swagger-ui-http
Swagger UI HTTP module.

---

[![Build Status](https://travis-ci.org/ralego75/swagger-ui-http.svg?branch=master)](https://travis-ci.org/ralego75/swagger-ui-http)

## Installation
npm install swagger-ui-http

## Usage
```javascript
const router = require("swagger-ui-http").getRouter(5503, ['./index.js'], {
    appName: 'Swagger-UI-HTTP-Test',
    appVersion: '1.0.0',
    endpoints: {
        urlStatus: '/status'
    }
})

const http = require("swagger-ui-http")

/**
 * @swagger
 * /status:
 *   get:
 *     tags:
 *       - TOPB2C
 *     description: Update the REFERENCES table with all the new daily rows.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Reference TopB2C process has finished sucessfully.
 */
router.addRoute("/status", (req, res, params) => http.sendJSONResponse(res, {status: 200, body: { message: 'Message received sucessfully.' } }))
```
