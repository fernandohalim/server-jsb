const errorHandler = (res, error, customMessage) => {
  console.error('Error: ', error);

  if (error.name === 'SequelizeValidationError') {
    const validationErrors = error.errors.map(err => err.message);
    return res.status(400).json({
      title: 'Validation Error',
      message: validationErrors,
      details: error
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    const uniqueErrors = error.errors.map(err => err.message);
    return res.status(400).json({
      title: 'Unique Constraint Error',
      message: uniqueErrors,
      details: error
    });
  }

  if (error.name === 'MulterError') {
    return res.status(400).json({
      title: 'File Upload Error',
      message: error.message,
      details: error
    });
  }

  if (error.message === 'File type not allowed') {
    return res.status(400).json({
      title: 'File Type Error',
      message: 'Only images (jpeg, jpg, png) are allowed!',
      details: error
    });
  }

  if (error.code === 'ENOENT') {
    return res.status(404).json({
      title: 'File Not Found',
      message: 'The specified file could not be found',
      details: error
    });
  }

  if (error.code === 'EACCES') {
    return res.status(403).json({
      title: 'Permission Denied',
      message: 'You do not have permission to access this resource',
      details: error
    });
  }

  return res.status(500).json({
    title: 'Internal Server Error',
    message: customMessage || "An unexpected error occurred",
    details: error
  });
};

export default errorHandler;
