const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.engine("html", require("ejs").renderFile);
// app.set("view engine", "html");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});
app.post("/create", (req, res) => {
  var obj1 = JSON.parse(req.body.text);
  var obj2 = flattenedChildren(JSON.parse(req.body.text));
  res.send(createHtml(obj1, obj2));
  res.end();
});
function flattenedChildren(obj) {
  var arr = [];
  function helper(tree) {
    arr.push(tree);
    if (tree.children.length === 0) {
      return;
    }
    for (var i = 0; i < tree.children.length; i++) {
      helper(tree.children[i]);
    }
  }
  helper(obj);
  return arr;
}

function createHtml(obj1, obj2) {
  var keys = [];
  var values = [];
  for (key in obj1) {
    if (!Array.isArray(obj1[key])) {
      keys.push(key);
    }
  }
  for (var i = 0; i < obj2.length; i++) {
    values.push(Object.values(obj2[i]));
  }

  console.log(values);
  var html = "<table>   <tr>";
  for (key of keys) {
    html += `<th>${key}</th>`;
  }
  html += "</tr>";
  html += "<tr>";
  for (value of values) {
    html += `<td>${value}</td>`;
  }
  html += "</tr> </tr> </table>";

  return html;
}
app.listen(port, () => {
  console.log(`The Party happens in port ${port}`);
});
