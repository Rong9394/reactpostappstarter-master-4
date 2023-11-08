import React from "react";
import { useMantineColorScheme } from '@mantine/core';
export const ThemeContext = React.createContext();


const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = React.useState(false);
    const { setColorScheme } = useMantineColorScheme();
    React.useEffect(()=>{
        setColorScheme(theme? 'dark' : 'light');
        window.localStorage.setItem('theme', theme? 'dark' : 'light');
    }, [theme]);
  
    return (
      <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
      </ThemeContext.Provider>
    );
};

export default ThemeProvider;