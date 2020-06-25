import React, { useState } from 'react';
import Dropzone from 'react-dropzone'

import classes from './UploadForm.module.css';

const imageMaxSize = 10000000;

function  UploadForm() {

    const [images, setImages] = useState(null);

    const handleOnDrop = (files, rejectedFiles) => {
        console.log('accepted files', files);
        console.log('rejected files', rejectedFiles);
        ////////////////////////////////////////////////////////////////
        /////////////////////////// TODO ///////////////////////////////
        ////////////////////////////////////////////////////////////////
    }

    const onStartUpload = () => {
        ////////////////////////////////////////////////////////////////
        /////////////////////////// TODO ///////////////////////////////
        ////////////////////////////////////////////////////////////////
    }

    return(
        <div>
            <h1>Upload your Images</h1>
            <form className={classes.uploadForm}>
                <label>Category name:</label>
                <input type='text'/>
                <label>Your Images:</label>
                <Dropzone 
                    onDrop={handleOnDrop}
                    maxSize={imageMaxSize}
                    accept='image/*'>
                    {({getRootProps, getInputProps}) => (
                        <section className={classes.dropzone}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p><span className={classes.chooseFile}>Choose image files</span> or drag them here</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
                
                <button onClick={onStartUpload}>Start the upload</button>
            </form>
        </div>
    )
}

export default UploadForm;