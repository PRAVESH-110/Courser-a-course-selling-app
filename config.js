//we could keep these pass inside their root files (user  and admin) but to prevent circular deoendancy (very hard to debug), we take a common file and import stuf from there

//now user.js etc import from here and also middlewares (admin, user)
const JWT_USER_PASSWORD=process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD=process.env.JWT_ADMIN_PASSWORD;

module.exports={
    JWT_ADMIN_PASSWORD:JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD: JWT_USER_PASSWORD
}