import React from 'react'
import { shallow } from 'enzyme'
import UploaderHome from "../components/UploaderHome/UploaderHome";
import classes from "../components/UploaderHome/UploaderHome.module.css";


test('should bring me back', () =>{
    const component = shallow(<UploaderHome/>);
    const wrapper = component.find({ className: classes.Icons });
    expect(wrapper.length).tobe(4);
})