// components/Navbar.tsx
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Chat Application
      </Typography>
      <Link href="/" passHref>
        <Button color="inherit">Chat</Button>
      </Link>
      <Link href="/activities" passHref>
        <Button color="inherit">Activities</Button>
      </Link>
    </Toolbar>
  </AppBar>
);

export default Navbar;
