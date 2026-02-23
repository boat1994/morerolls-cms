const fs = require('fs')
try {
  // Try to resolve the package.json of the module
  const pkgPath = require.resolve('@payloadcms/next/package.json')
  console.log('Package Path:', pkgPath)
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  console.log('Exports:', JSON.stringify(pkg.exports, null, 2))
} catch (e) {
  console.error('Error:', e.message)
}
