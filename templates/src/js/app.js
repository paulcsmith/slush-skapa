import removeMobileHover from './utils/removeMobileHover.js'

removeMobileHover()

// Add class to html if JS is loaded
document.querySelector('html').classList.add('js-is-loaded')
