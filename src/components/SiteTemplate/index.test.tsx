import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Page } from './';

describe('SiteTemplate --- Snapshot',() => {
    it('matches Snapshot of empty InputCard', () => {
        const component = <Page>Content</Page>;
        const renderedValue =  renderer.create(component).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});