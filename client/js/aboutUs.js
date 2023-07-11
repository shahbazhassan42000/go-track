window.addEventListener('load', () => {

    const submit_btn = document.getElementById('submit_btn');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    submit_btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (name.value === '' || email.value === '' || subject.value === '' || message.value === '') {
            alert('Please fill all the fields');
            return;
        }
        const data = {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        };
        fetch('/api/contact-us', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    alert("Message sent successfully.");
                    window.location.href = "/contact.html";
                });
            } else {
                alert('ERROR!!! While sending message, Please try again.');
            }
        }).catch(err => {
            alert('ERROR!!! While sending message, Please try again.');
        });
    });


});