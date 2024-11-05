const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');
const notFoundPath = path.join(buildDir, '404.html');
const publicUrl = process.env.PUBLIC_URL || '';

const insertScriptTag = (content) => {
  const scriptTag = `
    <script type="text/javascript">
      const redirectPath = window.location.pathname + window.location.search;
      window.history.replaceState({}, '', redirectPath);
    </script>
  `;
  return content.replace('</head>', `${scriptTag}</head>`);
};

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  content = insertScriptTag(content);
  fs.writeFileSync(notFoundPath, content, 'utf8');
  console.log('404.html has been created with the script tag inserted.');
} else {
  console.error('index.html not found, cannot create 404.html');
}
