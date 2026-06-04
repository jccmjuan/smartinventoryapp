const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function removeComments(content, ext) {
    if (ext === '.html') {
        return content.replace(/<!--[\s\S]*?-->/g, '');
    } else if (['.ts', '.js', '.scss', '.css'].includes(ext)) {
        return content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
    }
    return content;
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else {
            const ext = path.extname(file);
            if (['.ts', '.js', '.html', '.scss', '.css'].includes(ext)) {
                const content = fs.readFileSync(fullPath, 'utf8');
                const newContent = removeComments(content, ext);
                if (content !== newContent) {
                    fs.writeFileSync(fullPath, newContent, 'utf8');
                    console.log(`Processed: ${fullPath}`);
                }
            }
        }
    });
}

console.log('Starting comment removal...');
processDirectory(srcDir);
console.log('Comment removal complete.');
