const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const id = getParameterByName('id');
if (!id) window.location.href = "/";
window.addEventListener("load", () => {
    const name = document.getElementById("name");
    const father_name = document.getElementById("father_name");
    const father_CNIC = document.getElementById("father_CNIC");
    const CNIC = document.getElementById("CNIC");
    const DOB = document.getElementById("DOB");
    const phone = document.getElementById("phone");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    const last_exam = document.getElementById("last_exam");
    const passing_year = document.getElementById("passing_year");
    const board = document.getElementById("board");
    const total_marks = document.getElementById("total_marks");
    const roll_no = document.getElementById("roll_no");
    const institute = document.getElementById("institute");
    const CNIC_DOC = document.getElementById("CNIC_DOC");
    const result_DOC = document.getElementById("result_DOC");
    const img_placeholder = document.getElementById("img_placeholder");

    //get application data from the server
    fetch('/api/application/getByID/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        }
    }).then(res => {
        if (res.status === 200) {
            res.json().then(data => {
                name.value = data.name;
                father_name.value = data.father_name;
                father_CNIC.value = data.father_CNIC;
                CNIC.value = data.CNIC;
                DOB.value = data.DOB;
                phone.value = data.phone;
                city.value = data.city;
                email.value = data.email;
                last_exam.value = data.last_exam;
                passing_year.value = data.passing_year;
                board.value = data.board;
                total_marks.value = data.total_marks;
                roll_no.value = data.roll_no;
                institute.value = data.institute;
                CNIC_DOC.href = data.CNIC_DOC;
                result_DOC.href = data.result_DOC;
                img_placeholder.src = data.stud_pic;
            })
        } else {
            swal.fire("ERROR!!!", "While getting application details.", "error");
        }
    }).catch(err => {
        swal.fire("ERROR!!!", "While getting application details.", "error");
    });

});