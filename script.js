const fs = require('fs')

const components = fs.readdirSync('./components').filter(n => n != 'index.js')

const imports = components.map(c => {
  const name = c.split('.tsx')[0]
  return `import { ${name} } from './${name}'`
})

let exp = `export {\n`
components.forEach(c => {
  const name = c.split('.tsx')[0]
  exp += `\t${name},\n`
})

const ret = `${imports.join('\n')}

${exp}}
`

fs.writeFileSync('./components/index.js', ret)
