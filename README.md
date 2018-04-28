How to add a new page:

1. Copy the templates/TemplatePage.react.js to the required section( either `pages/Doctors`, `pages/Pacients` or `pages/Personnel`) and change the name of the page
2. Add the page to the `Index page` of the section(`Doctos`,`Pacients` or `Personnel`): `import` the page(from top), copy and modify the `constructor` with the choosen page url and a choosen(what you want) tag name and also add the choosen tag name to the `switch` in the `render()` function following the `TEMPLATE` given example
3. Add the url to the `app.js` by modifying the template

How to add a menu entry: For the required section change the `components/[SECTION]/Menu.react.js` and modify the given template

Make a request:

`AjaxUtils.request(METHOD, URL, FORM).then(data => { }).catch(error => { });`

Example:

    AjaxUtils.request('GET', '/api/bloodStocks', undefined)
        .then(data => {
            // the data is the response given by the server if all is alright
        })
        .catch(error => {
            // Here you catch the errors(print out the error variable)
            console.error(error);
        })

    AjaxUtils.request('POST', '/api/updateDonorData', {
        name: 'Name',
        dateOfBirth: '...',
        ...other_Data
    })
        .then(data => {
            // the data is the response given by the server if all is alright
        })
        .catch(error => {
            // Here you catch the errors(print out the error variable)
            console.error(error);
        })