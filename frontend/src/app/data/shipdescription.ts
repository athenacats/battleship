import { Ships } from './shipdata';

export const Ship: Ships[] = [
  {
    id: 1,
    name: 'Sailboat',
    imageFileName: 'sailboat-svgrepo-com.svg',
    description:
      'Old reliable here! Each ship occupies 2 cells, and you can use up to 5 on the map',
    shipLength: 2,
    alowedNumberOfShips: 5,
    imagePath: './assets/sailboat-svgrepo-com.svg',
  },
  {
    id: 2,
    name: 'Submarine',
    imageFileName: 'submarine-svgrepo-com.svg',
    description:
      "This isn't you average sub! Each submarine occupies 4 cells, and you can use up to 2 on the map",
    shipLength: 4,
    alowedNumberOfShips: 2,
    imagePath: './assets/submarine-svgrepo-com.svg',
  },
  {
    id: 3,
    name: 'Yacht',
    imageFileName: 'yacht.svg',
    description:
      'I see you want to be a high roller! Each ship occupies 3 cells, and you can use up to 3 on the map',
    shipLength: 3,
    alowedNumberOfShips: 3,
    imagePath: './assets/yacht.svg',
  },
  {
    id: 4,
    name: 'Cruiser',
    imageFileName: 'ships-boat-svgrepo-com.svg',
    description:
      'Fancy taking a cruise? Each ship occupies 4 cells, and you can use up to 2 on the map',
    shipLength: 4,
    alowedNumberOfShips: 2,
    imagePath: './assets/ships-boat-svgrepo-com.svg',
  },
  {
    id: 5,
    name: 'Cargo Ship',
    imageFileName: 'cargo-ship-boat-svgrepo-com.svg',
    description:
      'You got your mind on money and money on your mind... Each ship occupies 6 cells, and you can use up to 2 on the map',
    shipLength: 6,
    alowedNumberOfShips: 2,
    imagePath: './assets/cargo-ship-boat-svgrepo-com.svg',
  },
];
