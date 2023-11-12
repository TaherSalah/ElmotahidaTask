import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import './HomeSettings.css'
import Course from "../../Model/Courses/Course.js";
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCourse } from '../../Actions/currentCourseActions.js';
import { useHistory } from 'react-router-dom';


function HomeSettings() {

    const editState = 0;
    const addState = 1;
    const [flag, setflag] = useState(-1);



    const [allcoursesList, setallcourses] = useState([]);
    const [visible, setVisible] = useState(false);
    const [showMessage, setShowMessage] = useState(false);


    const [formData, setFormData] = useState({});
    const [courseAdd, setCourseAdd] = useState(new Course())



    const [countryList, setCountryList] = useState([]);
    const [selectCountry, setSelectCountry] = useState(null);



    const [standardList, setStandardList] = useState();
    const [selectStandard, setSelectStandard] = useState(null);

    const [standardGradList, setStandardGradList] = useState();
    const [selectStandardGrade, setselectStandardGrade] = useState(null);


    const [gradSubjectsList, setGradSubjectsList] = useState(null);
    const [selectGradSubject, setSelectGradSubject] = useState(null);
    useSelector((state) => state.currentCourse.course);  //use selector used to get data from redux store to component
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {

        formik.setValues({
            ...courseAdd
        })

    }, [courseAdd])

    useEffect(() => {
        courseAdd.ccoRef.getCountries(function (response) {
            setCountryList(response.data.detail)
        });
    }, [])

    useEffect(() => {
        if (selectCountry) {
            courseAdd.ccoRef.countryId = selectCountry.COUNTRY_ID
            courseAdd.ccoRef.getStandard(selectCountry.COUNTRY_ID, function (response) {
                setStandardList(response.data.detail)

            })
        }
    }, [selectCountry]);

    useEffect(() => {
        if (selectStandard) {

            courseAdd.ccoRef.standardId = selectStandard.STANDARD_ID;

            courseAdd.ccoRef.getStandardGrad(selectStandard.STANDARD_ID, function (response) {
                setStandardGradList(response.data.detail)

            })
        }
    }, [selectStandard]);

    useEffect(() => {
        if (selectStandardGrade) {
            courseAdd.ccoRef.grade = selectStandardGrade.GRADE_ID;

            courseAdd.ccoRef.getGradSubjects(selectStandardGrade.GRADE_ID, function (response) {
                setGradSubjectsList(response.data.detail)
            })

        }
    }, [selectStandardGrade]);

    useEffect(() => {
        if (selectGradSubject) {
            courseAdd.ccoRef.subjectId = selectGradSubject.SUBJECT_ID;
        }
    }, [selectGradSubject]);




    const formik = useFormik({
        initialValues: {
            ...courseAdd
        },

        validate: (data) => {
            let errors = {};

            if (!data.courseName) {
                errors.courseName = 'Name is required.';
            }

            if (!data.courseId) {
                errors.courseId = 'ID is required.';
            }

            if (!data.themeColor) {
                errors.themeColor = 'Theme Color Is Required.';
            }
            if (!data.ccoRef.countryId) {
                errors.country = 'Country is required';
            }
            if (!data.ccoRef.standardId) {
                errors.standard = 'Standard is required';
            }
            if (!data.ccoRef.grade) {
                errors.grade = 'Grade is required';
            }
            if (!data.ccoRef.subjectId) {
                errors.subjectId = 'subject is required';
            }
            if (!/^[0-9]+$/.test(data.courseId)) {
                errors.courseId = 'ID Must Be Nmber';
            }
            if (!/^[a-zA-Z]*$/.test(data.courseName)) {
                errors.courseName = 'Name Must Be string';
            }
            if (!/^[a-zA-Z]*$/.test(data.themeColor)) {
                errors.themeColor = 'Theme Must Be string';
            }


            return errors;
        },
        onSubmit: (data) => {

            if (flag == addState)
                submitAdd(data)
            else {
                submitEdit(data)
            }
        }
    });



    const submitEdit = (data) => {
        let course = new Course()
        course.initFromJson(data)
        course.editRecentCourse(() => {
            let listData = []
            allcoursesList.map(item => {
                listData.push(item)
            })
            listData.map(item => {
                if (item.courseId == course.courseId) {
                    item.initFromJson(course)
                }
            })
            setallcourses(listData)
            setFormData(course);
            setShowMessage(true);
            setVisible(false)
            formik.resetForm();
        })
        dispatch(setCurrentCourse(course));
    }

    const submitAdd = (data) => {
        let course = new Course()
        course.initFromJson(data)
        course.saveRecentCourse(() => {
            setFormData(course);
            setShowMessage(true);
            setVisible(false)
            allcoursesList.push(course)
            dispatch(setCurrentCourse(course));
            formik.resetForm();
        })
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };




    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"
        autoFocus onClick={() => setShowMessage(false)} /></div>;
    const courseDetails = (course) => {
        dispatch(setCurrentCourse(course));
        history.push(`/app/courseDetails/${course.courseId}`);
    };


    const EditBtn = (course) => {
        return (
            <>
                <Button className="addbtn" label="تعديل" onClick={() => showEditDialog(course)} />

            </>

        )
    }
    const DetailsBtn = (course) => {
        return (
            <>
                <Button className="addbtn" label="التفاصيل" onClick={() => courseDetails(course)} />

            </>

        )
    }

    const showEditDialog = (course) => {
        setflag(editState);
        setCourseAdd(course)
        setVisible(true)
    }
    const showFormDialog = () => {
        setflag(addState)
        setVisible(true)
        formik.resetForm()
        setCourseAdd(new Course())
    }

    const addOrEdit = () => {
        if (flag == addState) {
            return (
                <h5 className="text-center m-3">Add Course</h5>
            )
        }
        else {
            return (
                <h5 className="text-center m-3">Edit Course</h5>
            )
        }
    }
    return (
        <>
            <Dialog header="Success Message" visible={showMessage} style={{ width: '50vw' }} footer={dialogFooter} onHide={() => setShowMessage(false)}>
                <h5> The Cource Has Been Added Successfully </h5>
            </Dialog>
            <div >
                <div>
                    <Button label="اضافه" icon="pi pi-external-link" className="addbtn m-5" onClick={showFormDialog} />
                </div>

                <Dialog header="" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <div className="card ">
                        {addOrEdit(flag)}
                        <form onSubmit={formik.handleSubmit} className="p-fluid">

                            <div className="field ">
                                <span className="p-float-label p-input-icon-right ">
                                    <i className="pi pi-id-card" />
                                    <InputText id="courseId" name="courseId" value={formik.values.courseId} onChange={formik.handleChange} autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('courseId') })} />
                                    <label htmlFor="courseId" className={classNames({ 'p-error': isFormFieldValid('courseId') })}>ID</label>
                                </span>
                                {getFormErrorMessage('courseId')}
                            </div>

                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-users" />
                                    <InputText id="courseName" name="courseName" value={formik.values.courseName} onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('courseName') })} />
                                    <label htmlFor="courseName" className={classNames({ 'p-error': isFormFieldValid('courseName') })}>Name</label>
                                </span>
                                {getFormErrorMessage('courseName')}
                            </div>
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-star-fill" />

                                    <InputText id="themeColor" name="themeColor" value={formik.values.themeColor} onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('themeColor') })} />

                                    <label htmlFor="themeColor" className={classNames({ 'p-error': isFormFieldValid('themeColor') })}>Theme Color</label>
                                </span>
                                {getFormErrorMessage('themeColor')}
                            </div>

                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <Dropdown value={selectCountry} onChange={(e) => setSelectCountry(e.value)} options={countryList} optionLabel="SHORT_NAME"
                                        placeholder="Select a Country" />
                                    <label htmlFor="Selected country" className={classNames({ 'p-error': isFormFieldValid('country') })}>Country</label>
                                </span>
                                {getFormErrorMessage('country')}
                            </div>

                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <Dropdown value={selectStandard} onChange={(e) => setSelectStandard(e.value)} options={standardList} optionLabel="STANDARD_NAME"
                                        placeholder="Select Standard" />
                                    <label htmlFor="ccoRef" className={classNames({ 'p-error': isFormFieldValid('standard') })}>Standard</label>
                                </span>
                                {getFormErrorMessage('standard')}
                            </div>

                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <Dropdown value={selectStandardGrade} onChange={(e) => setselectStandardGrade(e.value)} options={standardGradList} optionLabel="GRADE_Name"
                                        placeholder="Select Grade" />
                                    <label htmlFor="grade" className={classNames({ 'p-error': isFormFieldValid('grade') })}>Standard Grade</label>
                                </span>
                                {getFormErrorMessage('grade')}
                            </div>
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <Dropdown value={selectGradSubject} onChange={(e) => setSelectGradSubject(e.value)} options={gradSubjectsList} optionLabel="SUBJECT_NAME"
                                        placeholder="Grade Subject" />
                                    <label htmlFor="grade Subject" className={classNames({ 'p-error': isFormFieldValid('subjectId') })}> Grade Subjects</label>
                                </span>
                                {getFormErrorMessage('subjectId')}
                            </div>

                            <Button type="submit" label="Submit" className="mt-2" />
                        </form>
                    </div>

                </Dialog>

                <div className="p-4">
                    <DataTable value={allcoursesList} tableStyle={{ maxWidth: '98%', margin: 'auto', border: "1px ", direction: "ltr", }}>
                        <Column field="courseId" header="ID" ></Column>
                        <Column field="courseName" header="Name"></Column>
                        <Column field="themeColor" header="Theme"></Column>
                        <Column header="Edit" body={EditBtn}></Column>
                        <Column header="Details" body={DetailsBtn}></Column>
                    </DataTable>
                </div>
            </div>


        </>
    );
}

export default HomeSettings;