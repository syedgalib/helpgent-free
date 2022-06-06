const base = ( vmViteData && vmViteData.base ) ? vmViteData.base : 'http://localhost:3000/';

import( base + '@react-refresh' ).then( ( response ) => {
    const RefreshRuntime = response.default;
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
});