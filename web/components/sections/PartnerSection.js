import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import SimpleBlockContent from "../SimpleBlockContent";

import styles from "./PartnerSection.module.css";

const builder = imageUrlBuilder(client);

function PartnerSection({ heading, text, image }) {
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={builder.image(image).width(512).auto("format").url()}
          alt={heading}
          loading="lazy"
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.text}>
          <h2>{heading}</h2>
          {text && <SimpleBlockContent blocks={text} />}
        </div>
      </div>
    </div>
  );
}

PartnerSection.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.array,
  image: PropTypes.object,
};

export default PartnerSection;
