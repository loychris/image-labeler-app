import React, { useState, Fragment } from 'react';
import Dropzone from 'react-dropzone'

import ImgPreview from './ImgPreview/ImgPreview';
import classes from './UploadForm.module.css';



const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif']

function  UploadForm() {

    const [images, setImages] = useState([]);


    const handleOnDrop = async (acceptedFiles, rejectedFiles) => {
        console.log(acceptedFiles);
        if(acceptedFiles && acceptedFiles.length > 0){
            let imgs = [];
            for (var i = 0; i < acceptedFiles.length; i++) { //for multiple files          
                (function(file) {
                    var name = file.name;
                    var reader = new FileReader();  
                    reader.onload = function(e) {  
                        imgs.push(e.target.result);
                    }
                    reader.readAsDataURL(file, "UTF-8");
                })(acceptedFiles[i]);
            }
            setTimeout(() => {
                const imagesNew = [];
                for(let i = 0; i<imgs.length; i++){
                    imagesNew.push({src: imgs[i], id: i})
                }
                setImages(imagesNew);
            }, acceptedFiles.length * 20);
        }
    }

    const remove = (id) => {
        const imagesNew = images.filter(x => x.id !== id);
        setImages(imagesNew);
    }

    const onStartUpload = () => {
        ////////////////////////////////////////////////////////////////
        /////////////////////////// TODO ///////////////////////////////
        ////////////////////////////////////////////////////////////////
    }

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
                <div className={classes.Previews}>
                    {
                        images.length > 0 ? 
                            images.map((img) => (
                                <ImgPreview src={img.src} remove={() => remove(img.id)} key={img.id}/>
                            ))
                            : null
                    }
                </div> 
                <Dropzone 
                    onDrop={handleOnDrop}
                    maxSize={imageMaxSize}
                    accept='image/*'>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <section className={classes.dropzone}>
                                <p className={classes.zoneText}>
                                    <span className={classes.chooseFile}>Choose image files</span>
                                    or drag them here
                                </p>
                            </section>
                        </div>
                    )}
                </Dropzone>


                <div className={classes.buttonContainer}>
                    <button type='submit' onClick={onStartUpload}>Start the upload</button>
                </div>
            </form>
        </main >
    )
}

export default UploadForm;