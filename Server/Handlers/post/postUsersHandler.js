const { postUsersController } = require("../../Controllers/post/postUsersController")

const postUsersHandler = async (req, res) => {
    try {
        const {first_name, last_name, gender, birthdate, address, zipcode, city, email} = req.body;
        console.log(first_name, last_name, gender, birthdate, address, zipcode, city, email)


       const newUser = await postUsersController({first_name, last_name, gender, birthdate, address, zipcode, city, email});
       console.log(newUser)

        res.status(200).send({result: 'success', payload: newUser })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postUsersHandler' ${error}`})
    }
}

module.exports = {
    postUsersHandler
}