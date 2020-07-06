import React, { useState, Fragment } from 'react';
import Dropzone from 'react-dropzone'
import ReactDropzone from "react-dropzone";

import classes from './UploadForm.module.css';



const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif']

function  UploadForm() {

    const [images, setImages] = useState([]);


    const handleOnDrop = async (acceptedFiles, rejectedFiles) => {
        if(acceptedFiles && acceptedFiles.length > 0){
            let imgs = [];
            for (var i = 0; i < acceptedFiles.length; i++) { //for multiple files          
                (function(file) {
                    var name = file.name;
                    var reader = new FileReader();  
                    reader.onload = function(e) {  
                        // get file content  
                        var pic = e.target.result; 
                        imgs.push(pic);
                    }
                    reader.readAsDataURL(file, "UTF-8");
                })(acceptedFiles[i]);
            }
            setTimeout(() => {
                setImages(imgs);
            }, acceptedFiles.length * 20);
        }
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
                            <p className={classes.zoneText}>
                                <span className={classes.chooseFile}>Choose image files</span>
                                or drag them here
                            </p>
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
                            key={file}
                            src={file}
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