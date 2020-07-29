import React from 'react'
import { shallow } from 'enzyme'
import ImageQueue from "../components/ImageQueue/ImageQueue";


test('should render', () =>{
    const component = shallow(ImageQueue);
    expect(component).not.toBe(null);
})