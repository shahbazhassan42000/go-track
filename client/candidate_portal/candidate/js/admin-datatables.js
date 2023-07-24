// Call the dataTables jQuery plugin
$(document).ready(function () {
  // get user applications and add in data-table
  fetch("/api/application/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  }).then(res => {
    if (res.status === 200) {
      res.json().then(data => {
        // add rows if status is pending then add class bg-warning
        data.forEach((application) => {
          let bg_class = 'bg-white text-black';
          switch (application.status) {
            case 'Received':
              bg_class = 'bg-info text-white';
              break;
            case 'Pending':
              bg_class = 'bg-warning text-black';
              break;
            case 'Approved':
              bg_class = 'bg-success text-white';
              break;
            case 'Rejected':
              bg_class = 'bg-danger text-white';
              break;
            default:
              bg_class = 'bg-white text-black';
              break;
          }
          $('#dataTable tbody').append(`<tr>
            <td>${application.name}</td>
            <td>${application.email}</td>
            <td>${application.address}</td>
            <td class="${bg_class}">${application.status}</td>
            </tr>`);
          // update updated date if its yesterday then yesterday time AM/PM if its today then today time AM/PM if its before yesterday then date time AM/PM
          var date = new Date(application.updatedAt);
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

      }); // END OF res.json()
    } else {
      alert("ERROR!!! While getting applications.");
    }
  }).catch(err => {
    alert("ERROR!!! While getting applications.");
  });


});
