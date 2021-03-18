import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { urlForImage } from "../../lib/sanity";

import styles from "./OpeningHours.module.css";

function OpeningHours({ heading, backgroundImage, ranges }) {
  return (
    <article className={`opening-hours-background ${styles.root}`}>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                .opening-hours-background {
                  background-image: url("${urlForImage(backgroundImage)
                    .width(750)
                    .auto("format")
                    .url()}");
                }
              
                @media (min-width: 450px) {
                  .opening-hours-background {
                    background-image: url("${urlForImage(backgroundImage)
                      .width(1080)
                      .auto("format")
                      .url()}");
                  }
                }

                @media (min-width: 900px) {
                  .opening-hours-background {
                    background-image: url("${urlForImage(backgroundImage)
                      .auto("format")
                      .url()}");
                  }
                }
              `,
          }}
        ></style>
      </Head>
      <div className={styles.textContainer}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.ranges}>
          {ranges.map(({ _key, monthsRanges, hoursRanges }) => {
            return (
              <div key={_key} className={styles.range}>
                <div className={styles.monthsRanges}>
                  {monthsRanges.map((monthsRange, index) => (
                    <p key={index}>{monthsRange}</p>
                  ))}
                </div>
                <div className={styles.hoursRanges}>
                  {hoursRanges.map((hoursRange, index) => (
                    <p key={index}>{hoursRange}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

OpeningHours.propTypes = {
  backgroundImage: PropTypes.object,
  heading: PropTypes.string,
  ranges: PropTypes.array,
};

export default OpeningHours;
