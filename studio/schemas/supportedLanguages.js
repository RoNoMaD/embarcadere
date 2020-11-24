const supportedLanguages = [
  { id: 'fr', title: 'French', isDefault: true },
  { id: 'en', title: 'English' }
]
export default supportedLanguages

export const baseLanguage = supportedLanguages.find(l => l.isDefault)
