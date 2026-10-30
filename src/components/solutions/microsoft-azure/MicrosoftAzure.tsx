import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';
import AzureSpecializedServices from '../azure-specialized/AzureSpecializedServices';
import pageConfig from './pageConfig';

export default function MicrosoftAzure() {
  return (
    <>
      <WhatWeDoServiceLayout page={pageConfig} />
      <AzureSpecializedServices />
    </>
  );
}
