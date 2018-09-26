const assert = require("assert");

const http = require("./../index");
assert.ok(typeof http.getRouter === "function");