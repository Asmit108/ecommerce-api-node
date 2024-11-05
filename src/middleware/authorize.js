
const authorize = (roles) => {
   return async(req, res, next) => {
      try {
         const role = req.headers.role
         if (!role) {
            return res.status(401).send({ error: "role not found..." })
         }
         if (roles.length == 1) {
            if (roles[0] != role) {
               return res.status(403).send({ error: "Access denied" })
            }
         }
      } catch (error) {
         res.status(500).send({ error: error.message })
      }
      next();
   }
}

module.exports = authorize