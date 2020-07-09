import React, { useState, Fragment } from 'react';
import Dropzone from 'react-dropzone'

import ImgPreview from './ImgPreview/ImgPreview';
import classes from './UploadForm.module.css';



const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif']

function  UploadForm() {

    const [images, setImages] = useState([]);
    const [icon, setIcon] = useState(null);

    const handleIconDrop = async (acceptedFiles, rejectedFiles) => {
        if(acceptedFiles && acceptedFiles.length > 0){
            var reader = new FileReader();  
            reader.onload = function(e) {  
                setIcon(e.target.result);
            }
            reader.readAsDataURL(acceptedFiles[0], "UTF-8");
        }
    }

    const getUploadIcon = () => {
        return(
            <svg className={classes.uploadIcon} width="121" height="120" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="cloud_upload_24px">
                <path id="icon/file/cloud_upload_24px" fillRule="evenodd" clipRule="evenodd" d="M97.1533 50.2C93.7533 32.95 78.6033 20 60.4033 20C45.9533 20 33.4033 28.2 27.1533 40.2C12.1033 41.8 0.40332 54.55 0.40332 70C0.40332 86.55 13.8533 100 30.4033 100H95.4033C109.203 100 120.403 88.8 120.403 75C120.403 61.8 110.153 51.1 97.1533 50.2ZM95.4033 90H30.4033C19.3533 90 10.4033 81.05 10.4033 70C10.4033 59.75 18.0533 51.2 28.2033 50.15L33.5533 49.6L36.0533 44.85C40.8033 35.7 50.1033 30 60.4033 30C73.5033 30 84.8033 39.3 87.3533 52.15L88.8533 59.65L96.5033 60.2C104.303 60.7 110.403 67.25 110.403 75C110.403 83.25 103.653 90 95.4033 90ZM53.1534 65H40.4034L60.4034 45L80.4034 65H67.6534V80H53.1534V65Z" fill="#212529" fillOpacity="0.7"/>
                </g>
            </svg>
        )
    }


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
        
    }


    return(
        <main className={classes.main}>
            <h1>Upload your Images</h1>
            <hr/>
            <form className={classes.uploadForm}>
                <div className={classes.inputContainer}>
                    <label>Icon: </label>
                    <Dropzone 
                        onDrop={handleIconDrop}
                        maxSize={imageMaxSize}
                        maxFiles={1}
                        multiple={false}
                        accept='image/*'>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className={classes.iconDropZone}>
                                    {icon ? 
                                        <img className={classes.Icon} src={icon} alt=''/> : 
                                        getUploadIcon()}
                                </div>
                                
                            </div>
                        )}
                    </Dropzone>
                    <div>
                        <label>Category name:</label>
                        <input type='text'/>
                    </div>
                </div>

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
                                    {getUploadIcon()}
                                    <span className={classes.chooseFile}>Choose image files </span>
                                    or drag them here
                                </p>
                            </section>
                        </div>
                    )}
                </Dropzone>
                <div className={classes.buttonContainer}>
                    <button type='submit' onClick={onStartUpload}>Upload Image Set for ${images.length*0.02.toFixed(2)}</button>
                </div>
            </form>
        </main >
    )
}

export default UploadForm;