export const handleError = (error, res) => {
  res.status(error.status || 500);

  res.json({
    message: error.message,
  });
};
