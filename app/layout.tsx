// app/layout.tsx
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';   // ✅ correct import
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>  {/* ✅ correct spelling */}
            <CssBaseline />
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}