import { createTheme } from '@material-ui/core/styles';
import { useStateValue } from '../ContextAPI/globalState';
import { ThemeProvider } from '@material-ui/styles';

function CreateThemeProvider ({children}) {
  // get data from global state  
  const {darkMode}  = useStateValue();

  // create theme  
  const Theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#252525':'#FFFFFF',
      },
      secondary: {
        main:darkMode ? '#181818':'#ebebeb',
      },
      background: {
        default: darkMode ? '#181818':'#ebebeb',
      },
    },
    shape:{
      borderRadius:'20px'
    }
  });

  // theme provider 
  return (
    <ThemeProvider theme={Theme}>
      {children}
    </ThemeProvider>

  )

}

export default CreateThemeProvider