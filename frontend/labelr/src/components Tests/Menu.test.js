import React from 'react'
import { shallow } from 'enzyme'
import Menu from "../components/Menu/Menu";


test('should render', () =>{
    const component = shallow(<Menu/>);
    expect(component).not.toBe(null);
})