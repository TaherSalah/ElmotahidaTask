import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Elmotahida from '../../Images/Elmotahida.png'


export default function CourseDetails() {
    const currentCourse = useSelector((state) => state.currentCourse.course);

    const header = (
        <img alt="Card" src={Elmotahida} />
    );
    return (
        <div className="card text-center bg-dark flex justify-content-center align-items-center p-5">
            <Card title="تفاصيل الكورس" subTitle="" header={header} className="md:w-25rem">
                <p>ID: {currentCourse.courseId}</p>
                <p>Name: {currentCourse.courseName}</p>
                <p>Theme: {currentCourse.themeColor}</p>
            </Card>
        </div>
    )
}
