let revenue = {
    data: [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
    ],
    title: 'Revenue'
}

let costs = {
    data: [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
    ],
    title: 'Costs'

}

const { Users, Release } = require('../Sequelize/model')

const dashboardModel = {

    getData: async (req, res) => {
        try {
            console.log("Tentativa errada")
            console.log(Release)
            let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            console.log(now)
            // await Release.create({
            //     date: now,
            //     createdAt: now,
            //     updatedAt: now,
            //     description: "Vamos fazer alguns testes",
            //     'value':20,
            //     users_id: 1,
            //     category_id: 1
            // })

            Release.findAll({
                where: {
                    users_id: 1
                },
                include: {
                    model: Users,
                    required: true
                }
            }).then((response) => {
                console.log(response)
            })

            res.send({ revenue: revenue, costs: costs })

        } catch (error) {
            res.status(500).send(error)
        }

    }
}




module.exports = dashboardModel