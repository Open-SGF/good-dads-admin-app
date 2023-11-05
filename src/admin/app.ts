import favicon from "./extensions/favicon.ico";
import logo from "./extensions/logo.png";
import logoSquare from "./extensions/logo-square.png";

export default {
  config: {
    locales: [
      "en",
    ],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Dashboard",
        "app.components.LeftMenu.navbrand.workplace": "",
        "Auth.form.welcome.title": "Welcome to Good Dads!",
        "Auth.form.welcome.subtitle": "Log in to your account"
      },
    },
    head: {
      favicon: favicon,
    },
    menu: {
      logo: logoSquare,
    },
    auth: {
      logo: logo,
    }
  },
  bootstrap(app) {
  },
};
