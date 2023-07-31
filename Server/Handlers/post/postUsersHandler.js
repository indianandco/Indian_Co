const { postUsersController } = require("../../Controllers/post/postUsersController");
const { getUserByEmailController } = require("../../Controllers/get/getUserByEmailController");

const postUsersHandler = async (req, res) => {
    try {
        const {first_name, last_name, gender, birthdate, address, zipcode, city, email, phone} = req.body;
        
        console.log(first_name, last_name, gender, birthdate, address, zipcode, city, email);

        //Validacion por si ya existe un usuario registrado con ese email. 
        const user = await getUserByEmailController(email);
        
        console.log(user);

        if(user) {
            return res.status(404).send({result: 'error', message: "Ya existe un usuario registrado con este email"});
        };

       const newUser = await postUsersController({first_name, last_name, gender, birthdate, address, zipcode, city, email, phone});
       console.log(newUser)

        res.status(200).send({result: 'success', payload: newUser });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postUsersHandler' ${error}`});
    };
};

module.exports = {
    postUsersHandler
};