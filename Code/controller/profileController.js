const { sideBarInput } = require("../model/sideBarInput");
const { url } = require("../constants/constants");
const { Users } = require("../Sequelize/model");

const profileController = {
    index: async (req, res) => {
        let userId = req.cookies.user.id;
        let user = await Users.findByPk(userId)
        console.log(user)



        res.render('perfil/perfil',
        {
            sideElement:sideBarInput, 
            token: req.cookies.token, 
            user,
            url: url,
        })
    },

    edit: async (req, res)=>{
        let userId = req.cookies.user.id;
        let { saldo } = req.body;
        saldo = parseFloat(saldo).toFixed(2);
        console.log(saldo)


            let altera = await Users.update({
                saldo: saldo
            },{
                where: { id: userId}
            })
        
            return res.redirect('/perfil')

    }
}
module.exports = profileController;