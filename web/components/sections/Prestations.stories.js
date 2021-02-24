import Prestations from "./Prestations";

export default {
  title: "Components/Prestations",
  component: Prestations,
};

const Template = (args) => <Prestations {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  heading: "Embarquez avec nous !",
  content: [
    {
      image:
        "https://cdn.sanity.io/images/lp6j9xjs/production/8f6fdc02c64ff514e1d0debeb24c2c74656c41c5-1080x1350.jpg",
      heading: "Balade traditionelle avec un batelier",
      price: "A partir de 18 €",
      cta: {
        route: "/",
        title: "Réserver",
      },
    },
    {
      image:
        "https://cdn.sanity.io/images/lp6j9xjs/production/8315c8a8d86adc647c70b306e4459a0e86ac7b92-200x270.jpg",
      heading: "Location de barque sans batelier",
      price: "A partir de 17 €",
      cta: {
        route: "/",
        title: "Réserver",
      },
    },
    {
      image:
        "https://cdn.sanity.io/images/lp6j9xjs/production/bab2b0768951fcf93f5fd165febacdb59736a079-258x181.jpg",
      heading: "Balade à vélo",
      price: "A partir de 10 €",
      cta: {
        route: "/",
        title: "Réserver",
      },
    },
  ],
};
