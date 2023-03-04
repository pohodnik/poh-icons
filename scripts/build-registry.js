const fs = require('node:fs/promises');
const outDir = './svg';
fs.readdir(outDir, 'utf-8').then((files) => {
    const list = [];
    files.flatMap(async (fileName) => {

    })


});

const run = async () => {
    const allDirs = await fs.readdir(outDir,{ withFileTypes: true });
    const dirs = allDirs.filter(dir => dir.isDirectory())
        .map(dir => dir.name);

    const result = {};

    const renderer = {};
    const rendererImports = [];

    for (const dir of dirs) {
        const list = [];
        const allFiles = await fs.readdir(`${outDir}/${dir}`,{ withFileTypes: true })
        const files = allFiles.filter(dir => dir.isFile())
            .map(dir => dir.name);

        for (const fileName of files) {
            if (fileName === 'index.js' || !fileName.endsWith('.js')) continue;
            const componentName = `${fileName.replace(/.js/, '')}`;
            list.push(componentName);
            rendererImports.push(`import ${dir}${componentName} from './${dir}/${componentName}';`);
            renderer[`${dir}${componentName}`] = `${dir}${componentName}`;
        }

        result[dir] = list;
    }

    fs.writeFile(`${outDir}/registry.js`, `const registry = ${JSON.stringify(result)};\nexport default registry;\n`, 'utf-8').then(() => {
        console.log(`${outDir}/registry.js created!`)
    });

    fs.writeFile(`${outDir}/renderer.jsx`, `import React from 'react';\n${rendererImports.join('\n')}\n\nexport default {\n${Object.values(renderer).join(',\n')}\n};`, 'utf-8').then(() => {
        console.log(`${outDir}/registry.js created!`)
    });

    fs.writeFile(`${outDir}/registry.d.ts`, `declare const registry: Record<string, string[]>;\nexport default registry;`, 'utf-8').then(() => {
        console.log(`${outDir}/registry.d.ts created!`)
    });

}

run().then(() => console.log('Build types completed'));



