import languages, { baseLanguage } from './supportedLanguages'

// This is the basis for all fields that should have translations.
// Its used to fill out more complete field definitions in
// 'translateDocs' below
const languageField = {
  type: 'object',
  fieldsets: [
    {
      title: 'Traductions',
      name: 'translations',
      options: { collapsible: true }
    }
  ]
}

// We need to figure out which language to map the preview
// of this document to. Use the 'localizedPreview' object
// to point to the base language properties. This does not
// support custom previews, only the build in 'title', 'subtitle'
// and 'media' properties.
const localizePreview = preview => {
  if (!preview) return null
  const { select, prepare } = preview
  if (!select) return null
  return {
    select: {
      ...select,
      ...(select.title && { title: `${select.title}.${baseLanguage.name}` })
    },
    prepare
  }
}

export const translateFields = docs => {
  const documents = docs.map(doc => {
    // Change all the fields to object versions with properties for each
    // language, if either the document has localize: true or individual fields
    const fields = doc.fields.map(field => {
      const shouldLocalize = field.type !== 'reference' && (doc.localize || field.localize)
      // Use the field defined as-is if its not to be translated
      if (!shouldLocalize || field.localize === false) return field

      console.log('field', field)
      return {
        ...languageField,
        name: field.name,
        title: field.title,
        fields: languages.map((language, i) => ({
          ...field,
          title: language.title,
          name: language.name,
          // All other languages except the first one is collapsed by default
          fieldset: i === 0 ? null : 'translations'
        }))
      }
    })

    console.log('fields', fields)

    return {
      ...doc,
      preview: localizePreview(doc.preview) || doc.preview,
      fields
    }
  })

  return documents
}
