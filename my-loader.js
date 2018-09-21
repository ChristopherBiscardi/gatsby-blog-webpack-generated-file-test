const fs = require('fs')

module.exports = function(content) {
  console.log('in-loader', content)
  const cont = content.slice(17, content.length).split('/* mdx-split */')[0]
  const json = JSON.parse(cont)
  this.addDependency(json.cmpPath)
  const realComponent = fs.readFileSync(json.cmpPath, 'utf-8')
  return realComponent
}
