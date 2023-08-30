const { StatusCodes } = require("http-status-codes");

const responseHttp = (statusCode = StatusCodes.OK, success, message = null, data = null) => {
  return { statusCode: statusCode, headers: {
      "content-type": "application/json; charset=utf-8",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      Accept: "*/*",
      "Access-Control-Allow-Credentials": true},
    body: JSON.stringify({
        success,
        message,
        data},
      null,
      2
    ),
  };
}

const parseResponse = (response) => {
  return responseHttp(
    response.statusCode,
    response.success,
    response.message,
    response.data)
  }

const responseSuccess = ({ data, message = "Operación realizada exitosamente" }, statusCode = StatusCodes.OK) => {
  return {
    success: true,
    statusCode,
    message,
    data,
  }
};
  
const responseFail = ({ data = null, message = "Ha ocurrido un error" } = {}, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) => {
  return {
    success: false,
    statusCode,
    message,
    data
  }
};

module.exports = {
  parseResponse,
  responseSuccess,
  responseFail
};
