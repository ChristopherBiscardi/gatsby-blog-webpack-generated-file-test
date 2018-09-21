const _ = require('lodash')
const path = require('path')
//const myCreatePage = require('./my-create-page')
const mkdirp = require('mkdirp')
const fs = require('fs')

exports.onCreatePage = async ({ page, actions, store }, pluginOptions) => {
  console.log('page.path', page.path)
  if (page.path === '/hello-world/') {
    actions.deletePage(page)

    console.log('recreating page', page)
    const rawCmpPath = page.component
    const contents = fs.readFileSync(rawCmpPath, 'utf-8')
    const cmpPath = path.join(
      store.getState().program.directory,
      '.cache/loader-cache',
      path.relative(store.getState().program.directory, page.component),
      '.mdx-fake'
    )
    console.log(cmpPath)

    mkdirp.sync(path.dirname(cmpPath))
    fs.writeFileSync(
      cmpPath,
      `module.exports = ${JSON.stringify({
        component: contents,
        cmpPath: rawCmpPath,
      })}
    
/* mdx-split */    
export const pageQuery = graphql\`
    query($slug: String!) {
      site {
        siteMetadata {
          title
          author
        }
      }
      markdownRemark(fields: { slug: { eq: $slug } }) {
        id
        excerpt
        html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
\`
      `
    )
    page.component = path.resolve(cmpPath)

    actions.createPage(page)
  }
}
