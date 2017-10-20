import * as React from 'react';
import './Page.css';

interface PageProps {
    children: {};
}
export const Page = (props: PageProps) => (
<div>
    {props.children}
</div>
);

export default Page;