import React from 'react'
import { shallow } from 'enzyme'
import BackButton from "../components/BackButton/BackButton";


test('should be there', () =>{
    const component = shallow(<BackButton/>);
    expect(component).not.toBe(null);
    const element=component.find({className:'backButton'})
    expect(element.length).toBe(1);
})