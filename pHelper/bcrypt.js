import bcrypt  from "bcrypt";

const saltRound = 10;

export const hashPassword = (plainPassword)=>{
return new Promise((resolve, reject) =>{
    try {
        resolve (bcrypt.hashSync(myPlaintextPassword, saltRound));

    } catch (error) {
        reject(error)
    }
})
}

export const comparePassword = (plainPassword, hashedPasswordFromDB)=>{
return new Promise((resolve, reject)=>{
    try {
        bcrypt.compare(plainPassword, hashedPasswordFromDB, function(err, result) {
            if(error)resolve(error)
            resolve(result)
        })
    } catch (error) {
        reject(error)
    }
})
}