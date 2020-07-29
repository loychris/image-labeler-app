import React from 'react'
import { shallow } from 'enzyme'
import Highscore from "../components/Highscore/Highscore";


test('should render', () =>{
    const component = shallow(<Highscore/>);
    console.log(component.debug());
    expect(component).not.toBe(null);
    const element = component.find({className:'table'});
    expect(element.length).toBe(1);
})