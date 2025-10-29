// This middleware catches all errors passed by next(error)
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong, please try again later',
    errors: null
  };

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    customError.message = 'Validation error';
    customError.statusCode = 400;
    customError.errors = Object.values(err.errors).reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
  }

  // Mongoose Duplicate Key Error
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    customError.statusCode = 400;
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    customError.message = `Resource not found with id of ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
    errors: customError.errors
  });
};

export default errorHandlerMiddleware;
