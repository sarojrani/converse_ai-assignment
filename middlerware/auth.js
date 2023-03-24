const jwt = require("jsonwebtoken");

const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        // console.log(token);

        if (!token) return res.status(401).send({ status: false, msg: "Token must be present" });
        //  console.log(token);

        let decodedToken = jwt.verify(token, "conversa.ai_assignment");
        // console.log(decodedToken);
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "You are not logged in , first try to login" });
        next()
    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}
module.exports ={authenticate};