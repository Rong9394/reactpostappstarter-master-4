
import classes from "./ThemeToggle.module.css";
import { useMantineColorScheme } from '@mantine/core';

export function ThemeToggle() {
    const { toggleColorScheme } = useMantineColorScheme();

    return (<>
        <label className={classes.switch}>
          <input type="checkbox" onClick={toggleColorScheme}></input>
          <span className={classes.slider}></span>
        </label>
    </>);
}