import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.time("Seeding complete 🌱");
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       name: "One",
  //       status: "Cached",
  //     },
  //   ],
  // });
  console.timeEnd("Seeding complete 🌱");
};

main()
  .then(() => {
    console.log("Process completed");
  })
  .catch((e) => console.log(e));
