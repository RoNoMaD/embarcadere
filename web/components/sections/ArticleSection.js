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
  console.log(heading);

  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src={builder.image(image).url()}
        alt={heading}
      />
      <div className={styles.textContainer}>
        <div className={styles.text}>
          <img width="77" src={builder.image(icon).url()} alt="" />
          <h2>{/* heading */}</h2>
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
