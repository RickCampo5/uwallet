'use strict'
const responseCodes = require('./httpResponseCodes')

class HttpError extends Error {
  constructor ({ message, name, statusCode, data }) {
    super(message)

    this.name = name
    this.statusCode = statusCode
    this.data = data
    Error.captureStackTrace(this, HttpError)
  }
}

class HttpBadRequest extends HttpError {
  constructor(message = 'Bad request', data) {
    super({
      message,
      name: "HttpBadRequest",
      statusCode: responseCodes.BAD_REQUEST,
      data
    });
  }
}

class UserNotFoundError extends HttpError {
  constructor (userID, ...params) {
    super(...params)

    this.userID = userID
    this.code = 404

    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, UserNotFoundError)
    }

    this.message = `User ID ${userID} not found in DB`
  }
} 

module.exports = {
  UserNotFoundError
}
