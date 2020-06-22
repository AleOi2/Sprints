
const { sideBarInput } = require("../model/sideBarInput");
const { url } = require('../constants/constants')
const { Category, Users } = require('../Sequelize/model')


const pickSaldo = (id) => {
    return Users.findAll({
        where: {
            id: id
        },
        attributes: [
            'saldo',
        ]
    })
}

const homeController = async (req, res) =>{
    if(!req.cookies.user){
        res.render('home/home',
        {
            token: req.cookies.token, 
            user: req.cookies.user
        });
    }else{
        let saldo;
        saldo = await pickSaldo(req.cookies.user.id);
        saldo = (saldo[0].dataValues.saldo !== null) ? saldo[0].dataValues.saldo : -1;
        let category = await Category.findAll().then((result) =>{

            return result.map((element) =>{
                return{
                    category:element.dataValues.label,
                    type:element.dataValues.type,
                    categoryType:element.dataValues.category.replace('.png', ''),
                }
            })       
        })

        res.render('dashboard/dashboard',{
            sideElement:sideBarInput, 
            token: req.cookies.token, 
            user: req.cookies.user,
            url: url,
            saldo:saldo,
            category:category
        });

        
    }
}

module.exports = homeController;