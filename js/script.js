var schoolName = "ABC High School";
var totalStudents = 1250;
var currentYear = 2026;

var schoolClubs = ["Science Club", "Debate Club", "Sports Club", "ICT Club", "Cultural Club"];

document.addEventListener("DOMContentLoaded", function() {
    initClock();
    initTheme();
    initWelcomeButton();
    initScrollToTop();
    
    if (document.getElementById("clubs-list")) {
        renderClubs();
        initClubManager();
    }
    
    if (document.getElementById("admission-form")) {
        initAdmissionForm();
    }
    
    if (document.getElementById("contact-form")) {
        initContactForm();
    }
    
    initDynamicImageAndHover();
});

function showWelcome() {
    alert("Welcome to " + schoolName + "!\nTotal Students: " + totalStudents + "\nCurrent Year: " + currentYear);
}

function changeTheme() {
    var bodyEl = document.body;
    bodyEl.classList.toggle("dark-theme");
    
    var themeBtn = document.getElementById("theme-toggle-btn");
    if (bodyEl.classList.contains("dark-theme")) {
        localStorage.setItem("selectedTheme", "dark");
        if (themeBtn) {
            themeBtn.textContent = "☀️ Light Mode";
        }
    } else {
        localStorage.setItem("selectedTheme", "light");
        if (themeBtn) {
            themeBtn.textContent = "🌙 Dark Mode";
        }
    }
}

function calculateAge(dobString) {
    var dobDate = new Date(dobString);
    var today = new Date();
    
    var birthYear = Number(dobDate.getFullYear());
    var currentYr = Number(today.getFullYear());
    
    var age = currentYr - birthYear;
    
    var birthMonth = Number(dobDate.getMonth());
    var currentMonth = Number(today.getMonth());
    var birthDay = Number(dobDate.getDate());
    var currentDay = Number(today.getDate());
    
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }
    
    var eligibilityMessage = "";
    var isEligible = true;
    if (age < 5) {
        eligibilityMessage = "Not Eligible for Admission";
        isEligible = false;
    } else {
        eligibilityMessage = "Eligible";
        isEligible = true;
    }
    
    return {
        age: age,
        status: eligibilityMessage,
        eligible: isEligible
    };
}

function clearForm(formId) {
    var formEl = document.getElementById(formId);
    if (formEl) {
        formEl.reset();
    }
    
    var namePreview = document.getElementById("name-preview");
    if (namePreview) {
        namePreview.style.display = "none";
        namePreview.innerHTML = "";
    }
    
    var ageDisplay = document.getElementById("age-display");
    if (ageDisplay) {
        ageDisplay.innerHTML = "";
    }
    
    var errorElements = document.querySelectorAll(".error-msg");
    for (var i = 0; i < errorElements.length; i++) {
        errorElements[i].style.display = "none";
        errorElements[i].textContent = "";
    }
}

function renderClubs() {
    var clubsList = document.getElementById("clubs-list");
    if (!clubsList) return;
    
    clubsList.innerHTML = "";
    
    for (var i = 0; i < schoolClubs.length; i++) {
        var li = document.createElement("li");
        
        var nameSpan = document.createElement("span");
        nameSpan.textContent = schoolClubs[i];
        
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger";
        deleteBtn.style.padding = "2px 8px";
        deleteBtn.style.fontSize = "12px";
        
        (function(index) {
            deleteBtn.addEventListener("click", function() {
                schoolClubs.splice(index, 1);
                renderClubs();
            });
        })(i);
        
        li.appendChild(nameSpan);
        li.appendChild(deleteBtn);
        clubsList.appendChild(li);
    }
}

function initClubManager() {
    var addBtn = document.getElementById("add-club-btn");
    var inputEl = document.getElementById("new-club-input");
    
    if (addBtn && inputEl) {
        addBtn.addEventListener("click", function() {
            var newClub = inputEl.value;
            newClub = newClub.trim();
            
            if (newClub.length === 0) {
                alert("Club name cannot be empty!");
                return;
            }
            
            schoolClubs.push(newClub);
            inputEl.value = "";
            renderClubs();
        });
        
        inputEl.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                addBtn.click();
            }
        });
    }
}

