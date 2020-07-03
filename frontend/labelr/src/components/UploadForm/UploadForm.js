import React, { useState, Fragment } from 'react';
import Dropzone from 'react-dropzone'
import ReactDropzone from "react-dropzone";

import classes from './UploadForm.module.css';



const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif']

function  UploadForm() {

    const [images, setImages] = useState([]);

    const handleOnDrop = (files, rejectedFiles) => {
        console.log('accepted files', files);
        console.log('rejected files', rejectedFiles);
        setImages(files);
        if(rejectedFiles && rejectedFiles.length > 0){
            const currentRejectedFile = rejectedFiles[0];
            const currentRejectedFileType = currentRejectedFile.type; 
            const currentRejectedFileSize = currentRejectedFile.size; 
        }
        ////////////////////////////////////////////////////////////////
        /////////////////////////// TODO ///////////////////////////////
        ////////////////////////////////////////////////////////////////
    }

    const onStartUpload = () => {
        ////////////////////////////////////////////////////////////////
        /////////////////////////// TODO ///////////////////////////////
        ////////////////////////////////////////////////////////////////
    }

    const previewStyle = {
        display: 'inline',
        width: 100,
        height: 100,
      };

    const  onPreviewDrop = (files) => {
        setImages(images.concat(files))
      }

    return(
        <main className={classes.main}>
            <h1>Upload your Images</h1>
            <hr/>
            <form className={classes.uploadForm}>
                <label>Category name:</label>
                <input type='text'/>


                <Dropzone 
                    onDrop={handleOnDrop}
                    maxSize={imageMaxSize}
                    accept='image/*'>
                    {({getRootProps, getInputProps}) => (
                        <section className={classes.dropzone}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className={classes.zoneText}><span className={classes.chooseFile}>Choose image files</span> or drag them here</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
                {
                    images.length > 0 &&
                    <Fragment>
                        <h3>Previews</h3>
                        {images.map((file) => (
                        <img
                            alt="Preview"
                            key={file.preview}
                            src={file.preview}
                            style={previewStyle}
                        />))}
                </Fragment>
                }
                <div className={classes.buttonContainer}>
                    <button type='submit' onClick={onStartUpload}>Start the upload</button>
                </div>
            </form>
        </main >
    )
}

export default UploadForm;