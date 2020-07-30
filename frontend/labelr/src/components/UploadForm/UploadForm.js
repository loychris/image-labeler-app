import React, { useState, Fragment } from 'react';
import Dropzone from 'react-dropzone'
import uuid from 'react-uuid'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';




import ImgPreview from './ImgPreview/ImgPreview';
import classes from './UploadForm.module.css';

import { useHttpClient } from './http-hook';


const imageMaxSize = 1000000000; // bytes

function  UploadForm() {

    const [goal, setGoal] = useState(1);
    const [icon, setIcon] = useState(null);
    const [name, setName] = useState('');
    const [weeks, setWeeks] = useState(5);
    const [deadline, setDeadline] = useState(new Date().toGMTString());
    const [uploadProgress, setUploadProgress] = useState(0); 

    const [files, setFiles] = useState([]);


    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();





    const getUploadIcon = () => {
        return(
            <svg className={classes.uploadIcon} width="121" height="120" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="cloud_upload_24px">
                <path id="icon/file/cloud_upload_24px" fillRule="evenodd" clipRule="evenodd" d="M97.1533 50.2C93.7533 32.95 78.6033 20 60.4033 20C45.9533 20 33.4033 28.2 27.1533 40.2C12.1033 41.8 0.40332 54.55 0.40332 70C0.40332 86.55 13.8533 100 30.4033 100H95.4033C109.203 100 120.403 88.8 120.403 75C120.403 61.8 110.153 51.1 97.1533 50.2ZM95.4033 90H30.4033C19.3533 90 10.4033 81.05 10.4033 70C10.4033 59.75 18.0533 51.2 28.2033 50.15L33.5533 49.6L36.0533 44.85C40.8033 35.7 50.1033 30 60.4033 30C73.5033 30 84.8033 39.3 87.3533 52.15L88.8533 59.65L96.5033 60.2C104.303 60.7 110.403 67.25 110.403 75C110.403 83.25 103.653 90 95.4033 90ZM53.1534 65H40.4034L60.4034 45L80.4034 65H67.6534V80H53.1534V65Z" fill="#001628" fillOpacity="0.7"/>
                </g>
            </svg>
        )
    }

    const handleOnNameImput = (event) => {
        if(event.target.value.length <= 20){
            setName(event.target.value);
        }
    }

    const handleOnWeeksInput = (event) => {
        var date = new Date();
        date.setTime(date.getTime() + (event.target.value * 7 * 24 * 60 * 60 * 1000));
        setWeeks(event.target.value);
        setDeadline(date);
    }

    const handleOnRangeInput = (event) => {
        setGoal(event.target.value);
    }


    const deleteImage = (id) => {
        const filesNew = files.filter(f => f.id !== id);
        setFiles(filesNew);
    }


    const handleOnDrop = async (acceptedFiles, rejectedFiles) => {
        if(acceptedFiles && acceptedFiles.length > 0){
            const arrFiles = Array.from(acceptedFiles)
            const newFiles = arrFiles.map((file) => {
                const src = window.URL.createObjectURL(file)
                return { file, id: uuid(), src }
            })
            setFiles(files.concat(newFiles));
        }
    }

    const handleOnIconDrop = async (acceptedFiles, rejectedFiles) => {
        if(acceptedFiles.length > 0){
            const file = acceptedFiles[0];
            const src = window.URL.createObjectURL(file)

            setIcon({ file, src });
        }
    }

    //checking if the 
    const checkValid = () => {
        return files 
            && files.length > 0 
            && name 
            && name.length <= 20 
    }


    const onStartUpload = async () => {
        const currentToken = JSON.parse(localStorage.getItem('userData')).token;
        let ids = [];
        let imgsNew = files;
        for(let i=0; i<files.length; i++){

            const formData = new FormData();
            formData.append('image', files[i].file);
            formData.append('label', name);

            axios({
                method: 'post',
                url: 'http://localhost:3000/upload', 
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${currentToken}`
                }
            })
            .then(res => {
                imgsNew[i]._id = res.data.img._id;
                ids.push(res.data.img._id);
                if(ids.length === files.length){
                    setFiles(imgsNew);
                    const formData = new FormData();
                    formData.append('image', icon ? icon.file : files[0].file);
                    formData.append('deadline', deadline);
                    formData.append('label', name);
                    formData.append('imageId', ids);
                    formData.append('goal', goal*files.length);
                    axios({
                        method: 'post',
                        url: 'http://localhost:3000/set', 
                        data: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${currentToken}`
                        }
                    })
                    .then(res => {
                        console.log('Set saved', res);
                        history.push("/analytics");
                    })
                    .catch(e => {
                        console.log(e.response ? e.response.data: e)
                    });
                }
            })
            .catch((e) => {
                console.log(e)
            }) 
        }
    }
    const date = new Date(deadline)
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date); 

    const price = parseFloat(goal * files.length* 0.01 * (4/(0.5 + Number(weeks)) + 0.3)).toFixed(2);

    return(
        <main>
            <h1>Upload your Images</h1>
            <hr/>
            <form className={classes.uploadForm}>
                <div className={classes.NameContainer}>
                    <h3>Category name:</h3>
                    <input className={classes.Name} onChange={handleOnNameImput} value={name} type='text'/>
                    <span className={classes.NameLength}>{name.length} / 20</span>
                </div>
                <hr/>
                <div className={classes.IconContainer}>
                    <h3>Icon: </h3>
                    <Dropzone 
                        className={classes.IconDrop}
                        onDrop={handleOnIconDrop}
                        maxSize={imageMaxSize}
                        maxFiles={1}
                        multiple={false}
                        accept='image/*'>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className={classes.iconDropZone}>
                                { icon ? 
                                    <img className={classes.Icon} src={icon.src} alt=''/> 
                                    : getUploadIcon()
                                }   
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </div>
                <hr/>
                <div className={classes.Deadline}>
                    <h3>Ready in {weeks} weeks: </h3>
                    <input  type="range" onChange={handleOnWeeksInput} min="1" max="5" value={weeks} list="weeks" />
                    <datalist className={classes.Datalist} id="weeks">
                        <option value="1" label="1"/>
                        <option value="2" label="2"/>
                        <option value="3" label="3"/>
                        <option value="4" label="4"/>
                        <option value="5" label="5"/>
                    </datalist> 
                    <div className={classes.DeadlineResult}>Resulsts ready on: {`${day} ${month} ${year }`}</div>
                </div>
                <hr/>
                <div className={classes.QualityContainer}>
                    <h4>How many people should label each Image?</h4>
                    <input  type="range" onChange={handleOnRangeInput} min="1" max="10" value={goal} list="num" />
                    <datalist className={classes.Datalist} id="num">
                        <option value="1" label="1"/>
                        <option value="2" label="2"/>
                        <option value="3" label="3"/>
                        <option value="4" label="4"/>
                        <option value="5" label="5"/>
                        <option value="6" label="6"/>
                        <option value="7" label="7"/>
                        <option value="8" label="8"/>
                        <option value="9" label="9"/>
                        <option value="10" label="10"/>
                    </datalist> 
                </div>
                <hr/>
                <h3>Images</h3>
                <div className={classes.Previews}>
                        {
                            files.length > 0 ? 
                            files.map((img) => (
                                <ImgPreview src={img.src} key={img.id} remove={() => deleteImage(img.id)}/>
                            )) : null
                        }
                </div>
                <Dropzone 
                    onDrop={handleOnDrop}
                    maxSize={imageMaxSize}
                    accept='image/*'>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <section className={classes.Dropzone}>
                                <div className={classes.ZoneText}> 
                                    {getUploadIcon()}
                                    { 
                                        files.length === 0 ? 
                                            <span className={classes.ChooseFile}>Choose image files </span>
                                        :   <span className={classes.ChooseFile}>Choose more images </span>
                                    }
                                    <span>or drag them here</span>
                                </div>
                            </section>
                        </div>
                    )}
                </Dropzone>
                <div className={classes.ButtonContainer}>
                <Button 
                    onClick={onStartUpload} 
                    variant="contained"     
                    color="#ffffff" 
                                disabled={!checkValid()}> 
                    Upload Image Set for ${price}
                </Button>
                    {/* <button type='button' onClick={onStartUpload} disabled>
                        Upload Image Set for ${images.length*0.02.toFixed(2)}
                    </button> */}
                </div>
            </form>
        </main >
    )
}

export default UploadForm;