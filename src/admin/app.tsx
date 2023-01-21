// TODO: find solution
// @ts-ignore
import Logo from "./extensions/bentools_logo_small.png";
// @ts-ignore
import LogoSquare from "./extensions/bentools_logo_square.png";

export default {
  config: {
    menu: {
      logo: LogoSquare,
    },
    auth: {
      logo: Logo,
    },
    head: {
      favicon: Logo,
    },
  },
  // Disable video tutorials
  tutorials: false,
  // Disable notifications about new Strapi releases
  notifications: { release: false },
  bootstrap(app) {
    console.log(app);
  },
};
