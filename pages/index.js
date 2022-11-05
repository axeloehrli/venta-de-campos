import * as React from 'react';
import { Box } from '@mui/material';
import Leftbar from '../src/components/Leftbar';
import Main from '../src/components/Main';
import { Stack } from '@mui/system';
import Navbar from '../src/components/Navbar';
import { useRouter } from 'next/router';

export const FiltersContext = React.createContext()

export default function Index() {

  const router = useRouter()
  let queryParams = Object.entries(router.query)
  let filtersArray = queryParams.map(([filterName, filterValue]) => {
    return { name: filterName, value: filterValue }
  })
  return (
    <>
      <FiltersContext.Provider value={filtersArray}>
        <Navbar />
        <Stack
          direction="row"
        >
          <Leftbar />
          <Main/>
        </Stack>
      </FiltersContext.Provider>
    </>

  );
}

export const getServerSideProps = async (context) => {
  try {
    const queryParams = context.resolvedUrl.replace("/", "")
    const req = fetch("http://localhost:9000" + queryParams)
    return {
      props: {  }
    }
  } catch (error) {
    console.log(error);
    return {
      props: { error: true }
    }
  }
}