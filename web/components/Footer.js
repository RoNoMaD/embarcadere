import React from "react";
import PropTypes from "prop-types";
import SimpleBlockContent from "./SimpleBlockContent";

import styles from "./Footer.module.css";

function Footer({
  companyName,
  copyright,
  footerContact,
  footerAddress,
  footerSocialMedias,
}) {
  return (
    <div className={styles.root}>
      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{footerContact.title}</div>
          <a href={`tel:${footerContact.phone}`} className={styles.sectionLink}>
            {footerContact.phone}
          </a>
          <a
            href={`mailto:${footerContact.email}`}
            className={styles.sectionLink}
          >
            {footerContact.email}
          </a>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{footerSocialMedias.title}</div>
          {footerSocialMedias.socialMedias.map(({ _key, name, link }) => {
            return (
              <a key={_key} href={link} className={styles.sectionLink}>
                {name}
              </a>
            );
          })}
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{footerAddress.title}</div>
          <SimpleBlockContent blocks={footerAddress.address} />
          <a
            href="https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJPxo1dWPaBkgRITFj89lvym4&destination=Embarcadere%20de%20l%27%27Abbaye"
            className={styles.sectionLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir l'itinéraire
          </a>
        </div>
        <div className={styles.section}>
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
          ></iframe>
        </div>
      </div>
      <div className={styles.company}>
        <div className={styles.companyName}>{companyName}</div>
        <div className={styles.copyright}>{copyright}</div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  companyName: PropTypes.string,
  copyright: PropTypes.string,
  footerContact: PropTypes.shape({
    title: PropTypes.string,
  }),
  footerAddress: PropTypes.shape({
    title: PropTypes.string,
  }),
  footerSocialMedias: PropTypes.shape({
    title: PropTypes.string,
  }),
};

export default Footer;
