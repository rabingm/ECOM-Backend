export const handleError = (error, res) => {
  res.status(error.status || 500);

  res.json({
    status:"error",
    message: error.message,
  });
};
