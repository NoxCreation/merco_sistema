import { Inter } from "next/font/google";
import SplashScreen from "@/modules/core/components/SplashScreen";
import InitialLayout from "@/modules/initial/layouts/InitialLayout";
import { GetServerSidePropsContext } from "next";
import { UserModel } from "@/backend/models/User";
import { sequelize } from "@/backend/models/engine";
import { ProfileModel } from "@/backend/models/Profile";
import { Sequelize } from "sequelize";
import { PostModel } from "@/backend/models/Post";

export default function Home() {
  return (
    // <MainLayout>
    //   <Box padding="40px">
    //     <InfoCard
    //       title="Ganancia"
    //       value="$1.000.000"
    //       color="green.500"
    //       badgeText="CUP"
    //       description="Ganancias obtenidas"
    //       icon={<GraphicGrowingIcon />}
    //     />
    //   </Box>
    //   <SimpleGrid columns={6}>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>

    //     <ProductCard
    //     isSelected
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>

    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //   </SimpleGrid>
    // </MainLayout>
    <InitialLayout>
      <SplashScreen />
    </InitialLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("Verificando la BD")

  // Creando modelos
  const User = UserModel()
  const Profile = ProfileModel(User)
  const Post = PostModel(User)

  // Relación Uno a Uno entre user y profile
  User.hasOne(Profile, {
    foreignKey: 'userId',
    as: 'profile',
  });
  Profile.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  // Relación uno a mucho
  User.hasMany(Post, {
    foreignKey: 'userId',
    as: 'posts',
  });
  Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  // Sincronización de los modelos con la base de datos
  sequelize.sync()
    .then(() => console.log('Base de datos y tablas creadas!'));

  return {
    props: {
      number: 5
    }
  }
}
