const comments = `
// poh-icons for pohodnik
`;
const template = (variables, { tpl }) => {
  variables.jsx.openingElement.attributes = variables.jsx.openingElement.attributes.filter((x) => (x.name.name !== 'className'))
  return tpl`
${comments}
${variables.imports};
${variables.interfaces};
const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);
${variables.exports};
`;
};

module.exports = template;
