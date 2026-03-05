import { CONFIG } from 'src/config-global';

import { RegisterView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Registro - ${CONFIG.appName}`}</title>

      <RegisterView />
    </>
  );
}
