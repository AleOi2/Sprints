const { Users, Release, Category, PredictCategory } = require('../Sequelize/model')
const { Op } = require('sequelize')
const moment = require('moment');
const { safeAccess } = require('../utils/safeAcces');
const { validationResult } = require('express-validator');
moment().format();

const getData = (categoryType, id) => {
    return Release.findAll({
        where: {
            users_id: id,
            date: {
                [Op.gte]: moment().subtract(365, 'days').toDate().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            },
        },
        group: ['Release.month_year', 'Release.category_id'],
        order: [['month_year', 'DESC']],
        include: [
            {
                model: Users,
                required: true,
                attributes: ['name']
            },
            {
                model: Category,
                required: true,
                attributes: ['type', 'valuePredict', 'category', 'label'],
                where: {
                    type: categoryType
                }

            },
        ],
        attributes: [
            'month_year',
            'category_id',
            [Release.sequelize.fn('sum', Release.sequelize.col('Release.value')), 'sum'],

        ]
        // attributes:[
        //     'category_id',
        //     Release.sequelize.fn('sum', Release.sequelize.col('Release.value')),
        // ],
        // group:['Release.category_id'],
    }).then((response) => {
        return response.map((element, index) => {
            return element.dataValues
        }).filter((values) => values !== undefined)
    })
}

const predictPerCategory = (id) => {
    return PredictCategory.findAll({
        where: {
            users_id: id
        },
        include: [
            {
                model: Users,
                required: true,
                attributes: ['name']
            },
            {
                model: Category,
                required: true,
                attributes: ['type', 'category', 'label'],
            },
        ],
        attributes: [
            'valuePredict',
            'category_id',
            'users_id'
        ]
    })
}

const dashboardModel = {

    getRevenueCostsData: async (req, res) => {
        try {
            // let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            // await Release.create({
            //     date: now,
            //     createdAt: now,
            //     updatedAt: now,
            //     description: "Essas perguntas 45 ",
            //     'value':120,
            //     users_id: 1,
            //     category_id: 14
            // })
            // Filtering
            const allRevenueData = await getData('R', safeAccess(req, ['cookies', 'user', 'id'], undefined));
            const allCostsData = await getData('D', safeAccess(req, ['cookies', 'user', 'id'], undefined));
            res.send({ revenue: allRevenueData, costs: allCostsData })

        } catch (error) {
            res.status(500).send(error)
        }

    },
    getAllCategory: async (req, res) => {
        let category = await Category.findAll({})
        category = category.map((categ) => {
            return categ.dataValues.category.toUpperCase().replace('.PNG', '')
        })
        res.send(category);
    },
    
    getPredictedCategory: async (req, res) => {
        let predictedData = await predictPerCategory(safeAccess(req, ['cookies', 'user', 'id'], undefined));
        res.send(predictedData);
    },

    editPredictedCategory: async (req, res) => {
        try {
            let { valuePredict, users_id, category_id }  = req.body.prediction;
            let errors = validationResult(req).errors; 
            if(errors.length > 0 ){
                // res.status(400).send({err: "Validatiion result"})
                errors = parsedErrors(errors);
                res.send('usuarios/cadastroUsuario',{
                    err: errors, 
                    fields:{name, surname, email, password}
                })
                let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                PredictCategory.update({
                    valuePredict: parseFloat(valuePredict),
                    updatedAt:now
    
                }, {
                    where: {
                        users_id: users_id,
                        category_id:category_id
                    }
                }).then((res) =>{
                    return res
                })
            }else{
                console.log("Erramos")
                return res.status(422).send({msg: 'err'});

            }
        } catch (error) {
            return res.status(422).send({msg: 'err'});
        }
        // let predictedData = await predictPerCategory(safeAccess(req, ['cookies', 'user', 'id'], undefined));
        // res.send(predictedData);
    }

}


module.exports = dashboardModel