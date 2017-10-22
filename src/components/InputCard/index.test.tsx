import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { InputCard } from './';

describe('InputCard --- Snapshot',() => {
    it('matches Snapshot of empty InputCard', () => {
        const component = <InputCard className="draw" title="Creature"><p>Empty card</p></InputCard>;
        const renderedValue =  renderer.create(component).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});