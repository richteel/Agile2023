const existing_appointments = document.getElementById("existing_appointments");
const new_patient = document.getElementsByName("new_patient");
const name_last = document.getElementById("name_last");
const name_first = document.getElementById("name_first");
const dob = document.getElementById("dob");
const appt_date = document.getElementById("appt_date");
const appt_time = document.getElementById("appt_time");
const appt_type = document.getElementById("appt_type");
const appt_note = document.getElementById("appt_note");
const avail_calendar = document.getElementById("avail_calendar");
const month_names = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
const dow_names = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const cal_months = [];
const today = new Date();

let cal_index = 0;

const appointment = {
    "new_patient": "New Patient",
    "name_last": "Patient's Last Name",
    "name_first": "Patient's First Name",
    "dob": "Patient's Date of Birth (MM/DD/YYYY)",
    "appt_date": "Appointment Date (MM/DD/YYYY)",
    "appt_time": "Appointment Time (HH:MM)",
    "appt_type": "Requested Appointment Type",
    "appt_note": "Optional Additional Information",
}

const MONTHS_AVAIL = 6

function add_calendar(elem) {
    if (!elem) { return; }

    let y = new Date().getFullYear();
    let m = new Date().getMonth();
    for (let i = 0; i < MONTHS_AVAIL; i++) {
        let tab = document.createElement("table");
        let next_month = m + 1;
        let next_year = y;
        if (next_month > 11) {
            next_month = 0;
            next_year++;
        }
        let current_month_last_day = new Date();
        current_month_last_day.setDate(1);
        current_month_last_day.setMonth(next_month);
        current_month_last_day.setFullYear(next_year);
        current_month_last_day.setDate(0);

        let month_name_row = document.createElement("tr");
        let month_previous_cell = document.createElement("td");
        let month_name_cell = document.createElement("td");
        let month_next_cell = document.createElement("td");
        let month_previous_button = document.createElement("input")
        let month_next_button = document.createElement("input")

        /* ADD MONTH ROW */
        month_previous_button.type = "button";
        month_previous_button.value = "<";
        month_previous_button.addEventListener("click", calendar_previous);
        if (m == (new Date().getMonth())) {
            month_previous_button.disabled = "disabled";
        }
        month_previous_cell.append(month_previous_button);

        month_next_button.type = "button";
        month_next_button.value = ">";
        month_next_button.addEventListener("click", calendar_next);
        if (i == (MONTHS_AVAIL - 1)) {
            month_next_button.disabled = "disabled";
        }
        month_next_cell.append(month_next_button);
        month_name_cell.innerText = month_names[m] + " " + y.toString();
        month_name_cell.colSpan = 5;

        month_name_row.classList.add("cal_month_row");
        month_name_row.append(month_previous_cell);
        month_name_row.append(month_name_cell);
        month_name_row.append(month_next_cell);

        tab.append(month_name_row);

        /* ADD DAYS ROW */
        let dow_row = document.createElement("tr");
        for (let i = 0; i < dow_names.length; i++) {
            let dow_cell = document.createElement("th");
            dow_cell.textContent = dow_names[i];
            dow_row.append(dow_cell);
        }
        tab.append(dow_row);

        const start_date = new Date();
        start_date.setDate(1);
        start_date.setMonth(m);
        start_date.setFullYear(y);

        while (start_date <= current_month_last_day) {
            let week_row = document.createElement("tr");
            for (let wd = 0; wd < 7; wd++) {
                let day_cell = document.createElement("td");
                if (start_date.getDay() != wd || start_date > current_month_last_day) {
                    day_cell.textContent = "";
                }
                else {
                    day_cell.textContent = (start_date.getDate()).toString();
                    if (start_date.getDay() == 0 || start_date.getDay() == 6) {
                        day_cell.classList.add("weekend");
                    }
                    else if (start_date < today) {
                        day_cell.classList.add("notvalid");
                    }
                    else {
                        day_cell.addEventListener("click", date_selected);
                    }
                    start_date.setDate(start_date.getDate() + 1);
                }
                // day_cell.classList.add("weekend");
                week_row.append(day_cell);
            }
            tab.append(week_row);
        }

        /* ADD MONTH TO ARRAY */
        cal_months.push({
            "year": y,
            "month": m,
            "days": current_month_last_day.getDate(),
            "table": tab,
        });

        m = next_month;
        y = next_year;
    }
}

function calendar_previous() {
    calendar_show_month(avail_calendar.id, -1);
}

function calendar_next() {
    calendar_show_month(avail_calendar.id, 1);
}

function calendar_show_month(elem_id, increment) {
    const elem = document.getElementById(elem_id);

    if (!elem) { return; }

    cal_index = cal_index + increment;

    elem.innerHTML = "";
    elem.append(cal_months[cal_index]["table"])

}

function clear_form(elem) {
    if (!elem || !elem.form) { return; }

    elem.form.reset();
}

function date_selected(elem) {
    let yyyy = cal_months[cal_index]["year"].toString();
    let mm = (cal_months[cal_index]["month"] + 1).toString();
    let dd = elem.currentTarget.textContent;

    mm.length = 1 ?  mm = '0'+mm : mm;
    dd < 10 ?  dd = '0'+dd : dd;
    appt_date.value = yyyy + "-" + mm + "-" + dd;
}

function init() {
    if (!existing_appointments || !new_patient || !name_last || !name_first ||
        !dob || !appt_date || !appt_time || !appt_type || !appt_note || !avail_calendar) {
        return;
    }

    existing_appointments.innerHTML = "No Appointments";

    name_last.placeholder = appointment["name_last"];
    name_first.placeholder = appointment["name_first"];
    appt_note.placeholder = appointment["appt_note"];

    add_calendar(avail_calendar);
    calendar_show_month(avail_calendar.id, 0);
}

init();