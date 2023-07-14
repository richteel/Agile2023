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
    if(!elem) { return; }

    const cal_months = [];
    
    let y = new Date().getFullYear();
    let m = new Date().getMonth();
    for(let i=0; i < MONTHS_AVAIL; i++) {
        let tab = document.createElement("table");
        let next_month = m+1;
        let next_year = y;
        if(next_month > 11) {
            next_month = 0;
            next_year++;
        }
        let current_month_last_day = new Date();
        current_month_last_day.setDate(1);
        current_month_last_day.setMonth(next_month);
        current_month_last_day.setFullYear(next_year);
        current_month_last_day.setDate(0);
        
        cal_months.push({
            "year": y,
            "month": m,
            "days": current_month_last_day.getDate(),
            "table": tab,
        });

        m = next_month;
        y = next_year;

    }

    console.dir(cal_months);
}

function init() {
    if (!existing_appointments || !new_patient || !name_last || !name_first || 
            !dob || !appt_date || !appt_time || !appt_type || !appt_note || !avail_calendar) {
        return;
    }

    existing_appointments.innerHTML = appointment.appt_date;

    name_last.placeholder = appointment["name_last"];
    name_first.placeholder = appointment["name_first"];
    appt_note.placeholder = appointment["appt_note"];

    add_calendar(avail_calendar);
}

init();