import React from "react";
import PropTypes from "prop-types";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import SimpleBlockContent from "../SimpleBlockContent";

import styles from "./ArticleSection.module.css";

function ArticleSection(props) {
  const { heading, tagline, image } = props;

  return (
    <div>
      <img src={builder.image(image).auto("format").width(2000).url()} alt={heading} />
      <div>
        <h2>{heading}</h2>
        {text && <SimpleBlockContent blocks={text} />}
        {/*cta && cta.route && <Cta {...cta} />*/}
      </div>
    </div>
  );
}

ArticleSection.propTypes = {
  heading: PropTypes.string,
  tagline: PropTypes.array,
  image: PropTypes.object,
  cta: PropTypes.object,
};

export default ArticleSection;
