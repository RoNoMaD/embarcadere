import Footer from "./Footer";

export default {
  title: "Components/Footer",
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  companyName: "Embarcadère de l'Abbaye",
  copyright: "2020-2021",
  footerContact: {
    title: "Nous contacter",
    phone: "0251872187",
    email: "contact@marais-poitevin-tourisme.com",
  },
  footerAddress: {
    title: "Nous situer",
  },
  footerSocialMedias: {
    title: "Suivez-nous",
    socialMedias: [
      {
        _key: "Facebook",
        name: "Facebook",
        link: "facebook.com",
      },
      {
        _key: "Instagram",
        name: "Instagram",
        link: "intragram.com",
      },
    ],
  },
};
