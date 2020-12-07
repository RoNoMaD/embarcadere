const supportedLanguages = [
  { name: 'fr', title: 'Français', isDefault: true },
  { name: 'en', title: 'English' }
]
export default supportedLanguages

export const baseLanguage = supportedLanguages.find(l => l.isDefault)
