const logOut =  async (req,res) =>{
    try {
        req.session.destroy((err) => {
            if (err) {
              res.status(500).send({ status: 'error', error: 'couldnt logout' });
            } else {
              console.log('Session destroyed successfully!');
              res.clearCookie('cookieToken');
            }
          });
        
    } catch (error) {
  
        res.status(500).send({ status: 'error', error });
    };
};

module.exports = {
    logOut
};