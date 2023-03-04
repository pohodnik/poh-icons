const fs = require('node:fs/promises');
const outDir = './svg';
const run = async () => {
    const allDirs = await fs.readdir(outDir,{ withFileTypes: true });
    const dirs = allDirs.filter(dir => dir.isDirectory())
        .map(dir => dir.name);


    for (const dir of dirs) {
        const allFiles = await fs.readdir(`${outDir}/${dir}`,{ withFileTypes: true })
        const files = allFiles.filter(dir => dir.isFile())
            .map(dir => dir.name);

        for (const fileName of files) {
            if (!fileName.endsWith('.js') || fileName === 'registry.js' || fileName === 'index.js') continue;
            const componentName = `${fileName.replace(/.js/, '')}`;
            const types = `import * as React from 'react';\ndeclare function ${componentName}(props: React.SVGProps<SVGSVGElement>): JSX.Element;\nexport default ${componentName};\n`;
            await fs.writeFile(`${outDir}/${dir}/${componentName}.d.ts`, types, 'utf-8');
            console.log(`${outDir}/${dir}/${componentName}.d.ts created!`)
        }
    }

}

run().then(() => console.log('Build types completed'));


