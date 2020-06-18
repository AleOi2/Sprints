const { Users, Release, Category } = require('../Sequelize/model')
const { Op } = require('sequelize')
const moment = require('moment');
const { cookie } = require('express-validator');
const { safeAccess } = require('../utils/safeAcces');
moment().format();

const getData = (categoryType, id) => {
    return Release.findAll({
        where: {
            users_id:id,
            date: {
                [Op.gte]: moment().subtract(365, 'days').toDate().toISOString().replace(/T/, ' ').replace(/\..+/, '')
              },
        },
        group:['Release.month_year' ,'Release.category_id'],
        order: [['month_year', 'DESC']],
        include: [
            {
                model: Users,
                required: true,
                attributes:['name']
            },
            {
                model: Category,
                required: true,
                attributes:['type', 'valuePredict', 'category'],
                where:{
                    type:categoryType
                }

            },
        ],
        attributes:[
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

    }
}




module.exports = dashboardModel