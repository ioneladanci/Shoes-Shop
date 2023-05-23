

const Validation = (user) => {

    let errors = {}
    console.log(user);
    if (!user.email) {
        errors.name = "Email Required"
    } else {
        errors.name =""
    }
    if (!user.password) {
        errors.password = "Password Required"
    } else if (user.password < 5) {
        errors.password = "Password must be more than 5 char"
        console.log("daaaaaa")
    }

    return errors;

}

export default Validation;