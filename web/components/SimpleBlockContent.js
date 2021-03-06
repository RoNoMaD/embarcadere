import React from "react";
import PropTypes from "prop-types";
import BlockContent from "@sanity/block-content-to-react";
import { sanityConfig } from "../lib/config";
import customSerializers from "./serializers";

const { projectId, dataset } = sanityConfig;

function SimpleBlockContent(props) {
  const { blocks, serializers } = props;

  if (!blocks) {
    console.error("Missing blocks");
    return null;
  }

  return (
    <BlockContent
      blocks={blocks}
      serializers={{ ...customSerializers, ...serializers }}
      projectId={projectId}
      dataset={dataset}
    />
  );
}

SimpleBlockContent.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
};

export default SimpleBlockContent;
