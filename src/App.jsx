import './App.css';
import BasicCard from './componts/weatherCard';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
typography:{
  fontFamily:["main"],
},
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <BasicCard />
      </Container>
    </ThemeProvider>
  );
}

export default App;