import React from "react";
import PropTypes from "prop-types";
import { urlForImage } from "../../lib/sanity";
import Cta from "../Cta";

import styles from "./Prestations.module.css";

function Prestations(props) {
  const { heading, content } = props;

  return (
    <section className={styles.root}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.content}>
        {content.map((prestation) => {
          return (
            <article
              key={prestation._key}
              className={styles.prestation}
              style={{
                backgroundImage: `url(
                    ${urlForImage(prestation.image)
                      .width(288)
                      .height(460)
                      .auto("format")
                      .url()})`,
              }}
            >
              <h3 className={styles.title}>{prestation.heading}</h3>
              <p className={styles.price}>{prestation.price}</p>
              {prestation.cta && prestation.cta.route && (
                <Cta className={styles.cta} {...prestation.cta} />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

Prestations.propTypes = {
  heading: PropTypes.string,
  content: PropTypes.array,
  cta: PropTypes.object,
};

export default Prestations;
