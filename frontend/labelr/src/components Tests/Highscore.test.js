import React from 'react'
import { shallow } from 'enzyme'
import Highscore from "../components/Highscore/Highscore";


test('should render', () =>{
    const component = shallow(<Highscore/>)
    expect(component).not.toBe(null);
})