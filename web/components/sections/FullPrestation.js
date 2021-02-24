import { string, number } from "prop-types";

import styles from "./FullPrestation.module.css";

function FullPrestation({
  image,
  imageWidth,
  imageHeight,
  title,
  description,
  startingPriceValue,
  startingPriceCurrency,
  priceUnit,
}) {
  let [startingPriceInteger, startingPriceDecimal] = startingPriceValue
    .toFixed(2)
    .toString()
    .split(".");
  startingPriceDecimal =
    startingPriceDecimal === "00" ? "" : startingPriceDecimal;
  return (
    <article className={styles.prestation}>
      <div>
        <div className={styles.price}>
          <svg
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M180.001 0l-180 180V0h180z" fill="#FECB00" />
          </svg>
          <div className={styles.priceText}>
            <div className={styles.priceLabel}>A partir de</div>
            <div className={styles.startingPrice}>
              <div className={styles.startingPriceInteger}>
                {startingPriceInteger}
              </div>
              <span className={styles.startingPriceRight}>
                <div className={styles.startingPriceCurrency}>
                  {startingPriceCurrency}
                </div>
                {startingPriceDecimal ? (
                  <div className={styles.startingPriceDecimal}>
                    {startingPriceDecimal}
                  </div>
                ) : null}
              </span>
            </div>
            <div className={styles.priceUnit}>/{priceUnit}</div>
          </div>
        </div>
        <div>
          <img
            className={styles.image}
            src={image}
            alt={title}
            width={imageWidth}
            height={imageHeight}
          />
        </div>
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
}

FullPrestation.propTypes = {
  image: string.isRequired,
  imageWidth: number.isRequired,
  imageHeight: number.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  startingPriceValue: number.isRequired,
  startingPriceCurrency: string.isRequired,
  priceUnit: string,
};

export default FullPrestation;
