import type { Prisma } from "@prisma/client";
import prisma from "lib/prisma";

export const createSampleData = async () => {
  for (let i = 0; i < sampleLocations.length; i++) {
    await prisma.location.create({
      data: sampleLocations[i],
    });
  }
};

const sampleLocations: Prisma.LocationCreateInput[] = [
  {
    locationName: "Trippeln",
    description: "Tre bänkar vid västra Lappkärret",
    coordinates: {
      coordinates: [59.3689071, 18.0672525],
    },
    image: "locations/IMG_20220619_221117.jpg",
    reviews: {
      create: [
        {
          rating: 5,
          comment: "Very nice",
          user: {
            create: {
              name: "Snöderlund",
              email: "sno@derlund.com",
              role: "ADMIN",
            },
          },
        },
        {
          rating: 2,
          user: {
            create: {
              name: "Degen",
              email: "adam@degen.nu",
            },
          },
        },
        {
          rating: 3,
          comment: "No comment",
          user: {
            connectOrCreate: {
              where: {
                email: "sno@derlund.se",
              },
              create: {
                name: "Snöderlund",
                email: "sno@derlund.se",
              },
            },
          },
        },
      ],
    },
  },
  {
    locationName: "Somewhere",
    coordinates: {
      coordinates: [0, 0],
    },
    reviews: {
      create: [
        {
          rating: 4,
          user: {
            connectOrCreate: {
              where: {
                email: "degarn@bagis.ba",
              },
              create: {
                name: "Degen",
                email: "degarn@bagis.ba",
              },
            },
          },
        },
        {
          rating: 1,
          user: {
            connectOrCreate: {
              where: {
                email: "stor@vispen.se",
              },
              create: {
                name: "Vispen",
                email: "stor@vispen.se",
              },
            },
          },
        },
      ],
    },
  },
  {
    locationName: "Fippelistan",
    coordinates: {
      coordinates: [42, 69],
    },
  },
  {
    locationName: "Barösund",
    coordinates: {
      coordinates: [59.926174, 23.86255],
    },
    reviews: {
      create: [
        {
          rating: 5,
          comment: "10/10",
          user: {
            connectOrCreate: {
              where: {
                email: "sno@derlund.com",
              },
              create: {
                name: "Snöderlund",
                email: "sno@derlund.com",
                role: "ADMIN",
              },
            },
          },
        },
      ],
    },
  },
];
