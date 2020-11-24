import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Cta from "../Cta";

import styles from "./Prestations.module.css";

const builder = imageUrlBuilder(client);

function Prestations(props) {
  const { heading, content } = props;

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.content}>
        {content.map((prestation) => (
          <article
            key={prestation._key}
            className={styles.prestation}
            style={{ backgroundImage: `url(${builder.image(prestation.image).url()}` }}
          >
            <h3 className={styles.title}>{prestation.heading}</h3>
            <div className={styles.price}>{prestation.price}</div>
            {prestation.cta && prestation.cta.route && (
              <Cta className={styles.cta} {...prestation.cta} />
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

Prestations.propTypes = {
  heading: PropTypes.string,
  content: PropTypes.array,
  cta: PropTypes.object,
};

export default Prestations;
