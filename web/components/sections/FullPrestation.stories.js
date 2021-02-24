import FullPrestation from "./FullPrestation";

export default {
  title: "Components/FullPrestation",
  component: FullPrestation,
};

const Template = (args) => <FullPrestation {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  image:
    "https://www.marais-poitevin-tourisme.com/files/2013/03/DSCN9959-1024x768.jpg",
  imageWidth: 1024,
  imageHeight: 768,
  title: "La Balade Traditionnelle avec Batelier",
  description:
    "1h, 1h30, 2h ou 3h de barque avec un batelier “rien que pour vous”, avec un commentaire sur l’Histoire du marais poitevin, la faune, la flore et les traditions de cet extraordinaire milieu, la Venise Verte.",
  startingPriceValue: 17.5,
  startingPriceCurrency: "€",
  priceUnit: "adulte",
};
