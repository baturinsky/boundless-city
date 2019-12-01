const fs = require("fs");
const zipFolder = require('zip-a-folder');

const shaderPath = "./public/shaders";
let shaders = fs.readdirSync(shaderPath);

let all = [];

for (let f of shaders) {
  all.push(`<script id="${f}" type="glsl">` + 
  fs.readFileSync(shaderPath + "/" + f).toString() + `</script>`);    
}

let index = fs.readFileSync("public/index.html").toString();

let package = index.replace("</body>", "</body>" + all.join("\n"));

fs.writeFileSync("release/index.html", package)
fs.copyFileSync("public/bundle.js", "release/bundle.js")
fs.copyFileSync("public/favicon.png", "release/favicon.png")

zipFolder.zipFolder('release', 'glide.zip', err=> {if(err) console.log(err)})