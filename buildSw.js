import { generateSW } from 'workbox-build'

generateSW({
  globDirectory: 'out/',
  globPatterns: ['**/*.{js,css,woff2,html,png,ico,svg,txt}'],
  swDest: 'out/sw.js',
  // ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
}).then(({ count, size, warnings }) => {
  if (warnings.length > 0) {
    console.warn(
      'Warnings encountered while generating a service worker:',
      warnings.join('\n'),
    )
  }

  console.log(
    `Generated a service worker, which will precache ${count} files, totaling ${size} bytes.`,
  )
})
