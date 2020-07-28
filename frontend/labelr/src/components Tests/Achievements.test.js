import React from 'react'
import { shallow } from 'enzyme'
import Achievements from "../components/Achievements/Achievements";


test('should render correctly', () =>{
    const component = shallow(<Achievements/>);
    console.log(component.debug());
    expect(component).toBe()
})