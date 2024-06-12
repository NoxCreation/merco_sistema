// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostModel } from "@/backend/models/Product";
import { ProfileModel } from "@/backend/models/Profile";
import { UserModel } from "@/backend/models/User";
import { Manager, sequelize } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { where } from "sequelize";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {

  // Crear
  /* const user = await UserModel().create({
    firstName: 'Pedro',
    lastName: 'Hernandez'
  })
 */
  // Actualizar
  /* const user = await UserModel().update(
    {
      firstName: 'Josue'
    },
    {
      where: {
        id: 1
      }
    }
  ) */

  // Eliminar
  /* const user = await UserModel().destroy({
    where: {
      id: 2
    }
  }) */

  // Obtener todo
  /* const users = await UserModel().findAll()
  console.log(users[0].dataValues.firstName) */

  // Obtener uno
  /* const user = await UserModel().findOne({
    where: {
      id: 1
    }
  }) */

  // Obtener id
  /* const user = await UserModel().findByPk(2) */

  // Transaccion de relación
  /* try {
    await sequelize.transaction(async (t) => {
      const user = await UserModel().create({
        firstName: 'Pedro',
        lastName: 'Hernandez'
      }, { transaction: t });

      const profile = await ProfileModel().create({
        bio: 'JHgb dfdf',
        userId: user.dataValues.id
      }, { transaction: t });
    });

    console.log('Usuario y perfil creados exitosamente');
  } catch (error) {
    console.error('Hubo un error al crear el usuario y el perfil: ', error);
  } */

  /* const user = UserModel()
  const profiles = await ProfileModel(user).findAll({
    include: [{
      model: user,
      as: 'user'
    }]
  });
  console.log(profiles) */

  /* const profiles = (await Manager().Profile.findAll({
    include: [{
      model: UserModel(),
      as: 'user'
    }]
  })).toJSON()
  console.log(profiles) */

  /* const User = (await Manager().User.findOneById(10)).toJSON()
  console.log(User) */


  /* const profiles = (await Manager().Profile.findAll({
    include: [{
      model: UserModel(),
      as: 'user',
      where: {
        firstName: "Pedro2"
      }
    }]
  })).toJSON()
  console.log(profiles) */


  /* const user = (await Manager().User.findOne({
    where: {
      firstName: "Pedro"
    }
  })).toJSON()
  console.log(user) */

  /* try {
    const user = (await Manager().User.create({
      firstName: 'Pedro',
    })).query
    
    const project = (await Manager().Project.create({
      name: 'Proyecto Importante',
    })).query

    const post = (await Manager().Post.create({
      title: 'Nuevo post',
      content: 'Lorem',
      userId: user.dataValues.id
    })).query

    const profile = (await Manager().Profile.create({
      bio: 'Lorem',
      userId: user.dataValues.id
    })).query

    await user.addProject(project.dataValues.id);
  }
  catch (e){
    console.log("error", e)
  } */

  /* const page = 1;
  const pageSize = 2;
  const user = (await Manager().User.findAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    include: [
      {
        model: Manager().Profile.model, as: 'profile', include: [
          { model: Manager().User.model, as: 'user' }
        ]
      },
      {
        model: Manager().Post.model, as: 'posts', include: [
          { model: Manager().User.model, as: 'user' }
        ]
      },
      { model: Manager().Project.model, through: 'UserProject' }
    ]
  })).toJSON() */

  /* res.status(200).json({
    page,
    pageSize,
    data: user
  }); */

  /* try {
    const category = (await Manager().Category.create({
      name: 'Tecnologia',
      description: "Articulos de tecnologia"
    })).query

    const unit = (await Manager().Unit.create({
      name: 'unidad',
      symbol: ""
    })).query

    const product = (await Manager().Product.create({
      image: 'https://imagen.com/hybdf.png',
      code: 'Yh8S1',
      name: "Televisor LG",
      categoryId: category.dataValues.id,
      unitId: unit.dataValues.id,
      coste_usd: 800.65,
      price_usd: 450.48,
      count_unit: 1,
      gain_rate: 0,
      rate_seller: 0,
      rate_sponsor: 0,
      barcode: "78465416465746320"
    })).query

  }
  catch (e) {
    console.log("error", e)
  } */

  const products = (await Manager().Product.findAll({
    include:[
      {
        model: Manager().Category.model, as: 'category'
      },
      {
        model: Manager().Unit.model, as: 'unit'
      },
    ]
  })).toJSON()
  console.log(products)

  res.status(200).json(products)
}
