const INTERNAL_SERVER_ERROR = "Internal Server Error"

var BODY = {}

const HTTP = {
    STATUS: {
        CODE: {
            OK: 200,
            NOT_FOUND: 404,
            INTERNAL_SERVER_ERROR: 500
        },
        MESSAGE: {
            OK: "OK",
            NOT_FOUND: "Not Found",
            INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR
        }
    },
    BODY: {
        OK: "Reference TopB2C process has finished sucessfully.",
        ERROR: "Error executing Reference TopB2C process."
    },
    OPTIONS: {
        HEADERS: {
            JSON: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Credentials': false,
                'Access-Control-Max-Age': '86400',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers , Access-Control-Allow-Methods , X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Accept-Encoding, Content-Encoding',
                'Accept': 'application/vnd.lmes.store.json, version=1',
                'Accept-Encoding': 'gzip',
                // 'Content-Encoding': 'gzip',
                'Content-Type': 'application/json, version=1'
            },
            HTML: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Credentials': false,
                'Access-Control-Max-Age': '86400',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers , Access-Control-Allow-Methods , X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
                'Content-Type': 'text/html'
            },
            CSS: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Credentials': false,
                'Access-Control-Max-Age': '86400',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers , Access-Control-Allow-Methods , X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
                'Content-Type': 'text/css'
            }
        }
    },
    ERRORS: {
        INTERNAL_SERVER_ERROR: "{ \'message\': INTERNAL_SERVER_ERROR }"
    }
}

exports.getHTTP = () => { return HTTP }

exports.getInfo = () => { return { status: HTTP.STATUS.CODE.OK, body: BODY } }

exports.getHelth = () => { return { status: HTTP.STATUS.CODE.OK, body: { "status": "UP" } } }

exports.getExecutionSucess = () => { return { status: HTTP.STATUS.CODE.OK, body: { "message": HTTP.BODY.OK } } }

exports.getExecutionError = () => { return { status: HTTP.STATUS.CODE.OK, body: { "message": HTTP.BODY.ERROR } } }