function initAdmissionForm() {
    var form = document.getElementById("admission-form");
    var nameInput = document.getElementById("student-name");
    var dobInput = document.getElementById("dob");
    
    if (!form || !nameInput || !dobInput) return;
    
    nameInput.addEventListener("keyup", function() {
        var rawName = nameInput.value;
        var trimmedName = rawName.trim();
        var upperName = trimmedName.toUpperCase();
        var charLength = trimmedName.length;
        
        var previewDiv = document.getElementById("name-preview");
        if (previewDiv) {
            if (charLength > 0) {
                previewDiv.style.display = "block";
                previewDiv.innerHTML = "<strong>Name Preview: </strong> <span class='inline-span'>" + upperName + "</span> (" + charLength + " characters)";
            } else {
                previewDiv.style.display = "none";
            }
        }
    });
    
    dobInput.addEventListener("change", function() {
        var dobValue = dobInput.value;
        if (dobValue) {
            var ageResult = calculateAge(dobValue);
            var ageDiv = document.getElementById("age-display");
            if (ageDiv) {
                if (ageResult.eligible) {
                    ageDiv.innerHTML = "<span style='color: green; font-weight: bold;'>Age: " + ageResult.age + " - " + ageResult.status + "</span>";
                } else {
                    ageDiv.innerHTML = "<span style='color: red; font-weight: bold;'>Age: " + ageResult.age + " - " + ageResult.status + " (Admission requires 5+ years old)</span>";
                }
            }
        }
    });
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        var errors = document.querySelectorAll(".error-msg");
        for (var i = 0; i < errors.length; i++) {
            errors[i].style.display = "none";
            errors[i].textContent = "";
        }
        
        var studentNameVal = document.getElementById("student-name").value;
        var fatherNameVal = document.getElementById("father-name").value;
        var motherNameVal = document.getElementById("mother-name").value;
        var dobVal = document.getElementById("dob").value;
        var genderVal = document.getElementById("gender").value;
        var bloodGroupVal = document.getElementById("blood-group").value;
        var classVal = document.getElementById("class").value;
        var sectionVal = document.getElementById("section").value;
        var phoneVal = document.getElementById("phone").value;
        var emailVal = document.getElementById("email").value;
        var addressVal = document.getElementById("address").value;
        var passwordVal = document.getElementById("password").value;
        var confirmPasswordVal = document.getElementById("confirm-password").value;
        
        var isFormValid = true;
        
        if (studentNameVal.trim() === "") {
            showInputError("student-name-error", "Student name is required.");
            isFormValid = false;
        }
        if (fatherNameVal.trim() === "") {
            showInputError("father-name-error", "Father's name is required.");
            isFormValid = false;
        }
        if (motherNameVal.trim() === "") {
            showInputError("mother-name-error", "Mother's name is required.");
            isFormValid = false;
        }
        if (dobVal.trim() === "") {
            showInputError("dob-error", "Date of Birth is required.");
            isFormValid = false;
        }
        if (genderVal === "") {
            showInputError("gender-error", "Gender selection is required.");
            isFormValid = false;
        }
        if (classVal === "") {
            showInputError("class-error", "Class admission level is required.");
            isFormValid = false;
        }
        if (sectionVal === "") {
            showInputError("section-error", "Section preference is required.");
            isFormValid = false;
        }
        if (phoneVal.trim() === "") {
            showInputError("phone-error", "Phone number is required.");
            isFormValid = false;
        }
        if (emailVal.trim() === "") {
            showInputError("email-error", "Email address is required.");
            isFormValid = false;
        }
        if (addressVal.trim() === "") {
            showInputError("address-error", "Mailing address is required.");
            isFormValid = false;
        }
        if (passwordVal === "") {
            showInputError("password-error", "Password is required.");
            isFormValid = false;
        }
        if (confirmPasswordVal === "") {
            showInputError("confirm-password-error", "Please confirm your password.");
            isFormValid = false;
        }
        
        if (isFormValid) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal.trim())) {
                showInputError("email-error", "Please enter a valid email address format (e.g. user@domain.com).");
                isFormValid = false;
            }
            
            var phoneLength = phoneVal.trim().length;
            if (phoneLength < 10 || phoneLength > 15) {
                showInputError("phone-error", "Phone number must be between 10 and 15 characters.");
                isFormValid = false;
            }
            
            if (passwordVal.length < 6) {
                showInputError("password-error", "Password must be at least 6 characters long.");
                isFormValid = false;
            }
            
            if (passwordVal !== confirmPasswordVal) {
                showInputError("confirm-password-error", "Passwords do not match.");
                isFormValid = false;
            }
            
            var ageCheck = calculateAge(dobVal);
            if (!ageCheck.eligible) {
                showInputError("dob-error", "Not Eligible for Admission. Age is: " + ageCheck.age + " (must be at least 5 years old).");
                isFormValid = false;
            }
        }
        
        if (isFormValid) {
            var finalName = studentNameVal.trim().toUpperCase();
            
            var welcomeBanner = document.getElementById("welcome-banner-text");
            if (welcomeBanner) {
                welcomeBanner.textContent = "Registration Successful for: " + finalName + "!";
                welcomeBanner.style.color = "green";
                welcomeBanner.style.fontWeight = "bold";
            }
            
            alert("Success! Student registration has been validated and submitted.\nStudent Name: " + finalName + " (Length: " + finalName.length + ")");
            
            clearForm("admission-form");
        } else {
            var firstError = document.querySelector(".error-msg[style*='display: block']");
            if (firstError) {
                firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });
    
    var resetBtn = form.querySelector("button[type='reset']");
    if (resetBtn) {
        resetBtn.addEventListener("click", function(event) {
            event.preventDefault();
            clearForm("admission-form");
        });
    }
}

