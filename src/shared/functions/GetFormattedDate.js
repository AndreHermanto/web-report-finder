export function GetFormattedDate(date) {
    var dateObj = new Date(date);
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    return day + "/" + month + "/" + year;
  }