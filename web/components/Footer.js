import React from "react";
import PropTypes from "prop-types";
import { useIntersection } from "react-use";

import SimpleBlockContent from "./SimpleBlockContent";

import styles from "./Footer.module.css";
import { Container } from "postcss";

function Footer({
  companyName,
  copyright,
  footerContact,
  footerAddress,
  footerSocialMedias,
}) {
  const [displayMapIFrame, setDisplayMapIFrame] = React.useState(false);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  if (intersection && intersection.isIntersecting && !displayMapIFrame) {
    setDisplayMapIFrame(true);
  }

  return (
    <footer className={styles.root}>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>{footerContact.title}</h4>
          <address>
            <a
              href={`tel:${footerContact.phone}`}
              className={styles.sectionLink}
            >
              {footerContact.phone}
            </a>
            <a
              href={`mailto:${footerContact.email}`}
              className={styles.sectionLink}
            >
              {footerContact.email}
            </a>
          </address>
        </div>
        {footerSocialMedias.socialMedias ? (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>{footerSocialMedias.title}</h4>
            {footerSocialMedias.socialMedias.map(({ _key, name, link }) => {
              return (
                <a key={_key} href={link} className={styles.sectionLink}>
                  {name}
                </a>
              );
            })}
          </div>
        ) : null}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>{footerAddress.title}</h4>
          <SimpleBlockContent
            blocks={footerAddress.address}
            serializers={{ container: "address" }}
          />
          <a
            href="https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJPxo1dWPaBkgRITFj89lvym4&destination=Embarcadere%20de%20l%27%27Abbaye"
            className={styles.sectionLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir l'itinéraire
          </a>
        </div>
        <div
          ref={intersectionRef}
          className={`${styles.section} ${styles.mapBackground}`}
        >
          {displayMapIFrame ? (
            <iframe
              title="Carte"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2752.8230368265654!2d-0.7441696315865893!3d46.37289890966355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4806da6375351a3f%3A0x6eca6fd9f3633121!2sEmbarcad%C3%A8re%20de%20l&#39;Abbaye!5e0!3m2!1sfr!2sfr!4v1606914485896!5m2!1sfr!2sfr"
              width="300"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
              loading="lazy"
            ></iframe>
          ) : null}
        </div>
      </div>
      <div className={styles.company}>
        <p className={styles.companyName}>{companyName}</p>
        <p className={styles.copyright}>{copyright}</p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  companyName: PropTypes.string,
  copyright: PropTypes.string,
  footerContact: PropTypes.shape({
    title: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  footerAddress: PropTypes.shape({
    title: PropTypes.string,
  }),
  footerSocialMedias: PropTypes.shape({
    title: PropTypes.string,
  }),
};

export default Footer;