function showInputError(id, msg) {
    var errorEl = document.getElementById(id);
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = "block";
    }
}

function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        var nameVal = document.getElementById("contact-name").value.trim();
        var emailVal = document.getElementById("contact-email").value.trim();
        var msgVal = document.getElementById("contact-message").value.trim();
        
        var errorSpans = form.querySelectorAll(".error-msg");
        for (var i = 0; i < errorSpans.length; i++) {
            errorSpans[i].style.display = "none";
            errorSpans[i].textContent = "";
        }
        
        var hasError = false;
        
        if (nameVal === "") {
            showInputError("contact-name-error", "Name is required.");
            hasError = true;
        }
        if (emailVal === "") {
            showInputError("contact-email-error", "Email is required.");
            hasError = true;
        } else {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                showInputError("contact-email-error", "Enter a valid email address.");
                hasError = true;
            }
        }
        if (msgVal === "") {
            showInputError("contact-message-error", "Message cannot be empty.");
            hasError = true;
        }
        
        if (!hasError) {
            alert("Thank you, " + nameVal.toUpperCase() + "! Your message has been sent successfully.");
            form.reset();
        }
    });
}

function initDynamicImageAndHover() {
    var logo = document.querySelector(".logo-img");
    if (logo) {
        logo.addEventListener("mouseover", function() {
            logo.style.borderColor = "#d69e2e";
            logo.style.cursor = "pointer";
        });
        
        logo.addEventListener("mouseout", function() {
            logo.style.borderColor = "#ffffff";
        });
        
        logo.addEventListener("dblclick", function() {
            var banner = document.querySelector(".banner-img");
            if (banner) {
                if (banner.src.indexOf("banner.jpg") !== -1) {
                    banner.src = "images/teacher1.jpg";
                } else {
                    banner.src = "images/banner.jpg";
                }
            }
        });
    }
}

function initClock() {
    var clockDiv = document.getElementById("digital-clock");
    if (!clockDiv) return;
    
    function updateTime() {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        
        var displayH = h < 10 ? "0" + h : h;
        var displayM = m < 10 ? "0" + m : m;
        var displayS = s < 10 ? "0" + s : s;
        
        var greeting = "Welcome!";
        if (h < 12) {
            greeting = "Good Morning!";
        } else if (h < 18) {
            greeting = "Good Afternoon!";
        } else {
            greeting = "Good Evening!";
        }
        
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dayName = days[now.getDay()];
        var dateString = now.toLocaleDateString();
        
        clockDiv.innerHTML = 
            "<div style='font-weight: bold; font-size: 16px; margin-bottom: 5px; color: #d69e2e;'>" + greeting + "</div>" +
            "<div style='font-size: 26px; font-weight: bold; font-family: monospace;'>" + displayH + ":" + displayM + ":" + displayS + "</div>" +
            "<div style='font-size: 12px; margin-top: 5px;'>" + dayName + ", " + dateString + "</div>";
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

function initTheme() {
    var savedTheme = localStorage.getItem("selectedTheme");
    var themeBtn = document.getElementById("theme-toggle-btn");
    
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (themeBtn) {
            themeBtn.textContent = "☀️ Light Mode";
        }
    }
    
    if (themeBtn) {
        themeBtn.addEventListener("click", function() {
            changeTheme();
        });
    }
}

function initScrollToTop() {
    var topBtn = document.getElementById("scroll-top-btn");
    if (!topBtn) return;
    
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 150) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });
    
    topBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function initWelcomeButton() {
    var welcomeBtn = document.getElementById("welcome-alert-btn");
    if (welcomeBtn) {
        welcomeBtn.addEventListener("click", function() {
            showWelcome();
        });
    }
}
