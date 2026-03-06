import { CONFIG } from 'src/config-global';

import { ShowOrderView } from 'src/sections/order/view';


export default function Page() {
  return (
    <>
      <title>{`Consultar órdenes - ${CONFIG.appName}`}</title>

      <ShowOrderView />
    </>
  );
}