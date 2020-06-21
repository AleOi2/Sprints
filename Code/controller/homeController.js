
const { sideBarInput } = require("../model/sideBarInput");
const { url } = require('../constants/constants')
const { Category } = require('../Sequelize/model')

const homeController = async (req, res) =>{
    if(!req.cookies.user){
        res.render('home/home',
        {
            token: req.cookies.token, 
            user: req.cookies.user
        });
    }else{
        let saldo = (req.cookies.user.saldo !== null)?req.cookies.user.saldo:-1;
        let category = await Category.findAll().then((result) =>{

            return result.map((element) =>{
                return{
                    category:element.dataValues.label,
                    type:element.dataValues.type,
                    categoryType:element.dataValues.category.replace('.png', ''),
                }
            })       
        })

        res.render('dashboard/dashboard',
        {
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