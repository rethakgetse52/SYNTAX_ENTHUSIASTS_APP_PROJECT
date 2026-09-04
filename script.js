"use strict";

/* =========================================================
   JOBIFY - MAIN JAVASCRIPT
   ========================================================= */

/* -----------------------------
   Utility Functions
----------------------------- */

function getElement(id) {
    return document.getElementById(id);
}

function getCVData() {
    try {
        const data = localStorage.getItem("cvData");
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Unable to read CV data:", error);
        return null;
    }
}

function saveCVData(data) {
    localStorage.setItem("cvData", JSON.stringify(data));
}

function escapeHTML(value) {
    if (!value) return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* -----------------------------
   Signup
----------------------------- */

const signupForm = getElement("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = getElement("name").value.trim();
        const email = getElement("email").value.trim().toLowerCase();
        const password = getElement("password").value;
        const confirmPassword = getElement("confirmPassword").value;
        const message = getElement("signupMessage");

        if (!name || !email || !password || !confirmPassword) {
            message.textContent = "Please complete all fields.";
            message.className = "form-message error";
            return;
        }

        if (password.length < 6) {
            message.textContent =
                "Your password must contain at least 6 characters.";
            message.className = "form-message error";
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            message.className = "form-message error";
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        /*
         * Demo-only account storage.
         * Do NOT use this approach for production authentication.
         */
        localStorage.setItem("jobifyUser", JSON.stringify(user));

        message.textContent =
            "Account created successfully! Redirecting...";

        message.className = "form-message success";

        setTimeout(function () {
            window.location.href = "cv-form.html";
        }, 900);
    });
}


/* -----------------------------
   CV Form
----------------------------- */

const cvForm = getElement("cvForm");

if (cvForm) {

    const savedCVData = getCVData();

    if (savedCVData) {

        const fields = [
            "fullName",
            "email",
            "phone",
            "summary",
            "education",
            "skills",
            "experience",
            "sector"
        ];

        fields.forEach(function (field) {
            const element = getElement(field);

            if (element && savedCVData[field]) {
                element.value = savedCVData[field];
            }
        });
    }

    cvForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const cvData = {
            fullName: getElement("fullName").value.trim(),
            email: getElement("email").value.trim(),
            phone: getElement("phone").value.trim(),
            summary: getElement("summary").value.trim(),
            education: getElement("education").value.trim(),
            skills: getElement("skills").value.trim(),
            experience: getElement("experience").value.trim(),
            sector: getElement("sector").value
        };

        if (
            !cvData.fullName ||
            !cvData.email ||
            !cvData.phone ||
            !cvData.sector
        ) {
            alert(
                "Please complete your name, email, phone number and career sector."
            );
            return;
        }

        saveCVData(cvData);

        window.location.href = "cv-preview.html";
    });
}


/* -----------------------------
   CV Preview
----------------------------- */

const cvPreview = getElement("cvPreview");

if (cvPreview) {

    const savedCVData = getCVData();

    if (!savedCVData) {

        alert("No CV information was found. Please create your CV first.");

        window.location.href = "cv-form.html";

    } else {

        const previewFields = {
            previewName: savedCVData.fullName,
            previewEmail: savedCVData.email,
            previewPhone: savedCVData.phone,
            previewSector: savedCVData.sector,
            previewSummary: savedCVData.summary,
            previewEducation: savedCVData.education,
            previewSkills: savedCVData.skills,
            previewExperience: savedCVData.experience
        };

        Object.keys(previewFields).forEach(function (id) {

            const element = getElement(id);

            if (element) {
                element.textContent = previewFields[id] || "Not provided";
            }

        });
    }
}


/* -----------------------------
   Job Recommendations
----------------------------- */

const recommendationMessage = getElement("recommendationMessage");
const jobList = getElement("jobList");

