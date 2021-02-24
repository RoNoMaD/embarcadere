import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withRouter } from "next/router";
import SVG from "react-inlinesvg";
import styles from "./Header.module.css";
import HamburgerIcon from "./icons/Hamburger";
import { i18n } from "../i18n";

class Header extends Component {
  state = { showNav: "none" };

  static propTypes = {
    router: PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.shape({
        slug: PropTypes.array,
      }),
      events: PropTypes.any,
    }),
    title: PropTypes.string,
    navItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.shape({
          current: PropTypes.string,
        }).isRequired,
      })
    ),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
      logo: PropTypes.string,
    }),
  };

  componentDidMount() {
    const { router } = this.props;
    router.events.on("routeChangeComplete", this.hideMenu);
  }

  componentWillUnmount() {
    const { router } = this.props;
    router.events.off("routeChangeComplete", this.hideMenu);
  }

  hideMenu = () => {
    this.setState({ showNav: "none" });
  };

  handleMenuToggle = () => {
    const { showNav } = this.state;
    this.setState({
      showNav: showNav !== "menu" ? "menu" : "none",
    });
  };

  handleLanguagesToggle = () => {
    const { showNav } = this.state;
    this.setState({
      showNav: showNav !== "languages" ? "languages" : "none",
    });
  };

  renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return null;
    }

    if (logo.asset.extension === "svg") {
      return <SVG src={logo.asset.url} className={styles.logo} />;
    }

    return <img src={logo.asset.url} alt={logo.alt} className={styles.logo} />;
  };

  render() {
    const { title = "Missing title", navItems, router, logo } = this.props;
    const { showNav } = this.state;

    const locale =
      router.query.slug &&
      router.query.slug !== "/" &&
      i18n.locales.includes(router.query.slug[0])
        ? router.query.slug[0]
        : "";

    return (
      <header className={styles.root} data-show-nav={showNav}>
        <div className={styles.branding}>
          <Link href={`/${locale}`}>
            <a title={title}>{this.renderLogo(logo)}</a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navItems}>
            {navItems &&
              navItems.map((item) => {
                const { slug, title, _id } = item;
                const isActive = router.query.slug === slug.current;
                return (
                  <li key={_id} className={styles.navItem}>
                    <Link
                      href={`${locale ? `/${locale}` : ""}/${slug.current}`}
                    >
                      <a data-is-active={isActive ? "true" : "false"}>
                        {title}
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
          <button
            className={styles.showNavButton}
            onClick={this.handleMenuToggle}
            aria-label="menu"
          >
            <HamburgerIcon className={styles.hamburgerIcon} />
          </button>
        </nav>
        <nav className={styles.navLanguages}>
          <ul className={styles.navLanguagesItems}>
            {i18n.locales.map((locale) => {
              let href = "/";
              let slugs;
              if (router.query.slug && router.query.slug !== "/") {
                slugs = router.query.slug.filter(
                  (slug) => !i18n.locales.includes(slug)
                );
              } else {
                slugs = [];
              }
              if (locale !== i18n.defaultLocale) {
                slugs = [locale].concat(slugs);
              }
              href += slugs.join("/");
              return (
                <li key={locale} className={styles.navItem}>
                  <Link href={href}>
                    <a rel="alternate" lang={locale}>
                      {locale === "fr" ? "Français" : "English"}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            className={styles.showNavLanguagesButton}
            onClick={this.handleLanguagesToggle}
            aria-label="languages"
          >
            {locale === "" ? "Français" : "English"}
          </button>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
