const { PredictCategory, Category } = require('../Sequelize/model/');


const predict = (id, category_id, now) =>{
    return PredictCategory.create({
        users_id: id,
        category_id:category_id,
        createdAt: now,
        updatedAt: now,
        valuePredict: 0,
    })
}

const insertInitialCategoriesPrediction = async (userId) =>{
    let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    Category.findAll().then(async (category) =>{
        let predictCreation = category.map((element) =>{
            return predict(userId, element.dataValues.id, now);
        })
        await Promise.all(predictCreation);
    })
}

module.exports = insertInitialCategoriesPrediction