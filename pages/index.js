import * as React from 'react';
import Box from "@mui/material/Box"
import Leftbar from '../src/components/Leftbar';
import Main from '../src/components/Main';
import Navbar from '../src/components/Navbar';
import { useRouter } from 'next/router';

export const FiltersContext = React.createContext()

export default function Index({ campos }) {
  console.log(campos.count);
  const router = useRouter()
  let queryParams = Object.entries(router.query)
  let filtersArray = queryParams.map(([filterName, filterValue]) => {
    return { name: filterName, value: filterValue }
  })
  return (
    <>
      <FiltersContext.Provider value={filtersArray}>
        <Navbar showFilterAndOrder={true}/>
        <Box
          display="inline"
        >
          <Leftbar />
          <Main campos={campos} />
        </Box>
      </FiltersContext.Provider>
    </>

  );
}

export const getServerSideProps = async (context) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const queryParams = context.resolvedUrl.replace("/", "")
  let limitAndOffsetQueries
  if (context.query["page_id"] == undefined) {
    limitAndOffsetQueries = "page_size=9&page_id=1"
  } else {
    limitAndOffsetQueries = `page_size=9&page_id=${context.query["page_id"]}`
  }

  let camposUrl
  let countUrl
  try {
    if (!queryParams) {
      camposUrl = apiUrl + "/campos?" + limitAndOffsetQueries

    } else {
      camposUrl = apiUrl + "/filtered-campos" + queryParams + "&" + limitAndOffsetQueries
    }
    const camposReq = await fetch(camposUrl)
    const camposRes = await camposReq.json()

    if (!queryParams) {
      countUrl = apiUrl + "/filtered-campos-count"
    } else {
      countUrl = apiUrl + "/filtered-campos-count" + queryParams
    }
    const countReq = await fetch(countUrl)
    const countRes = await countReq.json()

    const campos = { list: camposRes, count: countRes }
    return {
      props: { campos }
    }
  } catch (error) {
    console.log(error);
    return {
      props: { error: true }
    }
  }
}