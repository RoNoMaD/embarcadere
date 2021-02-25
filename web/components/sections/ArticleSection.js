import React from "react";
import PropTypes from "prop-types";
import { useIntersection } from "react-use";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import SimpleBlockContent from "../SimpleBlockContent";
import Cta from "../Cta";

import styles from "./ArticleSection.module.css";

const builder = imageUrlBuilder(client);

function ArticleSection({ icon, heading, tagline, image, cta }) {
  const [isClient, setClient] = React.useState(false);
  React.useEffect(() => {
    setClient(true);
  }, []);
  const [animateText, setAnimateText] = React.useState(false);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });

  if (intersection && intersection.isIntersecting && !animateText) {
    setAnimateText(true);
  }

  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src={builder.image(image).width(512).auto("format").url()}
        alt={heading}
        loading="lazy"
      />
      <div ref={intersectionRef} className={styles.textContainer}>
        <div
          className={`${styles.text} ${
            animateText ? styles.animatedText : ""
          } ${isClient && !animateText ? styles.transparent : ""}`}
        >
          <div className={`${animateText ? styles.leafContainer : ""}`}>
            <img
              className={`${animateText ? styles.leaf : ""}`}
              width="77"
              src={builder.image(icon).auto("format").url()}
              alt=""
              loading="lazy"
            />
          </div>
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
