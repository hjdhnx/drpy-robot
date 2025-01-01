// Import required modules
import fs from 'fs/promises';
import path from 'path';
import markdownPdf from 'markdown-pdf';

// Function to recursively get all .md files in a directory
async function getMarkdownFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            return getMarkdownFiles(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            return fullPath;
        }
        return [];
    }));
    return files.flat();
}

// Function to merge markdown files into one
async function mergeMarkdownFiles(files, outputFilePath) {
    const contentPromises = files.map(async (file) => {
        const relativePath = path.relative(process.cwd(), file);
        const content = await fs.readFile(file, 'utf-8');
        return `# ${relativePath}\n\n${content}\n\n`;
    });
    const mergedContent = (await Promise.all(contentPromises)).join('\n');
    await fs.writeFile(outputFilePath, mergedContent, 'utf-8');
    console.log(`Merged markdown saved to: ${outputFilePath}`);
}

// Function to convert markdown to PDF using markdown-pdf
async function convertMarkdownToPdf(inputFilePath, outputFilePath) {
    return new Promise((resolve, reject) => {
        markdownPdf()
            .from(inputFilePath)
            .to(outputFilePath, (err) => {
                if (err) {
                    console.error(`Error converting to PDF: ${err}`);
                    return reject(err);
                }
                console.log(`PDF saved to: ${outputFilePath}`);
                resolve();
            });
    });
}

// Main function
async function main() {
    const rootDir = process.cwd();
    const distDir = path.join(rootDir, 'dist');

    // Ensure the dist directory exists
    await fs.mkdir(distDir, { recursive: true });

    // Get all subdirectories in the root directory (excluding node_modules and dist)
    const entries = await fs.readdir(rootDir, { withFileTypes: true });
    const projectDirs = entries.filter(entry =>
        entry.isDirectory() &&
        !['node_modules', 'dist'].includes(entry.name)
    ).map(entry => entry.name);

    // Process each project directory
    for (const projectDir of projectDirs) {
        const projectPath = path.join(rootDir, projectDir);
        const markdownFiles = await getMarkdownFiles(projectPath);

        if (markdownFiles.length > 0) {
            const mergedMarkdownPath = path.join(distDir, `${projectDir}.md`);
            const pdfPath = path.join(distDir, `${projectDir}.pdf`);

            // Merge markdown files
            await mergeMarkdownFiles(markdownFiles, mergedMarkdownPath);

            // Convert to PDF
            await convertMarkdownToPdf(mergedMarkdownPath, pdfPath);
        }
    }
}

// Run the script
main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
