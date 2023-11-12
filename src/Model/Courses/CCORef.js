import axios from 'axios'

const WS_PATH= "https://nafes.app/revision/revision-php/ws/"; 

class CCORef {

    constructor() {
        this.countryId = 0;
        this.standardId = 0;
        this.grade = 0;
        this.subjectId = 0;

    }

    getAsJson() {

        let obj = {};
        obj.countryId = this.countryId;
        obj.standardId = this.standardId;
        obj.grade = this.grade;
        obj.subjectId = this.subjectId;

        return obj;
    }

    initFromJson(obj) {
        this.countryId = obj.countryId;
        this.standardId = obj.standardId;
        this.grade = obj.grade;
        this.subjectId = obj.subjectId;
    }

    getCountries(callback) {
        axios({
            method: 'post',
            url:WS_PATH+'cco/CcoWS.php?method=getCountries',

            headers: {
                "Content-type": 'application/x-www-form-urlencoded'
            }

        }).then(function (response) {


            callback(response);
        })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }


    getStandard(countryId, callback) {

        axios({
            method: 'post',
            url:WS_PATH +'cco/CcoWS.php?method=getStandard&countryId=' + countryId,


            headers: {
                "Content-type": 'application/x-www-form-urlencoded'
            }

        }).then(function (response) {

            callback(response);
        })
            .catch(function (error) {
                // ////console.log(error);
            });

    }


    getStandardGrad(standardId, callback) {

        axios({
            method: 'post',
            url:WS_PATH +'cco/CcoWS.php?method=getStandardGrad&standardId=' + standardId,


            headers: {
                "Content-type": 'application/x-www-form-urlencoded'
            }

        }).then(function (response) {

            callback(response);
        })
            .catch(function (error) {
                // ////console.log(error);
            });

    }

    getGradSubjects(gradId, callback) {
        axios({
            method: 'post',
            url:WS_PATH +'cco/CcoWS.php?method=getGradSubjects&gradId=' + gradId,


            headers: {
                "Content-type": 'application/x-www-form-urlencoded'
            }

        }).then(function (response) {

            callback(response);
        })
            .catch(function (error) {
                // ////console.log(error);
            });
        }




}

export default CCORef;