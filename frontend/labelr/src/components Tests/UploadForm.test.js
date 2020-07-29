import React from 'react'
import { shallow } from 'enzyme'
import UploadForm from "../components/UploadForm/UploadForm";


test('should render', () =>{
    const component =shallow(<UploadForm/>);
    const element = component.find({className: 'uploadForm'});
    expect(element.length).toBe(1);
})