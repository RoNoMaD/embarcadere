const supportedLanguages = [
  { name: 'fr', title: 'French', isDefault: true },
  { name: 'en', title: 'English' }
]
export default supportedLanguages

export const baseLanguage = supportedLanguages.find(l => l.isDefault)
