// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostModel } from "@/backend/models/Post";
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
  res: NextApiResponse<Data>,
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

  



  res.status(200).json({"":""});
}
