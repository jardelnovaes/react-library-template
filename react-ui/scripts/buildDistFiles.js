import fs from 'fs'
import path from 'path'

import pkg from '../package.json'

function buildPackagedDistFile(outDir) {
  const pkgFile = path.parse(`${outDir}/package.json`)
  const pkgFullPath = `${pkgFile.dir}/${pkgFile.base}`
  const pkgCopy = { ...pkg }
  delete pkgCopy.files
  delete pkgCopy.scripts
  const pkgContent = JSON.stringify(pkgCopy, null, 2)
  fs.writeFile(pkgFullPath, pkgContent, (err) => {
    if (err) {
      console.error(err)
      return
    }
    if (err) {
      console.error('Error Found:', err)
    } else {
      console.log(`Package dist file was created!\n${pkgFullPath}`)
    }
  })
}

function buildDistFiles(outDir) {
  return {
    name: 'Build Dist Files',
    generateBundle(opts, bundle) {
      buildPackagedDistFile(outDir)
    },
  }
}

export default buildDistFiles
