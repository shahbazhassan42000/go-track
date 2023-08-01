// Call the dataTables jQuery plugin
$(document).ready(function () {
    // get user applications and add in data-table
    fetch("/api/user/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }).then(res => {
        if (res.status === 200) {
            res.json().then(data => {
                data.forEach((u) => {
                    let bg_class = 'bg-white text-black';
                    switch (u.status) {
                        case 'Active':
                            bg_class = 'bg-success text-white';
                            break;
                        case 'Block':
                            bg_class = 'bg-danger text-white';
                            break;
                        default:
                            bg_class = 'bg-white text-black';
                            break;
                    }
                    $('#dataTable tbody').append(`<tr>
                    <td>${u.name}</td>
                    <td>${u.email}</td>
                    <td>${u.CNIC}</td>
                    <td>${u.education}</td>
                    <td>${u.province}</td>
                    <td>${u.phone}</td>
                    <td class="${bg_class}"><select class=" user-status  ${bg_class}" style="border:none; outline: none;" data-id="${u.id}">
                    <option value="Active" ${u.status === "Active" && 'selected'}>Active</option>
                    <option value="Block" ${u.status === "Block" && 'selected'}>Block</option>
                    </select></td>
                    </tr>`);
                    // update updated date if its yesterday then yesterday time AM/PM if its today then today time AM/PM if its before yesterday then date time AM/PM
                    var date = new Date(u.updatedAt);
                    var today = new Date();
                    var yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    var updated_date = "";
                    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                        updated_date = "Today " + date.getHours() + ":" + date.getMinutes() + " " + (date.getHours() >= 12 ? "PM" : "AM");
                    } else if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()) {
                        updated_date = "Yesterday " + date.getHours() + ":" + date.getMinutes() + " " + (date.getHours() >= 12 ? "PM" : "AM");
                    } else {
                        updated_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + " " + (date.getHours() >= 12 ? "PM" : "AM");
                    }
                    $('#updated_date').text(updated_date);
                }); // END OF data for EACH LOOP
                $('#dataTable').DataTable();
                // update updated date

                $('.user-status').change(function () {
                    const status = $(this).val();
                    // Get the data-id attribute
                    const id = $(this).data('id');
                    fetch("/api/user/status", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify({
                            user: {
                                id,
                                status
                            }
                        })
                    }).then(res => {
                        if (res.status === 200) {
                            res.json().then(data => {
                                console.log(`User status updated successfully of user ID: ${id})`);
                            });
                        } else {
                            res.json().then(data => {
                                console.log(`ERROR!!! While updating user status of user ID: ${id})`);
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                        console.log(`ERROR!!! While updating user status of user ID: ${id})`);
                    }).finally(() => {
                        window.location.reload();
                    });
                });

            }); // END OF res.json()
        } else {
            swal.fire("Error!!!", "While getting users.", "error");
        }
    }).catch(err => {
        swal.fire("Error!!!", "While getting users.", "error");
    });


});
