const previewSecret = 'EMBARCADERE_SECRET' // Copy the string you used for SANITY_PREVIEW_SECRET
const projectUrl = process.env.SANITY_STUDIO_SITE_URL || 'https://embarcadere.netlify.app'

export default function resolveProductionUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document.slug.current}`
}
