import Cta from "./Cta";

export default {
  title: "Components/Cta",
  component: Cta,
};

const Template = (args) => <Cta {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Réserver",
};
