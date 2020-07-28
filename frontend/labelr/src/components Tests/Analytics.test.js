import React from 'react'
import { shallow } from 'enzyme'
import Analytics from "../components/Analytics/Analytics";


test('should render correctly', () =>{
    const component = shallow(<Analytics/>);// muss account hinzufügen ?
    console.log(component.debug());
    expect(component).toBe()
})