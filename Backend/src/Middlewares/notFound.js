const notFound = (req, res, next) => {
  res.status(404).json({ error: "La ruta solicitada no fue encontrada" });
};

export default notFound;