if (recommendationMessage && jobList) {

    const savedCVData = getCVData();

    const jobRecommendations = {

        "Information Technology": [
            {
                title: "Junior Web Developer",
                description:
                    "Build and maintain websites and web applications using modern web technologies."
            },
            {
                title: "IT Support Technician",
                description:
                    "Help users troubleshoot computer systems, software and technical problems."
            },
            {
                title: "Software Developer Intern",
                description:
                    "Gain practical experience developing, testing and improving software applications."
            }
        ],

        "Education": [
            {
                title: "Teacher Assistant",
                description:
                    "Support teachers and learners in classroom and educational activities."
            },
            {
                title: "Tutor",
                description:
                    "Help learners understand subjects and improve their academic performance."
            },
            {
                title: "Education Administrator",
                description:
                    "Assist with administration and coordination within educational institutions."
            }
        ],

        "Finance": [
            {
                title: "Junior Financial Assistant",
                description:
                    "Assist with financial records, reports, transactions and administrative tasks."
            },
            {
                title: "Bookkeeper",
                description:
                    "Maintain accurate financial records and assist with accounting processes."
            },
            {
                title: "Accounts Clerk",
                description:
                    "Process invoices, payments and financial documentation."
            }
        ],

        "Health": [
            {
                title: "Healthcare Assistant",
                description:
                    "Support healthcare professionals and assist patients with everyday needs."
            },
            {
                title: "Medical Receptionist",
                description:
                    "Manage appointments, patient communication and administrative tasks."
            },
            {
                title: "Community Health Worker",
                description:
                    "Support health education and community-based healthcare initiatives."
            }
        ],

        "Engineering": [
            {
                title: "Junior Engineering Technician",
                description:
                    "Assist engineering teams with technical, maintenance and project activities."
            },
            {
                title: "CAD Assistant",
                description:
                    "Support technical drawing and design work using computer-aided design software."
            },
            {
                title: "Engineering Intern",
                description:
                    "Gain practical engineering experience while supporting professional engineering teams."
            }
        ],

        "Marketing": [
            {
                title: "Social Media Assistant",
                description:
                    "Help manage social media content, campaigns and online engagement."
            },
            {
                title: "Marketing Intern",
                description:
                    "Support marketing campaigns, research and promotional activities."
            },
            {
                title: "Content Creator",
                description:
                    "Create written, visual or digital content for brands and organisations."
            }
        ],

        "STEM": [
            {
                title: "Laboratory Assistant",
                description:
                    "Support laboratory activities, experiments, equipment preparation and documentation."
            },
            {
                title: "Research Assistant",
                description:
                    "Assist researchers with data collection, analysis and research projects."
            },
            {
                title: "STEM Intern",
                description:
                    "Gain practical experience in science, technology, engineering or mathematics."
            }
        ]
    };

    if (!savedCVData || !savedCVData.sector) {

        recommendationMessage.textContent =
            "No CV information was found. Please create your CV first.";

        const link = document.createElement("a");
        link.href = "cv-form.html";
        link.textContent = "Create My CV";
        link.className = "button button-primary";

        jobList.appendChild(link);

    } else {

        const sector = savedCVData.sector;
        const recommendations = jobRecommendations[sector];

        recommendationMessage.textContent =
            `Based on your selected sector, here are some possible roles in ${sector}.`;

        if (!recommendations) {

            jobList.innerHTML =
                "<p>No job recommendations are available for this sector yet.</p>";

        } else {

            recommendations.forEach(function (job) {

                const jobCard = document.createElement("article");

                jobCard.className = "job-card";

                jobCard.innerHTML = `
                    <div class="job-number">
                        JOB MATCH
                    </div>

                    <h2>${escapeHTML(job.title)}</h2>

                    <p>${escapeHTML(job.description)}</p>

                    <span class="job-sector">
                        ${escapeHTML(sector)}
                    </span>
                `;

                jobList.appendChild(jobCard);
            });
        }
    }
}


/* -----------------------------
   PDF Download
----------------------------- */

const downloadButton = getElement("downloadButton");

if (downloadButton) {

    downloadButton.addEventListener("click", function () {

        const cvElement = getElement("cvPreview");

        if (!cvElement) {
            alert("Your CV could not be found.");
            return;
        }

        if (typeof html2pdf === "undefined") {
            alert(
                "The PDF tool could not be loaded. Please check your internet connection and try again."
            );
            return;
        }

        const savedCVData = getCVData();

        const fileName = savedCVData && savedCVData.fullName
            ? `${savedCVData.fullName.replace(/[^a-z0-9]/gi, "_")}_CV.pdf`
            : "Jobify_CV.pdf";

        const options = {
            margin: [10, 10, 10, 10],
            filename: fileName,
            image: {
                type: "jpeg",
                quality: 0.98
            },
            html2canvas: {
                scale: 2,
                useCORS: true
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            },
            pagebreak: {
                mode: ["css", "legacy"]
            }
        };

        downloadButton.disabled = true;
        downloadButton.textContent = "Preparing PDF...";

        html2pdf()
            .set(options)
            .from(cvElement)
            .save()
            .then(function () {

                downloadButton.disabled = false;
                downloadButton.textContent = "Download CV as PDF";

            })
            .catch(function (error) {

                console.error("PDF generation failed:", error);

                alert(
                    "There was a problem creating your PDF. Please try again."
                );

                downloadButton.disabled = false;
                downloadButton.textContent = "Download CV as PDF";
            });
    });
}


/* -----------------------------
   Navigation Helpers
----------------------------- */

const jobButton = getElement("jobButton");

if (jobButton) {

    jobButton.addEventListener("click", function () {
        window.location.href = "job-recommendations.html";
    });
}
