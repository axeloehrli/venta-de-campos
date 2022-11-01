import * as React from 'react';
import { Box } from '@mui/material';
import Leftbar from '../src/components/Leftbar';
import Main from '../src/components/Main';
import { Stack } from '@mui/system';
import Navbar from '../src/components/Navbar';

export default function Index() {
  return (
    <>
      <Navbar />
      <Stack
        direction="row"
      >
        <Leftbar />
        <Main />
      </Stack>
    </>
  );
}
