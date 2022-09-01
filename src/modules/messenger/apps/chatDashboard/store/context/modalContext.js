
import React from 'react';
 
// Creating the context object and passing the default values.
const modalContext = React.createContext({
    sessionState:{}, 
    setSessionState: () => {}
});
 
export default modalContext;