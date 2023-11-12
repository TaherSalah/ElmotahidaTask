import CCORef from "./CCORef";

 class Course {

    constructor(){
        this.courseId=0;
        this.courseName=""
        this.themeColor=""
        this.ccoRef=new CCORef()

    }
    

    saveRecentCourse=(callback)=>{

        window.localStorage.setItem("recentAddedCourse" , JSON.stringify(this.getAsJson()))

        callback()
    }

    editRecentCourse=(callback)=>{

        window.localStorage.setItem("recentAddedCourse" , JSON.stringify(this.getAsJson()))

        callback()
    }

    // deleteRecentCourse=(callback)=>{

    //     window.localStorage.setItem("recentAddedCourse" , JSON.stringify(this.getAsJson()))

    //     callback()
    // }

    getAsJson(){
        
        let obj ={};
        obj.courseId=this.courseId;
        obj.courseName=this.courseName;
        obj.themeColor=this.themeColor;
        obj.ccoRef=this.ccoRef.getAsJson();

        return obj;
    }

    initFromJson(obj){
        this.courseId=obj.courseId;
        this.courseName=obj.courseName;
        this.themeColor=obj.themeColor;
        this.ccoRef=new CCORef();
        this.ccoRef.initFromJson(obj.ccoRef);
    }
    
   

}

export default Course;