var AjaxUtils = {};

// TODO: Can only parse simple arrays
function serializeObject(root, obj) {
    const keys = Object.keys(obj);
    var url = '';
    for (var i=0, length = keys.length; i < length; ++i) {
        if (obj[keys[i]] === null) continue;

        if (typeof obj[keys[i]] === 'object') {
            if (Array.isArray(obj[keys[i]]) && obj[keys[i]].length > 0) {
                console.log(keys[i], obj[keys[i]], 'b', escape(obj[keys[i]][0]));
                const key = keys[i];
                const name = '&' + root + escape((root) ? '[' + keys[i] + ']' : keys[i]) + '[]=';

                for (var j=0, length2=obj[key].length; j < length2; ++j) {
                    url += name + escape(obj[key][j]);
                }
            } else {
                url += serializeObject(root + escape('[' + keys[i] + ']'), obj[keys[i]]);
            }
        } else {
            url += '&' + root + escape((root) ? '[' + keys[i] + ']' : keys[i]) + '=' + escape(obj[keys[i]]);
        }
    }
    return url;
}

AjaxUtils.request = function(type, url, data) {
    return new Promise((resolve, reject) => {
        console.log(url, 'Data:', data);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    console.log(url, 'Data:', xhttp.response);
                    resolve(xhttp.response);
                }
                else {
                    console.error(url, xhttp.status, xhttp.response);
                    reject({
                        status: xhttp.status,
                        data: xhttp.response
                    });
                }
            }
        };
        xhttp.responseType = "json";

        if (data !== undefined && data !== null) {
            if (type == 'GET') {
                xhttp.open(type, url + "?_=" + Date.now() + serializeObject('', data), true);
                xhttp.send();
            } else {
                xhttp.open(type, url, true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(JSON.stringify(data));
            }
        } else {
            xhttp.open(type, url, true);
            xhttp.send();
        }
    });
}

export default AjaxUtils;
