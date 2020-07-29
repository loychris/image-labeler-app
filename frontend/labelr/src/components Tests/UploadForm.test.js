import React from 'react'
import { shallow } from 'enzyme'
import UploadForm from "../components/UploadForm/UploadForm";


test('should render', () =>{
    const component =shallow(<UploadForm/>);
    expect(component).not.toBe(null);
})