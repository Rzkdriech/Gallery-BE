export const checkAuth = (req, res, next) => {
  if (req.session && req.session.email) {
    return next()
  } else {
    return res.status(401).json({ msg: "unauthorized" })
  }
}
