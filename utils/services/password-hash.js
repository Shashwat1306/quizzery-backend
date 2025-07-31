import bcrypt from 'bcrypt';
export const encryptPassword = async (PlainPassword) => {
    console.log(process.env.SALT,'type of',typeof process.env.SALT);
    return bcrypt.hash(PlainPassword, parseInt(process.env.SALT));
}
export const compareHash=(PlainPassword,dbpassword)=>{
    return bcrypt.compareSync(PlainPassword, dbpassword);
}