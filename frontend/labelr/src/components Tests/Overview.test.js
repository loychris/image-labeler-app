import React from 'react'
import { shallow } from 'enzyme'
import Overview from "../components/Overview/Overview";


test('should render correctly', () =>{
    const component =shallow(<Overview/>);
    expect(component).not.toBe(null);
})