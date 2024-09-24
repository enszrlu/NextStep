import type { ReactNode } from 'react';
interface DynamicPortalProps {
    viewportID?: string;
    children: ReactNode;
}
declare const DynamicPortal: React.FC<DynamicPortalProps>;
export default DynamicPortal;
