import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import SimpleBlockContent from "../SimpleBlockContent";
import Cta from "../Cta";

import styles from "./ArticleSection.module.css";

const builder = imageUrlBuilder(client);

function ArticleSection(props) {
  const { icon, heading, tagline, image, cta } = props;

  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src={builder.image(image).maxWidth(512).auto("format").url()}
        alt={heading}
        loading="lazy"
      />
      <div className={styles.textContainer}>
        <div className={styles.text}>
          <img
            width="77"
            src={builder.image(icon).auto("format").url()}
            alt=""
            loading="lazy"
          />
          <h2>{heading}</h2>
          {tagline && <SimpleBlockContent blocks={tagline} />}
          {cta && cta.route && <Cta {...cta} />}
        </div>
      </div>
    </div>
  );
}

ArticleSection.propTypes = {
  icon: PropTypes.object,
  heading: PropTypes.string,
  tagline: PropTypes.array,
  image: PropTypes.object,
  cta: PropTypes.object,
};

export default ArticleSection;
