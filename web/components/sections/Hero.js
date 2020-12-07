import React from "react";
import PropTypes from "prop-types";
import styles from "./Hero.module.css";
import SimpleBlockContent from "../SimpleBlockContent";
import Cta from "../Cta";

function Hero(props) {
  const { heading, /*backgroundImage,*/ tagline, ctas } = props;

  return (
    <div className={`hero-image ${styles.root}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>{heading}</h1>
        <div className={styles.tagline}>
          {tagline && <SimpleBlockContent blocks={tagline} />}
        </div>
        {ctas && (
          <div className={styles.ctas}>
            {ctas.map((cta) => (
              <Cta {...cta} key={cta._key} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Hero.propTypes = {
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  tagline: PropTypes.array,
  ctas: PropTypes.arrayOf(PropTypes.object),
};

export default Hero;
