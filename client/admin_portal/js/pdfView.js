const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const file = getParameterByName('file');
if (!file) window.location.href = "/";
window.addEventListener("load", () => {
    const pdf = document.getElementById("pdf");
    // src="https://docs.google.com/gview?url=https://path.com/to/your/pdf.pdf&embedded=true"
    // pdf.src = `https://docs.google.com/gview?url=${file}&embedded=true`;
    pdf.src = file;
});