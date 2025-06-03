import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

// import { BlankView } from 'src/sections/blank/view';
import { ProductListView } from 'src/sections/wiretap/view';

//import {ListTest} from 'src/sections/wiretap/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <BlankView title="Page four" /> */}
      
      <ProductListView/>
      
      {/* <ListTest/> */}
    </>
  );
}
