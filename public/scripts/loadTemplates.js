/* global Handlebars */

const checkFileExtention = ({ url, fileExtention }) => new Promise((resolve, reject) => {
  const regexp = new RegExp(`.(${fileExtention})$`);
  if (regexp.test(url)) {
    resolve(url);
  }
  reject(new Error('wrong file extention'));
});

const loadTemplate = ({ url }) => fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.text();
  });

const generateHTML = ({ templateHTML, context }) => {
  const compiledTemplate = Handlebars.compile(templateHTML);
  const result = compiledTemplate(context);

  // console.log(context);
  // console.log(result);
  return result;
};

// ----------------------------------------
export const loadHTML = ({ url }) => checkFileExtention({
  fileExtention: 'html',
  url
})
  .then(() => loadTemplate({ url }));

// ----------------------------------------
const loadHbsTemplate = ({ url }) => checkFileExtention({
  fileExtention: 'handlebars',
  url
})
  .then(() => loadTemplate({ url }));

// ----------------------------------------
export default async function generateContentHTML({ context, url }) {
  const templateHTML = await loadHbsTemplate({ url });
  return generateHTML({
    templateHTML,
    context
  });
}
