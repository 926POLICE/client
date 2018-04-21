function getScript(source, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
            script.onload = script.onreadystatechange = null;
            script = undefined;

            if(!isAbort) { if(callback) callback(); }
        }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
}

export default class LibraryLoader {
    constructor() {
        this.loadedLibraries = [];
        this.loadedCSS = [];

        this.loadLibrary = this.loadLibrary.bind(this);
        this.loadCSS = this.loadCSS.bind(this);
        this._loadCSS = this._loadCSS.bind(this);
    }

    loadLibrary(library, callback) {
        if (Array.isArray(library)) {
            if (this.loadedLibraries.includes(library[0])) {
                if (callback) callback();
                return;
            }
            var loaded = [];

            var checkAllLoaded = () => {
                if (loaded.length != library.length) return false;

                for (var i=0, length = loaded.length; i < length; ++i) {
                    if (!loaded[i]) return false;
                }
                return true;
            }

            for (var i=0, length = library.length; i < length; ++i) {
                const index = i;
                loaded.push(false);
                getScript(library[i], () => { loaded[index] = true; if (checkAllLoaded() && callback) callback(); });
                this.loadedLibraries.push(library[i]);
            }
        } else {
            if (this.loadedLibraries.includes(library)) {
                if (callback) callback();
                return;
            }
            getScript(library, callback);
            this.loadedLibraries.push(library);
        }
    }

    _loadCSS(path) {
        if (this.loadedCSS.includes(path)) return;
        var ls = document.createElement('link');
        ls.rel="stylesheet";
        ls.href= path;
        document.getElementsByTagName('head')[0].appendChild(ls);
        this.loadedCSS.push(path);
    }

    loadCSS(path) {
        if (Array.isArray(path)) {
            for (var i=0, length = path.length; i < length; ++i) {
                this._loadCSS(path[i]);
            }
        } else {
            this._loadCSS(path);
        }
    }
}
