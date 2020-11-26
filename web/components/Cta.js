import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { i18n } from "../i18n";
import styles from "./Cta.module.css";

function Cta(props) {
  const { className, title, route, link } = props;
  const router = useRouter();
  const locale =
    router.query.slug &&
    router.query.slug !== "/" &&
    i18n.locales.includes(router.query.slug[0])
      ? router.query.slug[0]
      : "";

  if (route && route.slug && route.slug.current) {
    return (
      <Link href={`/${route.slug.current}`}>
        <a className={`${className} ${styles.button}`}>{title}</a>
      </Link>
    );
  }

  if (link) {
    return (
      <a className={`${className} ${styles.button}`} href={link}>
        {title}
      </a>
    );
  }

  return <a className={`${className} ${styles.button}`}>{title}</a>;
}

Cta.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
  }),
  link: PropTypes.string,
  className: PropTypes.string,
};

export default Cta;
