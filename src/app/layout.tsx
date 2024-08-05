import { ThemeContextProvider } from '../context/ThemeContext';
import './layout.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning={true}>

      <head>
        <title>SWAPI</title>
        <meta name='description' content='SWAPI' />
      </head>
      
      <body suppressHydrationWarning={true}>
        <ThemeContextProvider>
          <div className='container'>{children}</div>
        </ThemeContextProvider>
        <script type='module' src='/src/main.tsx'></script>
      </body>

    </html>
  );
}
