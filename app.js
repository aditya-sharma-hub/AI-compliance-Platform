// EY AI Compliance & Governance Tracking Platform (v2.0) Core App Logic

// ==========================================================================
// 1. COMPLIANCE QUESTIONS DATABASE (120 Questions Total)
// ==========================================================================

// A-Z Checklist: 26 sections, 3 questions each = 78 questions
const AZ_QUESTIONS = [
    {
        letter: "A",
        title: "Access Control",
        questions: [
            { id: "AZ-A-1", text: "Is multi-factor authentication enforced for all administrative and auditor access to the AI system?" },
            { id: "AZ-A-2", text: "Are user access rights to model parameters and training data reviewed and audited quarterly?" },
            { id: "AZ-A-3", text: "Is there a strict principle of least privilege applied to data access and model deployment pipelines?" }
        ]
    },
    {
        letter: "B",
        title: "Bandwidth",
        questions: [
            { id: "AZ-B-1", text: "Is the network bandwidth sufficient to handle peak live camera feed loads (e.g. 40,000+ feeds)?" },
            { id: "AZ-B-2", text: "Are data compression and edge-processing protocols in place for low-bandwidth environments?" },
            { id: "AZ-B-3", text: "Is network latency monitored continuously and kept within acceptable operational thresholds?" }
        ]
    },
    {
        letter: "C",
        title: "Cybersecurity",
        questions: [
            { id: "AZ-C-1", text: "Does the AI system encrypt all data at rest using AES-256 or higher?" },
            { id: "AZ-C-2", text: "Is TLS 1.3 or higher enforced for all AI data transmitted over networks?" },
            { id: "AZ-C-3", text: "Are regular automated vulnerability scans and penetration testing conducted on all AI servers?" }
        ]
    },
    {
        letter: "D",
        title: "Data Integrity",
        questions: [
            { id: "AZ-D-1", text: "Is there a validation mechanism to detect corruption or poisoning in incoming data streams?" },
            { id: "AZ-D-2", text: "Are data cleaning, filtering, and pre-processing steps fully documented and version-controlled?" },
            { id: "AZ-D-3", text: "Are data backup and recovery procedures verified and tested at least monthly?" }
        ]
    },
    {
        letter: "E",
        title: "Explainability",
        questions: [
            { id: "AZ-E-1", text: "Can the AI system provide human-understandable explanations for its computer vision and UAV threat detections?" },
            { id: "AZ-E-2", text: "Are feature importance scores or saliency maps generated for key model predictions?" },
            { id: "AZ-E-3", text: "Is the model decision path auditable by external compliance regulators?" }
        ]
    },
    {
        letter: "F",
        title: "Fairness",
        questions: [
            { id: "AZ-F-1", text: "Are bias assessments conducted on the facial recognition and threat detection training datasets?" },
            { id: "AZ-F-2", text: "Is the model evaluated for demographic parity and equal opportunity across diverse population groups?" },
            { id: "AZ-F-3", text: "Is there a structured process to mitigate and correct identified algorithmic bias in production?" }
        ]
    },
    {
        letter: "G",
        title: "Geo-fencing",
        questions: [
            { id: "AZ-G-1", text: "Are geo-fencing boundaries configured and validated for all autonomous UAV operations?" },
            { id: "AZ-G-2", text: "Is there a fail-safe return-to-base mechanism if a UAV crosses geo-fencing coordinates or loses GPS signal?" },
            { id: "AZ-G-3", text: "Are coordinate updates digitally signed and verified to prevent unauthorized flightpath changes?" }
        ]
    },
    {
        letter: "H",
        title: "Human Oversight",
        questions: [
            { id: "AZ-H-1", text: "Is there a manual override mechanism for high-confidence AI threat alerts and automated UAV dispatches?" },
            { id: "AZ-H-2", text: "Are operator command screens designed to prevent cognitive fatigue and alert blindness?" },
            { id: "AZ-H-3", text: "Is operator feedback logged and integrated into the model refinement lifecycle?" }
        ]
    },
    {
        letter: "I",
        title: "Incident Response",
        questions: [
            { id: "AZ-I-1", text: "Is there a documented incident response plan specifically addressing AI model failures and false dispatches?" },
            { id: "AZ-I-2", text: "Are system failure logs sent to a secure, centralized logging system in real time?" },
            { id: "AZ-I-3", text: "Are incident response drills conducted annually with police command centre operators?" }
        ]
    },
    {
        letter: "J",
        title: "Jurisdictional Compliance",
        questions: [
            { id: "AZ-J-1", text: "Is all training and operational surveillance data stored in compliance with local sovereignty and data residency laws?" },
            { id: "AZ-J-2", text: "Are system operations audited against local municipal bylaws and state surveillance guidelines?" },
            { id: "AZ-J-3", text: "Are cross-border data transfer controls in place if using public cloud instances?" }
        ]
    },
    {
        letter: "K",
        title: "Key Management",
        questions: [
            { id: "AZ-K-1", text: "Are encryption keys stored in a dedicated Hardware Security Module (HSM) or secure cloud KMS?" },
            { id: "AZ-K-2", text: "Are key rotation policies enforced annually for operational databases and API gateways?" },
            { id: "AZ-K-3", text: "Is key access logged, monitored, and restricted to compliance-approved personnel?" }
        ]
    },
    {
        letter: "L",
        title: "Logging & Auditing",
        questions: [
            { id: "AZ-L-1", text: "Are all AI model predictions logged along with their inputs, confidence scores, and outputs?" },
            { id: "AZ-L-2", text: "Are system audit logs protected against unauthorized modifications and tampering?" },
            { id: "AZ-L-3", text: "Are system logs retained for a minimum of 12 months for compliance verification?" }
        ]
    },
    {
        letter: "M",
        title: "Model Drift",
        questions: [
            { id: "AZ-M-1", text: "Is there a mechanism to detect data drift and concept drift in surveillance environment changes?" },
            { id: "AZ-M-2", text: "Are model accuracy, precision, and recall metrics monitored continuously in production?" },
            { id: "AZ-M-3", text: "Is there a scheduled model retraining pipeline triggered by performance degradation?" }
        ]
    },
    {
        letter: "N",
        title: "Network Security",
        questions: [
            { id: "AZ-N-1", text: "Is all AI system traffic isolated within a secure virtual private cloud (VPC) with security groups?" },
            { id: "AZ-N-2", text: "Are intrusion detection systems (IDS) active on the network perimeter containing the camera feeds?" },
            { id: "AZ-N-3", text: "Are firewalls configured with a default-deny policy for internal and external traffic?" }
        ]
    },
    {
        letter: "O",
        title: "Operational Resilience",
        questions: [
            { id: "AZ-O-1", text: "Is the AI system designed with high availability (HA) across multiple zones to prevent service outages?" },
            { id: "AZ-O-2", text: "Is there a disaster recovery plan with a recovery time objective (RTO) under 4 hours?" },
            { id: "AZ-O-3", text: "Are failover mechanisms tested quarterly under simulated load conditions?" }
        ]
    },
    {
        letter: "P",
        title: "Privacy & Masking",
        questions: [
            { id: "AZ-P-1", text: "Does the system dynamically mask human faces and license plates in real-time camera feeds at the edge?" },
            { id: "AZ-P-2", text: "Are personally identifiable datasets anonymized or pseudonymized before model training?" },
            { id: "AZ-P-3", text: "Is access to unmasked raw surveillance feeds restricted to court-ordered or authorized personnel?" }
        ]
    },
    {
        letter: "Q",
        title: "Quality Assurance",
        questions: [
            { id: "AZ-Q-1", text: "Are model test scripts included in the continuous integration (CI) pipeline for automated verification?" },
            { id: "AZ-Q-2", text: "Is regression testing performed on the AI model before every major production update?" },
            { id: "AZ-Q-3", text: "Are test coverage reports generated for all data preprocessing and post-processing code?" }
        ]
    },
    {
        letter: "R",
        title: "Risk Management",
        questions: [
            { id: "AZ-R-1", text: "Is a comprehensive AI risk register maintained and updated quarterly by the technology team?" },
            { id: "AZ-R-2", text: "Are high-risk scenarios identified with clear, actionable mitigation strategies?" },
            { id: "AZ-R-3", text: "Is there a designated AI safety and compliance officer for the Smart City deployment?" }
        ]
    },
    {
        letter: "S",
        title: "System Safety",
        questions: [
            { id: "AZ-S-1", text: "Is there an automated emergency shutdown mechanism for physical UAVs in the event of hardware failure?" },
            { id: "AZ-S-2", text: "Are physical system hardware components rated for extreme weather, rain, and dust?" },
            { id: "AZ-S-3", text: "Does the command platform default to a safe state in the event of sudden power loss?" }
        ]
    },
    {
        letter: "T",
        title: "Transparency",
        questions: [
            { id: "AZ-T-1", text: "Is an AI system transparency statement published for public awareness and city transparency?" },
            { id: "AZ-T-2", text: "Are citizens notified when entering zones monitored by computer-vision threat detection?" },
            { id: "AZ-T-3", text: "Is the AI model lineage fully documented from raw data collection to production deployment?" }
        ]
    },
    {
        letter: "U",
        title: "User Consent",
        questions: [
            { id: "AZ-U-1", text: "Are consent mechanisms clear and easily accessible to data principals if tracking personal data?" },
            { id: "AZ-U-2", text: "Is there a simple opt-out mechanism for citizens regarding data collection?" },
            { id: "AZ-U-3", text: "Are consent logs stored securely and protected from unauthorized modification?" }
        ]
    },
    {
        letter: "V",
        title: "Vulnerability Management",
        questions: [
            { id: "AZ-V-1", text: "Are third-party library dependencies scanned weekly for security advisories and vulnerabilities?" },
            { id: "AZ-V-2", text: "Is there an active vulnerability disclosure program in place for reporting system flaws?" },
            { id: "AZ-V-3", text: "Are critical security patches applied to production systems within 48 hours of release?" }
        ]
    },
    {
        letter: "W",
        title: "Workload Balancer",
        questions: [
            { id: "AZ-W-1", text: "Is the processing workload balanced dynamically across edge and central GPU nodes?" },
            { id: "AZ-W-2", text: "Are GPU utilization rates monitored and optimized to prevent bottlenecks during high alert periods?" },
            { id: "AZ-W-3", text: "Is there an auto-scaling group configured for threat-detection prediction endpoints?" }
        ]
    },
    {
        letter: "X",
        title: "XML/Data Exchange",
        questions: [
            { id: "AZ-X-1", text: "Are XML/JSON data exchange schemas validated against strict definitions before parsing?" },
            { id: "AZ-X-2", text: "Is all incoming exchange data sanitized to prevent command injection attacks?" },
            { id: "AZ-X-3", text: "Are data exchange channels encrypted using TLS 1.3 or higher?" }
        ]
    },
    {
        letter: "Y",
        title: "Yield & Performance",
        questions: [
            { id: "AZ-Y-1", text: "Does the system meet the throughput requirement of 40,000+ camera feeds processed in real-time?" },
            { id: "AZ-Y-2", text: "Is model inference latency kept under 200 milliseconds per frame?" },
            { id: "AZ-Y-3", text: "Are resource constraints defined for edge-device deployments?" }
        ]
    },
    {
        letter: "Z",
        title: "Zero-Trust Architecture",
        questions: [
            { id: "AZ-Z-1", text: "Is identity verified continuously at every step of access (Zero-Trust) within internal APIs?" },
            { id: "AZ-Z-2", text: "Are micro-segmentation boundaries enforced between surveillance modules and the command centre?" },
            { id: "AZ-Z-3", text: "Is all internal server-to-server traffic fully encrypted and mutually authenticated?" }
        ]
    }
];

// Compliance Frameworks Checklist: 5 sections, 42 questions in total
const COMPLIANCE_QUESTIONS = [
    {
        section: "Section 1 — EU AI Act",
        questions: [
            { id: "COMP-EU-1", text: "Is the AI system classified under the EU AI Act risk classification?" },
            { id: "COMP-EU-2", text: "Is a continuous risk management system established for identifying and mitigating high-risk AI risks?" },
            { id: "COMP-EU-3", text: "Has the system undergone high-quality data governance and data checks for bias detection?" },
            { id: "COMP-EU-4", text: "Is detailed technical documentation compiled before deployment to demonstrate conformity?" },
            { id: "COMP-EU-5", text: "Does the system support automatic logging of events (traceability) during operations?" },
            { id: "COMP-EU-6", text: "Is the system designed to allow effective human oversight (HITL) and override?" },
            { id: "COMP-EU-7", text: "Does the system achieve appropriate levels of accuracy, robustness, and cybersecurity?" },
            { id: "COMP-EU-8", text: "Has the AI system been registered in the EU database for high-risk AI systems?" },
            { id: "COMP-EU-9", text: "Is the system CE marked to indicate conformity before going to market?" }
        ]
    },
    {
        section: "Section 2 — NIST AI RMF",
        questions: [
            { id: "COMP-NST-1", text: "Are AI system risks analyzed and documented in a risk register?" },
            { id: "COMP-NST-2", text: "Is there an established governance process for AI risk management?" },
            { id: "COMP-NST-3", text: "Are model biases and limitations identified and mapped?" },
            { id: "COMP-NST-4", text: "Is the AI system monitored for safety, reliability, and security?" },
            { id: "COMP-NST-5", text: "Are mechanisms in place to explain model predictions to users?" },
            { id: "COMP-NST-6", text: "Are training data sources documented and validated?" },
            { id: "COMP-NST-7", text: "Is privacy protected throughout the lifecycle of the system?" },
            { id: "COMP-NST-8", text: "Are system deployment risks assessed regularly?" },
            { id: "COMP-NST-9", text: "Are roles and responsibilities clear for AI risk management?" }
        ]
    },
    {
        section: "Section 3 — DPDP",
        questions: [
            { id: "COMP-DP-1", text: "Is personal data processed only for specified and lawful purposes?" },
            { id: "COMP-DP-2", text: "Is clear and unambiguous consent obtained from data principals?" },
            { id: "COMP-DP-3", text: "Are data principals able to access, correct, and erase their personal data?" },
            { id: "COMP-DP-4", text: "Are security safeguards implemented to prevent data breaches?" },
            { id: "COMP-DP-5", text: "Is data deleted once the purpose of processing is fulfilled?" },
            { id: "COMP-DP-6", text: "Is a Data Protection Officer (DPO) appointed if required?" },
            { id: "COMP-DP-7", text: "Is there a mechanism to handle grievances of data principals?" },
            { id: "COMP-DP-8", text: "Are subprocessors bound by data protection obligations?" }
        ]
    },
    {
        section: "Section 4 — MeitY Guidelines",
        questions: [
            { id: "COMP-MY-1", text: "Does the AI system align with MeitY guidelines for responsible AI development?" },
            { id: "COMP-MY-2", text: "Are steps taken to ensure that AI does not generate biased or discriminatory outcomes?" },
            { id: "COMP-MY-3", text: "Is there transparency in the algorithms used in public service delivery?" },
            { id: "COMP-MY-4", text: "Are safety audits conducted for citizen-facing AI deployments?" },
            { id: "COMP-MY-5", text: "Is data localization compliance maintained for citizen data?" },
            { id: "COMP-MY-6", text: "Are mechanisms in place to report algorithmic failures?" },
            { id: "COMP-MY-7", text: "Are testing records maintained for auditor verification?" },
            { id: "COMP-MY-8", text: "Is public trust and safety prioritized in the deployment design?" }
        ]
    },
    {
        section: "Section 5 — ISO 42001",
        questions: [
            { id: "COMP-ISO-1", text: "Is there an established AI Management System (AIMS) in the organization?" },
            { id: "COMP-ISO-2", text: "Are AI policies aligned with the strategic direction of the organization?" },
            { id: "COMP-ISO-3", text: "Is there a process for AI system risk assessment and treatment?" },
            { id: "COMP-ISO-4", text: "Are roles and responsibilities within the AIMS defined and communicated?" },
            { id: "COMP-ISO-5", text: "Are resources provided for the establishment, implementation, and maintenance of the AIMS?" },
            { id: "COMP-ISO-6", text: "Are internal audits of the AIMS conducted at planned intervals?" },
            { id: "COMP-ISO-7", text: "Is a management review of the AIMS conducted periodically?" },
            { id: "COMP-ISO-8", text: "Are corrective actions taken for identified nonconformities?" }
        ]
    }
];

// Seed Data for Users
const DEFAULT_USERS = [
    {
        email: "ramesh.k@ey.com",
        password: "password123",
        fullname: "Ramesh Krishnamurthy",
        org: "Ernst & Young LLP",
        designation: "Senior AI Compliance Auditor",
        role: "auditor",
        mobile: "9876543210",
        onboarded: true,
        profile: {
            role: "Lead Auditor",
            years: 6,
            certs: ["ISO 42001 Lead Auditor", "CISA", "CISSP"]
        }
    },
    {
        email: "arjun.mehta@govtech.in",
        password: "password123",
        fullname: "Arjun Mehta",
        org: "GovTech Solutions Pvt. Ltd.",
        designation: "Technology Director",
        role: "auditee",
        mobile: "9765432100",
        onboarded: true,
        profile: {
            profExp: 14,
            aiExp: 5,
            certs: ["PMP", "AWS Certified ML Specialty"],
            customCert: "Google Cloud Professional ML Engineer"
        }
    }
];

// Seed Project (Case ID: 84721)
const INITIAL_PROJECTS = [
    {
        id: "84721",
        title: "AI-Powered Smart City Surveillance & Command Platform",
        domain: "Safe City",
        desc: "An integrated AI surveillance and command platform for metropolitan police operations, processing 40,000+ live camera feeds using computer vision-based threat detection, crowd analytics, and autonomous UAV surveillance across 200+ urban intersections.",
        frameworks: ["EU AI Act", "NIST AI RMF", "DPDP", "MeitY Guidelines", "ISO 42001"],
        status: "Submitted — Awaiting Auditor Review",
        auditeeEmail: "arjun.mehta@govtech.in",
        auditeeProfile: {
            designation: "Technology Director",
            profExp: 14,
            aiExp: 5,
            certs: "PMP, AWS Certified ML Specialty, Google Cloud Professional ML Engineer"
        },
        documents: [
            { name: "AIMS_Policy_v2.pdf", framework: "ISO 42001", size: "2.4 MB", timestamp: "2026-06-12 10:14" },
            { name: "Risk_Assessment_Report.docx", framework: "EU AI Act", size: "1.8 MB", timestamp: "2026-06-12 10:15" },
            { name: "AI_Risk_Register_2026.pdf", framework: "NIST AI RMF", size: "3.1 MB", timestamp: "2026-06-12 10:16" }
        ],
        // Assessment Answers
        azAnswers: {},
        complianceAnswers: {},
        azSubmitted: false,
        complianceSubmitted: false
    }
];

// ==========================================================================
// 2. STATE MANAGER CLASS
// ==========================================================================

// Safe Storage Wrapper to handle sandboxed/restricted environments (e.g. cookie block / SecurityError)
const safeStorage = {
    _inMemoryStore: {},
    
    getItem(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (e) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn(`localStorage.getItem failed for key "${key}":`, e);
            }
            return this._inMemoryStore[key] || null;
        }
    },
    
    setItem(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn(`localStorage.setItem failed for key "${key}":`, e);
            }
            this._inMemoryStore[key] = String(value);
        }
    },
    
    removeItem(key) {
        try {
            window.localStorage.removeItem(key);
        } catch (e) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn(`localStorage.removeItem failed for key "${key}":`, e);
            }
            delete this._inMemoryStore[key];
        }
    },
    
    clear() {
        try {
            window.localStorage.clear();
        } catch (e) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn("localStorage.clear failed:", e);
            }
            this._inMemoryStore = {};
        }
    }
};

function safeGetJSON(key, defaultValue) {
    try {
        const val = safeStorage.getItem(key);
        return val ? JSON.parse(val) : defaultValue;
    } catch (e) {
        if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error(`Error parsing JSON for key "${key}":`, e);
        }
        return defaultValue;
    }
}

class AppStateManager {
    constructor() {
        this.users = safeGetJSON("ey_users", DEFAULT_USERS);
        
        // Migration: Ensure seed users are always present in the users list
        DEFAULT_USERS.forEach(seedUser => {
            if (!this.users.some(u => u.email === seedUser.email)) {
                this.users.push(seedUser);
            }
        });

        this.projects = safeGetJSON("ey_projects", INITIAL_PROJECTS);
        this.currentUser = safeGetJSON("ey_current_user", null);
        this.activeProjectId = safeStorage.getItem("ey_active_project_id") || null;
        this.activeView = safeStorage.getItem("ey_active_view") || "welcome";
        this.viewHistory = safeGetJSON("ey_view_history", []);
        
        // Draft storage
        this.regDraft = safeGetJSON("ey_draft_reg", null);
        this.onbAudDraft = safeGetJSON("ey_draft_onb_aud", null);
        this.onbAeeDraft = safeGetJSON("ey_draft_onb_aee", null);
        this.projectDraft = safeGetJSON("ey_draft_project", null);
    }

    saveState() {
        safeStorage.setItem("ey_users", JSON.stringify(this.users));
        safeStorage.setItem("ey_projects", JSON.stringify(this.projects));
        safeStorage.setItem("ey_current_user", JSON.stringify(this.currentUser));
        safeStorage.setItem("ey_active_view", this.activeView);
        safeStorage.setItem("ey_view_history", JSON.stringify(this.viewHistory));
        if (this.activeProjectId) {
            safeStorage.setItem("ey_active_project_id", this.activeProjectId);
        } else {
            safeStorage.removeItem("ey_active_project_id");
        }
        
        safeStorage.setItem("ey_draft_reg", JSON.stringify(this.regDraft));
        safeStorage.setItem("ey_draft_onb_aud", JSON.stringify(this.onbAudDraft));
        safeStorage.setItem("ey_draft_onb_aee", JSON.stringify(this.onbAeeDraft));
        safeStorage.setItem("ey_draft_project", JSON.stringify(this.projectDraft));
    }

    registerUser(fullname, org, designation, email, mobile, password, role) {
        const emailNorm = email.toLowerCase().trim();
        const existingIdx = this.users.findIndex(u => u.email === emailNorm);
        
        const newUser = {
            email: emailNorm,
            password,
            fullname,
            org,
            designation,
            role,
            mobile,
            onboarded: false, // reset onboarding so they can run through the walkthrough
            profile: null
        };
        
        if (existingIdx !== -1) {
            this.users[existingIdx] = newUser;
        } else {
            this.users.push(newUser);
        }
        
        this.saveState();
        return { success: true };
    }

    loginUser(email, password) {
        const emailNorm = email.toLowerCase().trim();
        const user = this.users.find(u => u.email === emailNorm);
        if (!user) {
            return { success: false, message: "Email not registered." };
        }
        if (user.password !== password) {
            return { success: false, message: "Incorrect password." };
        }
        
        this.currentUser = user;
        this.activeProjectId = null;
        this.viewHistory = [];
        
        if (!user.onboarded) {
            this.activeView = user.role === "auditor" ? "onboarding-auditor" : "onboarding-auditee";
        } else {
            this.activeView = "welcome";
        }
        
        this.saveState();
        return { success: true };
    }

    logout() {
        this.currentUser = null;
        this.activeProjectId = null;
        this.activeView = "login";
        this.viewHistory = [];
        this.saveState();
    }

    getActiveProject() {
        return this.projects.find(p => p.id === this.activeProjectId) || null;
    }
}

const State = new AppStateManager();

// ==========================================================================
// 3. TOAST NOTIFICATION UTILITY
// ==========================================================================

function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "❌";
    if (type === "warning") icon = "⚠️";

    toast.innerHTML = `
        <span style="font-size:1.1rem; line-height:1;">${icon}</span>
        <span style="flex:1; line-height:1.3;">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Password Visibility Toggle
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
}

// ==========================================================================
// 4. NAVIGATION & VIEW ROUTER
// ==========================================================================

function navigateTo(viewName, saveToHistory = true) {
    if (!State.currentUser) {
        showView("auth-section");
        return;
    }
    
    // Safety check: if user is not onboarded, force onboarding view
    if (!State.currentUser.onboarded) {
        const forceView = State.currentUser.role === "auditor" ? "onboarding-auditor" : "onboarding-auditee";
        showView(forceView);
        return;
    }



    if (saveToHistory && State.activeView && State.activeView !== viewName) {
        // Avoid duplicate consecutive history entries
        if (State.viewHistory.length === 0 || State.viewHistory[State.viewHistory.length - 1] !== State.activeView) {
            State.viewHistory.push(State.activeView);
        }
    }

    State.activeView = viewName;
    State.saveState();
    
    // Render the selected view
    showView(viewName);
}

function showView(viewName) {
    // Hide auth section and main layout first
    document.getElementById("auth-section").classList.remove("active");
    document.getElementById("main-layout").style.display = "none";
    
    // Hide all view panels inside main content area
    document.querySelectorAll(".view-panel").forEach(panel => {
        panel.style.display = "none";
    });
    
    // Reset active nav link class
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });
    
    // Hide Sidebar Add Auditee widget by default
    document.getElementById("add-auditee-widget").style.display = "none";

    // Manage global top navigation back button visibility
    const topNavBar = document.getElementById("global-top-nav-bar");
    if (topNavBar) {
        const hideBackOn = ["welcome", "onboarding-auditor", "onboarding-auditee", "auth-section", "login"];
        if (hideBackOn.includes(viewName) || State.viewHistory.length === 0) {
            topNavBar.style.display = "none";
        } else {
            topNavBar.style.display = "flex";
        }
    }

    if (viewName === "auth-section" || !State.currentUser) {
        document.getElementById("auth-section").classList.add("active");
        showLoginView();
        return;
    }

    // Display Main Dashboard Layout
    document.getElementById("main-layout").style.display = "grid";
    renderUserBadge();
    renderSidebarNav();
    renderDraftResumeBanner();

    if (viewName === "onboarding-auditor") {
        document.getElementById("onboarding-auditor-view").style.display = "block";
        initAuditorOnboardingForm();
    } else if (viewName === "onboarding-auditee") {
        document.getElementById("onboarding-auditee-view").style.display = "block";
        initAuditeeOnboardingForm();
    } else if (viewName === "welcome") {
        document.getElementById("welcome-view").style.display = "block";
        renderWelcomeView();
    } else if (viewName === "new-project") {
        document.getElementById("nav-new-project").classList.add("active");
        document.getElementById("new-project-view").style.display = "block";
        initNewProjectForm();
    } else if (viewName === "ongoing-projects") {
        document.getElementById("nav-ongoing-projects").classList.add("active");
        document.getElementById("ongoing-projects-view").style.display = "block";
        renderOngoingProjectsView();
    } else if (viewName === "project-detail") {
        document.getElementById("project-detail-view").style.display = "block";
        renderProjectDetailView();
    } else if (viewName === "az-assessment") {
        document.getElementById("az-assessment-view").style.display = "block";
        // Show Add Auditee in sidebar
        document.getElementById("add-auditee-widget").style.display = "block";
        renderAZAssessmentView();
    } else if (viewName === "compliance-questionnaire") {
        document.getElementById("compliance-questionnaire-view").style.display = "block";
        // Show Add Auditee in sidebar
        document.getElementById("add-auditee-widget").style.display = "block";
        renderComplianceQuestionnaireView();
    } else if (viewName === "compliance-dashboard") {
        document.getElementById("compliance-dashboard-view").style.display = "block";
        renderComplianceDashboardView();
    }
}

// Render User Badge in Sidebar
function renderUserBadge() {
    const badgeContainer = document.getElementById("sidebar-user-badge");
    if (!badgeContainer || !State.currentUser) return;
    
    badgeContainer.innerHTML = `
        <div class="user-profile-badge">
            <span class="user-name">${State.currentUser.fullname}</span>
            <span class="user-role-tag">${State.currentUser.role === 'auditor' ? 'Auditor' : 'Auditee'}</span>
            <button class="btn btn-secondary btn-sm" onclick="handleLogout()" style="margin-top:0.75rem;">Log Out</button>
        </div>
    `;
}

// Render Sidebar Navigation depending on user role
function renderSidebarNav() {
    const navNewProject = document.getElementById("nav-new-project");
    const badgeEl = document.getElementById("ongoing-projects-badge");
    
    // Always show New Project tab on the sidebar
    navNewProject.style.display = "flex";
    
    if (State.currentUser && State.currentUser.role === "auditor") {
        // Count ALL projects the auditor can see (matches renderOngoingProjectsView which shows all projects)
        const ongoingCount = State.projects.length;
        if (ongoingCount > 0) {
            badgeEl.textContent = ongoingCount;
            badgeEl.style.display = "inline-block";
        } else {
            badgeEl.style.display = "none";
        }
    } else if (State.currentUser && State.currentUser.role === "auditee") {
        // Count only this auditee's own projects (matches renderOngoingProjectsView filter)
        const ongoingCount = State.projects.filter(p => p.auditeeEmail === State.currentUser.email).length;
        if (ongoingCount > 0) {
            badgeEl.textContent = ongoingCount;
            badgeEl.style.display = "inline-block";
        } else {
            badgeEl.style.display = "none";
        }
    } else {
        badgeEl.style.display = "none";
    }
}

// Global Back navigation handler
function goBack() {
    if (State.viewHistory.length > 0) {
        const prevView = State.viewHistory.pop();
        State.activeView = prevView;
        State.saveState();
        showView(prevView);
    }
}

// Render Draft Resume Banner if a draft exists for the logged in auditee
function renderDraftResumeBanner() {
    const banner = document.getElementById("draft-resume-banner");
    const spanCaseId = document.getElementById("draft-banner-case-id");
    
    if (State.currentUser && State.currentUser.role === "auditee" && State.projectDraft) {
        banner.style.display = "flex";
        spanCaseId.textContent = State.projectDraft.id || "";
    } else {
        banner.style.display = "none";
    }
}

// ==========================================================================
// 5. REGISTRATION & LOGIN HANDLERS
// ==========================================================================

function showRegisterView() {
    document.getElementById("signin-form-container").style.display = "none";
    document.getElementById("register-form-container").style.display = "block";
    document.getElementById("auth-title").textContent = "New Registration";
    document.getElementById("auth-desc").textContent = "Create an account to track compliance certifications.";
    
    // Restore registration draft if it exists
    if (State.regDraft) {
        document.getElementById("reg-fullname").value = State.regDraft.fullname || "";
        document.getElementById("reg-org").value = State.regDraft.org || "";
        document.getElementById("reg-designation").value = State.regDraft.designation || "";
        document.getElementById("reg-mobile").value = State.regDraft.mobile || "";
        document.getElementById("reg-email").value = State.regDraft.email || "";
        if (State.regDraft.role) {
            const roleRadio = document.querySelector(`input[name="reg-role"][value="${State.regDraft.role}"]`);
            if (roleRadio) roleRadio.checked = true;
        }
    }
}

function showLoginView() {
    document.getElementById("signin-form-container").style.display = "block";
    document.getElementById("register-form-container").style.display = "none";
    document.getElementById("auth-title").textContent = "AI Compliance & Governance Portal";
    document.getElementById("auth-desc").textContent = "Please sign in to access compliance trackers and framework assessments.";
}

// Save Registration form draft
function saveRegDraft() {
    const fullnameEl = document.getElementById("reg-fullname");
    const orgEl = document.getElementById("reg-org");
    const designationEl = document.getElementById("reg-designation");
    const mobileEl = document.getElementById("reg-mobile");
    const emailEl = document.getElementById("reg-email");
    if (!fullnameEl || !orgEl || !designationEl || !mobileEl || !emailEl) return;

    const fullname = fullnameEl.value;
    const org = orgEl.value;
    const designation = designationEl.value;
    const mobile = mobileEl.value;
    const email = emailEl.value;
    const roleEl = document.querySelector('input[name="reg-role"]:checked');
    const role = roleEl ? roleEl.value : "";

    State.regDraft = { fullname, org, designation, mobile, email, role };
    State.saveState();
    showToast("Registration progress saved as draft.", "success");
}

// Handle User Registration Submission
function handleUserRegistration(event) {
    event.preventDefault();
    const fullname = document.getElementById("reg-fullname").value.trim();
    const org = document.getElementById("reg-org").value.trim();
    const designation = document.getElementById("reg-designation").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const mobile = document.getElementById("reg-mobile").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;
    const role = document.querySelector('input[name="reg-role"]:checked').value;

    if (password !== confirmPassword) {
        showToast("Passwords do not match.", "error");
        return;
    }

    const result = State.registerUser(fullname, org, designation, email, mobile, password, role);
    if (result.success) {
        showToast("Registration successful. Please complete your profile.", "success");
        State.regDraft = null;
        State.saveState();
        
        // Auto-login the user
        State.loginUser(email, password);
        renderRoute();
    } else {
        showToast(result.message, "error");
    }
}

// Handle User Login
function handleUserLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    
    const result = State.loginUser(email, password);
    if (result.success) {
        showToast(`Welcome back, ${State.currentUser.fullname}!`, "success");
        renderRoute();
    } else {
        showToast(result.message, "error");
    }
}

function handleLogout() {
    State.logout();
    renderRoute();
    showToast("Successfully logged out.", "info");
}

// ==========================================================================
// 6. ONBOARDING HANDLERS
// ==========================================================================

// Init Auditor Onboarding
function initAuditorOnboardingForm() {
    if (!State.currentUser) return;
    document.getElementById("onb-aud-name").value = State.currentUser.fullname;
    document.getElementById("onb-aud-org").value = State.currentUser.org;
    
    // Fill from draft if it exists
    if (State.onbAudDraft) {
        document.getElementById("onb-aud-role").value = State.onbAudDraft.role || "";
        document.getElementById("onb-aud-years").value = State.onbAudDraft.years || "";
        if (State.onbAudDraft.certs && Array.isArray(State.onbAudDraft.certs)) {
            document.querySelectorAll('input[name="onb-aud-certs"]').forEach(cb => {
                cb.checked = State.onbAudDraft.certs.includes(cb.value);
            });
        }
    }
}

function saveAuditorOnboardingDraft() {
    const roleEl = document.getElementById("onb-aud-role");
    const yearsEl = document.getElementById("onb-aud-years");
    if (!roleEl || !yearsEl) return;

    const role = roleEl.value;
    const years = parseInt(yearsEl.value) || 0;
    const certs = Array.from(document.querySelectorAll('input[name="onb-aud-certs"]:checked')).map(cb => cb.value);

    State.onbAudDraft = { role, years, certs };
    State.saveState();
    showToast("Auditor onboarding draft saved.", "success");
}

// Submit Auditor Onboarding
function submitAuditorOnboarding(event) {
    event.preventDefault();
    const role = document.getElementById("onb-aud-role").value;
    const years = parseInt(document.getElementById("onb-aud-years").value) || 0;
    const certs = Array.from(document.querySelectorAll('input[name="onb-aud-certs"]:checked')).map(cb => cb.value);

    // Update current user credentials in State.users
    const userInDb = State.users.find(u => u.email === State.currentUser.email);
    userInDb.onboarded = true;
    userInDb.profile = { role, years, certs };
    
    State.currentUser = userInDb;
    State.onbAudDraft = null;
    State.activeView = "welcome";
    State.saveState();
    
    showToast("Profile completed! Redirected to Auditor Dashboard.", "success");
    renderRoute();
}

// Init Auditee Onboarding
function initAuditeeOnboardingForm() {
    if (!State.currentUser) return;
    document.getElementById("onb-aee-name").value = State.currentUser.fullname;
    document.getElementById("onb-aee-designation").value = State.currentUser.designation;
    
    // Fill from draft if it exists
    if (State.onbAeeDraft) {
        document.getElementById("onb-aee-prof-exp").value = State.onbAeeDraft.profExp || "";
        document.getElementById("onb-aee-ai-exp").value = State.onbAeeDraft.aiExp || "";
        document.getElementById("onb-aee-certs-custom").value = State.onbAeeDraft.customCert || "";
        if (State.onbAeeDraft.certs && Array.isArray(State.onbAeeDraft.certs)) {
            document.querySelectorAll('input[name="onb-aee-certs"]').forEach(cb => {
                cb.checked = State.onbAeeDraft.certs.includes(cb.value);
            });
        }
    }
}

function saveAuditeeOnboardingDraft() {
    const profExpEl = document.getElementById("onb-aee-prof-exp");
    const aiExpEl = document.getElementById("onb-aee-ai-exp");
    const customCertEl = document.getElementById("onb-aee-certs-custom");
    if (!profExpEl || !aiExpEl || !customCertEl) return;

    const profExp = parseInt(profExpEl.value) || 0;
    const aiExp = parseInt(aiExpEl.value) || 0;
    const certs = Array.from(document.querySelectorAll('input[name="onb-aee-certs"]:checked')).map(cb => cb.value);
    const customCert = customCertEl.value.trim();

    State.onbAeeDraft = { profExp, aiExp, certs, customCert };
    State.saveState();
    showToast("Auditee onboarding draft saved.", "success");
}

// Submit Auditee Onboarding
function submitAuditeeOnboarding(event) {
    event.preventDefault();
    const profExp = parseInt(document.getElementById("onb-aee-prof-exp").value) || 0;
    const aiExp = parseInt(document.getElementById("onb-aee-ai-exp").value) || 0;
    const certs = Array.from(document.querySelectorAll('input[name="onb-aee-certs"]:checked')).map(cb => cb.value);
    const customCert = document.getElementById("onb-aee-certs-custom").value.trim();

    const userInDb = State.users.find(u => u.email === State.currentUser.email);
    userInDb.onboarded = true;
    userInDb.profile = { profExp, aiExp, certs, customCert };
    
    State.currentUser = userInDb;
    State.onbAeeDraft = null;
    State.activeView = "welcome";
    State.saveState();
    
    showToast("Profile completed! Redirected to Auditee Dashboard.", "success");
    renderRoute();
}

// ==========================================================================
// 7. WELCOME PAGE RENDERING
// ==========================================================================

function renderWelcomeView() {
    const titleEl = document.getElementById("welcome-title");
    const descEl = document.getElementById("welcome-message");
    const summaryContainer = document.getElementById("dashboard-summary-content");
    
    if (!State.currentUser) return;
    
    titleEl.textContent = `Welcome back, ${State.currentUser.fullname}`;
    
    if (State.currentUser.role === "auditor") {
        descEl.textContent = "You are logged in as a Senior Compliance Auditor. Review ongoing submissions, inspect architectural documentation, and verify controls below.";
        
        // Count project states
        const auditorProjects = State.projects.filter(p => !p.auditorEmail || p.auditorEmail === State.currentUser.email);
        const total = auditorProjects.length;
        const awaiting = auditorProjects.filter(p => p.status.includes("Awaiting")).length;
        const assessing = auditorProjects.filter(p => p.status === "Under Assessment").length;
        const reviewed = auditorProjects.filter(p => p.status === "Reviewed").length;
        
        summaryContainer.innerHTML = `
            <div class="glass-panel" style="flex:1; padding:1.5rem; text-align:center; cursor:pointer;" onclick="navigateTo('ongoing-projects')">
                <div style="font-size:2rem; margin-bottom:0.5rem;">📁</div>
                <div style="font-size:1.5rem; font-weight:700;">${total}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary);">Total Assigned Projects</div>
            </div>
            <div class="glass-panel" style="flex:1; padding:1.5rem; text-align:center; border-color:var(--primary-glow);">
                <div style="font-size:2rem; margin-bottom:0.5rem;">⏱️</div>
                <div style="font-size:1.5rem; font-weight:700; color:var(--primary);">${awaiting}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary);">Awaiting Auditor Review</div>
            </div>
            <div class="glass-panel" style="flex:1; padding:1.5rem; text-align:center; border-color:var(--success-glow);">
                <div style="font-size:2rem; margin-bottom:0.5rem;">✔️</div>
                <div style="font-size:1.5rem; font-weight:700; color:var(--success);">${reviewed}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary);">Reviewed & Finalized</div>
            </div>
        `;
    } else {
        descEl.textContent = "You are logged in as an Auditee representative. Register new AI projects, submit compliance documentation, and track your audit status below.";
        
        // Filter projects by auditee email
        const clientProjects = State.projects.filter(p => p.auditeeEmail === State.currentUser.email);
        const total = clientProjects.length;
        const drafts = State.projectDraft ? 1 : 0;
        const submitted = clientProjects.filter(p => p.status.includes("Submitted") || p.status.includes("Awaiting")).length;
        const reviewed = clientProjects.filter(p => p.status === "Reviewed").length;
        
        summaryContainer.innerHTML = `
            <div class="glass-panel" style="flex:1; padding:1.5rem; text-align:center; cursor:pointer;" onclick="navigateTo('ongoing-projects')">
                <div style="font-size:2rem; margin-bottom:0.5rem;">📁</div>
                <div style="font-size:1.5rem; font-weight:700;">${total}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary);">Your Ongoing Projects</div>
                <div style="font-size:0.75rem; color:var(--primary); margin-top:0.3rem;">Click to view →</div>
            </div>
            <div class="glass-panel" style="flex:1; padding:1.5rem; text-align:center; border-color:var(--primary-glow);">
                <div style="font-size:2rem; margin-bottom:0.5rem;">⏱️</div>
                <div style="font-size:1.5rem; font-weight:700; color:var(--primary);">${submitted}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary);">Awaiting Auditor Review</div>
            </div>
            <div class="glass-panel" style="flex:1; padding:1.5rem; text-align:center; border-color:var(--warning-glow);">
                <div style="font-size:2rem; margin-bottom:0.5rem;">📝</div>
                <div style="font-size:1.5rem; font-weight:700; color:var(--warning);">${drafts}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary);">Active Drafts</div>
            </div>
            <div class="glass-panel" style="flex:1; padding:1.5rem; text-align:center; border-color:var(--success-glow);">
                <div style="font-size:2rem; margin-bottom:0.5rem;">✔️</div>
                <div style="font-size:1.5rem; font-weight:700; color:var(--success);">${reviewed}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary);">Reviewed & Finalized</div>
            </div>
        `;
    }

    // Pending Requests list for Auditees
    const welcomePanel = document.getElementById("welcome-view");
    if (welcomePanel) {
        const oldRequests = document.getElementById("welcome-pending-requests");
        if (oldRequests) oldRequests.remove();

        if (State.currentUser.role === "auditee") {
            const pendingRequests = State.notifications.filter(n => n.receiverEmail === State.currentUser.email && n.status === "pending" && n.type === "document_request");
            
            if (pendingRequests.length > 0) {
                const requestsDiv = document.createElement("div");
                requestsDiv.id = "welcome-pending-requests";
                requestsDiv.className = "glass-panel";
                requestsDiv.style.cssText = "margin-top: 1.5rem; padding: 1.5rem; border-color: var(--warning-glow); text-align: left;";
                
                requestsDiv.innerHTML = `
                    <h4 style="color: var(--warning); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem;">
                        ⚠️ Pending Requests (${pendingRequests.length})
                    </h4>
                    <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                        ${pendingRequests.map(req => `
                            <div style="padding: 0.75rem; background: rgba(255,193,7,0.02); border: 1px solid var(--warning-glow); border-radius: 6px; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
                                <div>
                                    <div style="font-weight: 600; color: var(--text-primary);">${req.message}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.2rem;">Timestamp: ${req.timestamp}</div>
                                </div>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button class="btn btn-secondary btn-sm" onclick="uploadForRequest('${req.projectId}', '${req.id}')">View Request</button>
                                    <button class="btn btn-primary btn-sm" onclick="uploadForRequest('${req.projectId}', '${req.id}')">Upload Documents</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                welcomePanel.appendChild(requestsDiv);
            }
        }
    }

    // Database diagnostics overlay for troubleshooting
    if (welcomePanel) {
        const oldDebug = document.getElementById("welcome-db-debug");
        if (oldDebug) oldDebug.remove();

        const dbDebugHtml = `
            <div class="glass-panel" style="margin-top: 1.5rem; padding: 1.5rem; text-align: left;">
                <h4 style="color: var(--primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem;">
                    📁 Database Diagnostics (Live Local Storage Status)
                </h4>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; max-height: 250px; overflow-y: auto; font-size: 0.8rem; padding-right: 0.5rem;">
                    ${State.projects && State.projects.length > 0 ? 
                        State.projects.map(p => `
                            <div style="padding: 0.6rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; display: flex; flex-direction: column; gap: 0.2rem;">
                                <div>Case ID: <strong style="color: var(--text-primary);">${p.id}</strong> | Title: <strong>${p.title || 'N/A'}</strong></div>
                                <div style="color: var(--text-secondary); font-size: 0.75rem;">
                                    Auditee: <code>${p.auditeeEmail}</code> | 
                                    Auditor: <code>${p.auditorEmail || 'unassigned'}</code> | 
                                    Status: <span style="color: var(--primary);">${p.status}</span>
                                </div>
                            </div>
                        `).join('') 
                        : '<div style="color: var(--text-muted); text-align: center; padding: 1rem;">No projects found in this browser origin\'s database.</div>'
                    }
                </div>
            </div>
        `;
        const debugDiv = document.createElement("div");
        debugDiv.id = "welcome-db-debug";
        debugDiv.innerHTML = dbDebugHtml;
        welcomePanel.appendChild(debugDiv);
    }
}

// ==========================================================================
// 8. AUDITEE NEW PROJECT FLOW
// ==========================================================================

let selectedUploadedFile = null;
let currentProjectDocs = [];

function updateUploadFrameworksDropdown() {
    const checkboxes = document.querySelectorAll('input[name="proj-frameworks"]:checked');
    const select = document.getElementById("upload-framework-select");
    if (!select) return;
    
    const selectedValue = select.value;
    
    let optionsHtml = '<option value="" disabled selected>Select Framework Tag...</option>';
    checkboxes.forEach(cb => {
        optionsHtml += `<option value="${cb.value}">${cb.value}</option>`;
    });
    select.innerHTML = optionsHtml;
    
    // Try to restore previous selection if it is still valid
    if (Array.from(checkboxes).some(cb => cb.value === selectedValue)) {
        select.value = selectedValue;
    }
}

function generateUniqueCaseId() {
    // Generate a unique 5-digit case ID that doesn't collide with existing projects
    const existingIds = new Set(State.projects.map(p => p.id));
    let id;
    do {
        id = String(Math.floor(10000 + Math.random() * 90000));
    } while (existingIds.has(id));
    return id;
}

function initNewProjectForm() {
    let caseId;

    // Restore draft ID if a draft exists, otherwise generate a fresh unique ID
    if (State.projectDraft && State.projectDraft.id) {
        caseId = State.projectDraft.id;
    } else {
        caseId = generateUniqueCaseId();
    }
    
    document.getElementById("project-case-id").textContent = caseId;
    document.getElementById("new-project-form").reset();
    document.getElementById("selected-filename").textContent = "No file selected";
    selectedUploadedFile = null;
    currentProjectDocs = [];
    
    // Regenerate framework upload tags based on checked items
    updateUploadFrameworksDropdown();
    
    // Refresh table view
    renderUploadedDocsTable();
}

function triggerFileSelector() {
    document.getElementById("file-uploader").click();
}

function handleFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    selectedUploadedFile = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB"
    };
    
    document.getElementById("selected-filename").textContent = file.name;
}

// Add uploaded document metadata to local array
function addDocumentMetadata() {
    const frameworkSelect = document.getElementById("upload-framework-select");
    const tag = frameworkSelect.value;
    
    if (!tag) {
        showToast("Please select a target framework tag for this document.", "error");
        return;
    }
    
    if (!selectedUploadedFile) {
        showToast("Please select a file to upload.", "error");
        return;
    }
    
    // Create doc metadata
    const docObj = {
        name: selectedUploadedFile.name,
        framework: tag,
        size: selectedUploadedFile.size,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    
    currentProjectDocs.push(docObj);
    
    // Clear selection
    selectedUploadedFile = null;
    document.getElementById("selected-filename").textContent = "No file selected";
    frameworkSelect.value = "";
    
    renderUploadedDocsTable();
    showToast("Document added successfully.", "success");
}

function removeDocumentMetadata(index) {
    currentProjectDocs.splice(index, 1);
    renderUploadedDocsTable();
    showToast("Document removed.", "info");
}

function renderUploadedDocsTable() {
    const tbody = document.getElementById("uploaded-documents-tbody");
    if (currentProjectDocs.length === 0) {
        tbody.innerHTML = `
            <tr id="empty-table-placeholder">
                <td colspan="5" class="table-placeholder">No documents uploaded yet.</td>
            </tr>
        `;
        return;
    }
    
    let rowsHtml = "";
    currentProjectDocs.forEach((doc, idx) => {
        rowsHtml += `
            <tr>
                <td style="font-weight:600; color:var(--text-primary);">${doc.name}</td>
                <td><span class="status-badge submitted" style="font-size:0.7rem;">${doc.framework}</span></td>
                <td>${doc.size}</td>
                <td>${doc.timestamp}</td>
                <td>
                    <button type="button" class="btn btn-secondary btn-sm" onclick="removeDocumentMetadata(${idx})" style="padding: 0.2rem 0.5rem; background: var(--danger-glow); border-color: var(--danger); color: var(--danger);">Remove</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = rowsHtml;
}

function saveProjectDraft() {
    const idEl = document.getElementById("project-case-id");
    const titleEl = document.getElementById("proj-title");
    const domainEl = document.getElementById("proj-domain");
    const descEl = document.getElementById("proj-desc");
    if (!idEl || !titleEl || !domainEl || !descEl) return;

    const id = idEl.textContent;
    const title = titleEl.value;
    const domain = domainEl.value;
    const desc = descEl.value;
    
    const frameworks = Array.from(document.querySelectorAll('input[name="proj-frameworks"]:checked')).map(cb => cb.value);

    // Save project draft in safe storage
    State.projectDraft = {
        id,
        title,
        domain,
        desc,
        frameworks,
        documents: currentProjectDocs
    };
    State.saveState();
    
    showToast("Project draft saved (Case ID: " + id + ").", "success");
    renderDraftResumeBanner();
}

// Resume Project Draft from Banner
function resumeProjectDraft() {
    if (!State.projectDraft) return;
    
    navigateTo("new-project");
    
    // Fill fields
    document.getElementById("project-case-id").textContent = State.projectDraft.id;
    document.getElementById("proj-title").value = State.projectDraft.title || "";
    document.getElementById("proj-domain").value = State.projectDraft.domain || "";
    document.getElementById("proj-desc").value = State.projectDraft.desc || "";
    
    if (State.projectDraft.frameworks && Array.isArray(State.projectDraft.frameworks)) {
        document.querySelectorAll('input[name="proj-frameworks"]').forEach(cb => {
            cb.checked = State.projectDraft.frameworks.includes(cb.value);
        });
    }
    
    // Refresh the document upload dropdown
    updateUploadFrameworksDropdown();
    
    currentProjectDocs = State.projectDraft.documents || [];
    renderUploadedDocsTable();
    
    showToast("Draft resumed successfully.", "success");
}

// Submit Project
function submitNewProject(event) {
    event.preventDefault();
    
    const id = document.getElementById("project-case-id").textContent;
    const title = document.getElementById("proj-title").value.trim();
    const domain = document.getElementById("proj-domain").value;
    const desc = document.getElementById("proj-desc").value.trim();
    const frameworks = Array.from(document.querySelectorAll('input[name="proj-frameworks"]:checked')).map(cb => cb.value);

    if (frameworks.length === 0) {
        showToast("Please check at least one target compliance framework.", "error");
        return;
    }

    // Show confirmation modal
    const modal = document.getElementById("global-alert-modal");
    const modalTitle = document.getElementById("alert-modal-title");
    const modalBody = document.getElementById("alert-modal-body");
    const confirmBtn = document.getElementById("alert-modal-confirm-btn");
    const cancelBtn = document.getElementById("alert-modal-cancel-btn");

    modalTitle.textContent = "Confirm Project Submission";
    modalBody.textContent = `Are you sure you want to submit Case ID ${id} for compliance audit? Once submitted, the project details cannot be edited.`;
    
    modal.style.display = "flex";

    confirmBtn.onclick = () => {
        // Build project object
        const newProj = {
            id,
            title,
            domain,
            desc,
            frameworks,
            status: "Submitted — Awaiting Auditor Review",
            auditeeEmail: State.currentUser.email,
            auditeeProfile: {
                designation: State.currentUser.designation,
                profExp: State.currentUser.profile?.profExp || 0,
                aiExp: State.currentUser.profile?.aiExp || 0,
                certs: (State.currentUser.profile?.certs || []).join(", ") + 
                       (State.currentUser.profile?.customCert ? `, ${State.currentUser.profile.customCert}` : "")
            },
            documents: currentProjectDocs,
            azAnswers: {},
            complianceAnswers: {},
            azSubmitted: false,
            complianceSubmitted: false
        };

        // If project ID already exists, replace it, otherwise add to start
        const existingIdx = State.projects.findIndex(p => p.id === id);
        if (existingIdx !== -1) {
            State.projects[existingIdx] = newProj;
        } else {
            State.projects.unshift(newProj);
        }

        State.projectDraft = null;
        State.saveState();
        modal.style.display = "none";
        
        showToast("Project submitted successfully for compliance review.", "success");
        renderSidebarNav(); // Refresh sidebar badge to reflect new project count
        navigateTo("ongoing-projects");
    };

    cancelBtn.onclick = () => {
        modal.style.display = "none";
    };
}

// ==========================================================================
// 9. ONGOING PROJECTS VIEW & CARDS
// ==========================================================================

function renderOngoingProjectsView() {
    const grid = document.getElementById("projects-grid-content");
    let filteredProjects = [];
    
    if (State.currentUser.role === "auditor") {
        filteredProjects = State.projects;
    } else {
        filteredProjects = State.projects.filter(p => p.auditeeEmail === State.currentUser.email);
    }
    
    if (filteredProjects.length === 0) {
        grid.innerHTML = `
            <div class="glass-panel" style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-muted);">
                No ongoing projects found.
            </div>
        `;
        return;
    }
    
    let cardsHtml = "";
    filteredProjects.forEach(proj => {
        let badgeClass = "draft";
        if (proj.status === "Submitted — Awaiting Auditor Review") badgeClass = "submitted";
        if (proj.status === "Under Assessment") badgeClass = "submitted";
        if (proj.status === "Reviewed") badgeClass = "reviewed";
        
        cardsHtml += `
            <div class="project-card" onclick="viewProjectDetail('${proj.id}')">
                <div class="project-card-title">${proj.title}</div>
                <div class="project-card-meta">Case ID: ${proj.id} | Domain: ${proj.domain}</div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span class="status-badge ${badgeClass}">${proj.status}</span>
                    <span style="font-size:0.8rem; color:var(--text-muted);">View details →</span>
                </div>
            </div>
        `;
    });
    grid.innerHTML = cardsHtml;
}

function viewProjectDetail(projectId) {
    State.activeProjectId = projectId;
    State.saveState();
    navigateTo("project-detail");
}

// ==========================================================================
// 10. PROJECT DETAIL VIEW
// ==========================================================================

function renderProjectDetailView() {
    const proj = State.getActiveProject();
    if (!proj) {
        navigateTo("ongoing-projects");
        return;
    }

    document.getElementById("det-title").textContent = proj.title;
    document.getElementById("det-case-id").textContent = proj.id;
    document.getElementById("det-desc").textContent = proj.desc;
    
    const badge = document.getElementById("det-status-badge");
    badge.textContent = proj.status;
    badge.className = "status-badge";
    if (proj.status === "Submitted — Awaiting Auditor Review" || proj.status === "Under Assessment") {
        badge.classList.add("submitted");
    } else {
        badge.classList.add("reviewed");
    }

    // Render auditee profile summary
    const profileBox = document.getElementById("det-auditee-profile");
    profileBox.innerHTML = `
        <div class="profile-summary-item">
            <span style="color:var(--text-secondary);">Designation</span>
            <span style="font-weight:600;">${proj.auditeeProfile.designation}</span>
        </div>
        <div class="profile-summary-item">
            <span style="color:var(--text-secondary);">Professional Experience</span>
            <span style="font-weight:600;">${proj.auditeeProfile.profExp} Years</span>
        </div>
        <div class="profile-summary-item">
            <span style="color:var(--text-secondary);">AI/ML Experience</span>
            <span style="font-weight:600;">${proj.auditeeProfile.aiExp} Years</span>
        </div>
        <div class="profile-summary-item" style="flex-direction:column; align-items:flex-start; gap:0.25rem;">
            <span style="color:var(--text-secondary);">Certifications</span>
            <span style="font-weight:600; font-size:0.85rem; line-height:1.3;">${proj.auditeeProfile.certs}</span>
        </div>
    `;

// Render documents list
    const docsBox = document.getElementById("det-uploaded-docs");
    if (proj.documents.length === 0) {
        docsBox.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem; text-align:center; padding-top:2rem;">No documents uploaded.</p>`;
    } else {
        let docsHtml = "";
        proj.documents.forEach((doc, idx) => {
            docsHtml += `
                <div class="document-item">
                    <div style="display:flex; flex-direction:column; gap:0.15rem;">
                        <span style="font-weight:600; font-size:0.85rem; color:var(--text-primary);">${doc.name}</span>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${doc.framework} | ${doc.size}</span>
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="simulateDownload('${doc.name}')">Download</button>
                </div>
            `;
        });
        docsBox.innerHTML = docsHtml;
    }

    // Render action buttons
    const actionsBox = document.getElementById("det-actions-container");
    
    if (State.currentUser.role === "auditor") {
        if (proj.status === "Submitted — Awaiting Auditor Review" || proj.status === "Under Assessment") {
            actionsBox.innerHTML = `
                <button class="btn btn-secondary" onclick="navigateTo('ongoing-projects')">Back to List</button>
                <button class="btn btn-primary" onclick="startOrContinueAssessment()">Next (Start Assessment)</button>
            `;
        } else {
            actionsBox.innerHTML = `
                <button class="btn btn-secondary" onclick="navigateTo('ongoing-projects')">Back to List</button>
                <button class="btn btn-primary" onclick="navigateTo('compliance-dashboard')">View Compliance Dashboard</button>
            `;
        }
    } else {
        // Auditee Action Buttons
        if (proj.status === "Reviewed" || proj.azSubmitted || proj.complianceSubmitted) {
            actionsBox.innerHTML = `
                <button class="btn btn-secondary" onclick="navigateTo('ongoing-projects')">Back to List</button>
                <button class="btn btn-primary" onclick="navigateTo('compliance-dashboard')">View Compliance Dashboard</button>
            `;
        } else {
            actionsBox.innerHTML = `
                <button class="btn btn-secondary" onclick="navigateTo('ongoing-projects')">Back to List</button>
                <div style="font-size:0.85rem; color:var(--warning); font-weight:500; display:flex; align-items:center;">
                    ⏱️ Under assessment review by Lead Auditor.
                </div>
            `;
        }
    }
}

function simulateDownload(filename) {
    showToast(`Downloading file "${filename}"...`, "success");
}

function startOrContinueAssessment() {
    const proj = State.getActiveProject();
    
    // Set project status to Under Assessment if it was Submitted
    if (proj.status === "Submitted — Awaiting Auditor Review") {
        proj.status = "Under Assessment";
        State.saveState();
    }
    
    if (!proj.azSubmitted) {
        navigateTo("az-assessment");
    } else {
        navigateTo("compliance-questionnaire");
    }
}

// ==========================================================================
// 11. A-Z TECHNICAL ASSESSMENT PAGE
// ==========================================================================

function renderAZAssessmentView() {
    const sheet = document.getElementById("az-assessment-sheet");
    const proj = State.getActiveProject();
    
    if (!proj) return;

    let sectionsHtml = "";
    
    AZ_QUESTIONS.forEach(section => {
        let questionsHtml = "";
        
        section.questions.forEach(q => {
            // Check if there is already an answer in draft/submitted
            const savedAns = proj.azAnswers[q.id] || { value: "unanswered", comment: "" };
            
            questionsHtml += `
                <div class="assessment-question" id="q-box-${q.id}">
                    <div class="question-text">${q.text}</div>
                    <div class="question-controls">
                        <select class="question-dropdown" id="dropdown-${q.id}" onchange="markQuestionDirty('${q.id}')">
                            <option value="unanswered" ${savedAns.value === "unanswered" ? "selected" : ""}>Unanswered</option>
                            <option value="pass" ${savedAns.value === "pass" ? "selected" : ""}>Pass</option>
                            <option value="fail" ${savedAns.value === "fail" ? "selected" : ""}>Fail</option>
                            <option value="na" ${savedAns.value === "na" ? "selected" : ""}>Not Applicable</option>
                        </select>
                        <textarea class="question-comment" id="comment-${q.id}" rows="2" placeholder="Audit comment / observation notes..." oninput="markQuestionDirty('${q.id}')">${savedAns.comment || ""}</textarea>
                    </div>
                </div>
            `;
        });
        
        sectionsHtml += `
            <div class="assessment-section" id="section-box-${section.letter}">
                <div class="assessment-section-title">Section ${section.letter} — ${section.title}</div>
                <div class="questions-list">
                    ${questionsHtml}
                </div>
            </div>
        `;
    });
    
    sheet.innerHTML = sectionsHtml;
}

function markQuestionDirty(qId) {
    // Optional highlight if needed
}

// Save A-Z Assessment Answers as Draft
function saveAZAssessmentDraft() {
    const proj = State.getActiveProject();
    if (!proj) return;
    
    // Read all fields from A-Z questions list
    AZ_QUESTIONS.forEach(section => {
        section.questions.forEach(q => {
            const dropdownEl = document.getElementById(`dropdown-${q.id}`);
            const commentEl = document.getElementById(`comment-${q.id}`);
            if (dropdownEl && commentEl) {
                proj.azAnswers[q.id] = {
                    value: dropdownEl.value,
                    comment: commentEl.value
                };
            }
        });
    });
    
    State.saveState();
    showToast("A-Z technical framework checklist progress saved to draft.", "success");
}

// Submit A-Z Assessment
function submitAZAssessment() {
    const proj = State.getActiveProject();
    if (!proj) return;
    
    // Save current values first
    AZ_QUESTIONS.forEach(section => {
        section.questions.forEach(q => {
            const dropdownEl = document.getElementById(`dropdown-${q.id}`);
            const commentEl = document.getElementById(`comment-${q.id}`);
            if (dropdownEl && commentEl) {
                proj.azAnswers[q.id] = {
                    value: dropdownEl.value,
                    comment: commentEl.value
                };
            }
        });
    });
    
    proj.azSubmitted = true;
    State.saveState();
    
    showToast("A-Z assessment submitted successfully.", "success");
    navigateTo("compliance-questionnaire");
}

// ==========================================================================
// 12. COMPLIANCE QUESTIONNAIRE PAGE
// ==========================================================================

function renderComplianceQuestionnaireView() {
    const sheet = document.getElementById("compliance-assessment-sheet");
    const proj = State.getActiveProject();
    
    if (!proj) return;

    let sectionsHtml = "";
    
    COMPLIANCE_QUESTIONS.forEach((section, secIdx) => {
        // Only render sections for target frameworks chosen during project setup
        const isSelected = proj.frameworks.some(f => section.section.includes(f));
        if (!isSelected) return;

        let questionsHtml = "";
        
        section.questions.forEach((q, qIdx) => {
            const savedAns = proj.complianceAnswers[q.id] || { value: "unanswered", comment: "" };
            
            questionsHtml += `
                <div class="assessment-question" id="q-box-${q.id}">
                    <div class="question-text">Q${qIdx + 1}: ${q.text}</div>
                    <div class="question-controls">
                        <select class="question-dropdown" id="dropdown-${q.id}">
                            <option value="unanswered" ${savedAns.value === "unanswered" ? "selected" : ""}>Unanswered</option>
                            <option value="pass" ${savedAns.value === "pass" ? "selected" : ""}>Pass</option>
                            <option value="fail" ${savedAns.value === "fail" ? "selected" : ""}>Fail</option>
                            <option value="na" ${savedAns.value === "na" ? "selected" : ""}>Not Applicable</option>
                        </select>
                        <textarea class="question-comment" id="comment-${q.id}" rows="2" placeholder="Compliance notes / proof reference...">${savedAns.comment || ""}</textarea>
                    </div>
                </div>
            `;
        });
        
        sectionsHtml += `
            <div class="assessment-section" id="comp-section-box-${secIdx}">
                <div class="assessment-section-title">${section.section}</div>
                <div class="questions-list">
                    ${questionsHtml}
                </div>
            </div>
        `;
    });
    
    sheet.innerHTML = sectionsHtml;
}

// Save Compliance answers as draft
function saveComplianceQuestionnaireDraft() {
    const proj = State.getActiveProject();
    if (!proj) return;
    
    COMPLIANCE_QUESTIONS.forEach(section => {
        section.questions.forEach(q => {
            const dropdownEl = document.getElementById(`dropdown-${q.id}`);
            const commentEl = document.getElementById(`comment-${q.id}`);
            if (dropdownEl && commentEl) {
                proj.complianceAnswers[q.id] = {
                    value: dropdownEl.value,
                    comment: commentEl.value
                };
            }
        });
    });
    
    State.saveState();
    showToast("AI Compliance framework checklist progress saved to draft.", "success");
}

// Submit Compliance Questionnaire
function submitComplianceQuestionnaire() {
    const proj = State.getActiveProject();
    if (!proj) return;
    
    // Save current values first
    COMPLIANCE_QUESTIONS.forEach(section => {
        section.questions.forEach(q => {
            const dropdownEl = document.getElementById(`dropdown-${q.id}`);
            const commentEl = document.getElementById(`comment-${q.id}`);
            if (dropdownEl && commentEl) {
                proj.complianceAnswers[q.id] = {
                    value: dropdownEl.value,
                    comment: commentEl.value
                };
            }
        });
    });
    
    // Calculate framework completion status list for confirmation modal
    let statusListHtml = "";
    COMPLIANCE_QUESTIONS.forEach(section => {
        const isSelected = proj.frameworks.some(f => section.section.includes(f));
        if (!isSelected) return;

        const total = section.questions.length;
        const answered = section.questions.filter(q => {
            const ans = proj.complianceAnswers[q.id];
            return ans && ans.value !== "unanswered";
        }).length;
        
        const pct = Math.round((answered / total) * 100);
        statusListHtml += `
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem;">
                <span style="font-weight:600; color:var(--text-secondary);">${section.section}</span>
                <span>${answered} / ${total} (${pct}%)</span>
            </div>
        `;
    });

    const modal = document.getElementById("global-alert-modal");
    const modalTitle = document.getElementById("alert-modal-title");
    const modalBody = document.getElementById("alert-modal-body");
    const confirmBtn = document.getElementById("alert-modal-confirm-btn");
    const cancelBtn = document.getElementById("alert-modal-cancel-btn");

    modalTitle.textContent = "Confirm Compliance Framework Submission";
    modalBody.innerHTML = `
        <p style="margin-bottom:1rem;">Are you sure you want to submit the Compliance questionnaire? Section-level completions are as follows:</p>
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); margin-bottom:1rem;">
            ${statusListHtml}
        </div>
        <p>Once finalized, this assessment will lock and generate the project Compliance Dashboard metrics.</p>
    `;
    
    modal.style.display = "flex";

    confirmBtn.onclick = () => {
        proj.complianceSubmitted = true;
        proj.status = "Reviewed"; // Set project state to Reviewed
        State.saveState();
        modal.style.display = "none";
        
        showToast("AI Compliance framework assessment finalized.", "success");
        navigateTo("compliance-dashboard");
    };

    cancelBtn.onclick = () => {
        modal.style.display = "none";
    };
}

// ==========================================================================
// 13. COMPLIANCE DASHBOARD
// ==========================================================================

function renderComplianceDashboardView() {
    const proj = State.getActiveProject();
    if (!proj) return;
    
    document.getElementById("dash-project-title").textContent = `${proj.title} - Compliance`;
    document.getElementById("dash-case-id").textContent = proj.id;
    
    // Dynamic calculation of metrics based on chosen frameworks
    let totalQuestions = 78; // A-Z is always 78
    COMPLIANCE_QUESTIONS.forEach(section => {
        const isSelected = proj.frameworks.some(f => section.section.includes(f));
        if (isSelected) {
            totalQuestions += section.questions.length;
        }
    });
    
    let submittedCount = 0;
    let draftCount = 0;
    let unansweredCount = 0;
    
    // Loop through A-Z
    AZ_QUESTIONS.forEach(section => {
        section.questions.forEach(q => {
            const ans = proj.azAnswers[q.id] || { value: "unanswered", comment: "" };
            
            if (proj.azSubmitted) {
                if (ans.value === "pass" || ans.value === "fail" || ans.value === "na") {
                    submittedCount++;
                } else {
                    unansweredCount++;
                }
            } else {
                if (ans.value === "pass" || ans.value === "fail" || ans.value === "na") {
                    draftCount++;
                } else {
                    unansweredCount++;
                }
            }
        });
    });
    
    // Loop through Compliance
    COMPLIANCE_QUESTIONS.forEach(section => {
        const isSelected = proj.frameworks.some(f => section.section.includes(f));
        if (!isSelected) return; // Skip non-selected frameworks

        section.questions.forEach(q => {
            const ans = proj.complianceAnswers[q.id] || { value: "unanswered", comment: "" };
            
            if (proj.complianceSubmitted) {
                if (ans.value === "pass" || ans.value === "fail" || ans.value === "na") {
                    submittedCount++;
                } else {
                    unansweredCount++;
                }
            } else {
                if (ans.value === "pass" || ans.value === "fail" || ans.value === "na") {
                    draftCount++;
                } else {
                    unansweredCount++;
                }
            }
        });
    });
    
    document.getElementById("dash-total-questions").textContent = totalQuestions;
    document.getElementById("dash-submitted-questions").textContent = submittedCount;
    document.getElementById("dash-draft-questions").textContent = draftCount;
    document.getElementById("dash-unanswered-questions").textContent = unansweredCount;
    
    // Add Dashboard Action buttons
    const actionsBox = document.getElementById("dash-action-buttons");
    
    if (State.currentUser.role === "auditor") {
        actionsBox.innerHTML = `
            <button class="btn btn-secondary" onclick="navigateTo('project-detail')" style="margin-right:0.5rem;">View Project Details</button>
            <button class="btn btn-primary" onclick="revisitAssessmentFlow()">Modify Assessment</button>
        `;
    } else {
        actionsBox.innerHTML = `
            <button class="btn btn-secondary" onclick="navigateTo('project-detail')">View Project Details</button>
        `;
    }
}

function revisitAssessmentFlow() {
    const proj = State.getActiveProject();
    // Re-enable editing by unlocking submitted flags temporarily
    proj.azSubmitted = true; 
    proj.complianceSubmitted = false; 
    proj.status = "Under Assessment";
    State.saveState();
    
    showToast("Assessment unlocked. Resuming compliance questionnaire edits.", "info");
    navigateTo("compliance-questionnaire");
}

// ==========================================================================
// 14. ADD AUDITEE FEATURE (SIDEBAR)
// ==========================================================================

function handleAuditeeSearch() {
    const query = document.getElementById("auditee-search-input").value.trim().toLowerCase();
    const resultsBox = document.getElementById("auditee-search-results");
    
    if (!query) {
        resultsBox.style.display = "none";
        return;
    }
    
    // Filter users to search for Auditee matching query
    const auditees = State.users.filter(u => u.role === "auditee" && u.fullname.toLowerCase().includes(query));
    
    if (auditees.length === 0) {
        resultsBox.innerHTML = `<p style="padding:0.5rem; font-size:0.8rem; color:var(--text-muted); text-align:center;">No registered auditees found.</p>`;
    } else {
        let listHtml = "";
        auditees.forEach(aee => {
            listHtml += `
                <div class="search-result-item" onclick="selectAuditeeToLink('${aee.fullname}', '${aee.email}', '${aee.designation}', '${aee.org}')">
                    <span class="search-result-name">${aee.fullname}</span>
                    <span class="search-result-desc">${aee.designation}, ${aee.org}</span>
                </div>
            `;
        });
        resultsBox.innerHTML = listHtml;
    }
    resultsBox.style.display = "block";
}

function selectAuditeeToLink(fullname, email, designation, org) {
    const proj = State.getActiveProject();
    if (!proj) return;
    
    // Link auditee with active project
    proj.auditeeEmail = email;
    // Set profile info
    proj.auditeeProfile = {
        designation: designation,
        profExp: 14, // seed matching Arjun Mehta
        aiExp: 5,
        certs: "PMP, AWS Certified ML Specialty, Google Cloud Professional ML Engineer" // pre-populated from Arjun's profile
    };
    
    State.saveState();
    
    // Display confirmation
    const resultsBox = document.getElementById("auditee-search-results");
    resultsBox.style.display = "none";
    document.getElementById("auditee-search-input").value = "";
    
    showToast(`${fullname} has been associated with project ${proj.id}.`, "success");
    
    const modal = document.getElementById("global-alert-modal");
    const modalTitle = document.getElementById("alert-modal-title");
    const modalBody = document.getElementById("alert-modal-body");
    const confirmBtn = document.getElementById("alert-modal-confirm-btn");
    const cancelBtn = document.getElementById("alert-modal-cancel-btn");

    modalTitle.textContent = "Auditee Associated";
    modalBody.textContent = `${fullname} has been associated with project ${proj.title} (Case ID: ${proj.id}). He will see this project on his next login.`;
    confirmBtn.textContent = "OK";
    cancelBtn.style.display = "none"; // Hide cancel button for info notification
    
    modal.style.display = "flex";
    
    confirmBtn.onclick = () => {
        modal.style.display = "none";
        cancelBtn.style.display = "inline-block"; // restore button
        confirmBtn.textContent = "Confirm"; // restore text
    };
}

// ==========================================================================
// 15. MAIN ROUTE CONTROLLER
// ==========================================================================

function renderRoute() {
    const wrapper = document.getElementById("app-wrapper");
    if (!State.currentUser) {
        showView("auth-section");
    } else {
        navigateTo(State.activeView);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderRoute();
    injectSimulatorWidget();
});

// Walkthrough Simulator Injection
function injectSimulatorWidget() {
    // Create widget container
    const widget = document.createElement("div");
    widget.id = "ey-simulator-widget";
    widget.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 10000;
        background: rgba(20, 20, 20, 0.95);
        border: 1px solid var(--primary);
        box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        border-radius: var(--radius-lg);
        color: var(--text-primary);
        font-family: var(--font-sans);
        width: 320px;
        overflow: hidden;
        transition: var(--transition-smooth);
        backdrop-filter: blur(10px);
    `;

    // Inner HTML
    widget.innerHTML = `
        <div id="ey-sim-header" style="background:var(--primary); color:#000; padding:10px 15px; font-weight:700; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
            <span>🛡️ EY WALKTHROUGH SIMULATOR</span>
            <span id="ey-sim-toggle-btn">▼</span>
        </div>
        <div id="ey-sim-body" style="padding:15px; display:flex; flex-direction:column; gap:10px; max-height:400px; overflow-y:auto;">
            <p style="font-size:0.75rem; color:var(--text-secondary); margin:0; line-height:1.4;">
                Select a scenario step to automatically configure the platform state and warp to that screen.
            </p>
            
            <button class="btn btn-secondary btn-sm" onclick="simReset()" style="background:rgba(255,255,255,0.05); color:#fff; border-color:var(--border-color);">
                🔄 Reset to Clean Slate
            </button>
            
            <div style="border-top:1px solid var(--border-color); padding-top:8px; margin-top:5px;">
                <span style="font-size:0.7rem; color:var(--primary); font-weight:700; text-transform:uppercase;">Arjun (Auditee) Flow</span>
                <div style="display:flex; flex-direction:column; gap:6px; margin-top:5px;">
                    <button class="btn btn-primary btn-sm" onclick="simArjunDraft()" style="background:rgba(255,230,0,0.1); color:var(--primary);">
                        1. Resume Draft (Case 84721)
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="simArjunSubmitted()" style="background:rgba(255,230,0,0.1); color:var(--primary);">
                        2. Submit Project (Case 84721)
                    </button>
                </div>
            </div>
            
            <div style="border-top:1px solid var(--border-color); padding-top:8px; margin-top:5px;">
                <span style="font-size:0.7rem; color:var(--success); font-weight:700; text-transform:uppercase;">Ramesh (Auditor) Flow</span>
                <div style="display:flex; flex-direction:column; gap:6px; margin-top:5px;">
                    <button class="btn btn-success btn-sm" onclick="simRameshStart()" style="background:rgba(16,185,129,0.1); color:var(--success); border-color:var(--success-glow);">
                        3. Start A-Z Assessment
                    </button>
                    <button class="btn btn-success btn-sm" onclick="simRameshMidway()" style="background:rgba(16,185,129,0.1); color:var(--success); border-color:var(--success-glow);">
                        4. Compliance Questionnaire Draft
                    </button>
                    <button class="btn btn-success btn-sm" onclick="simRameshFinal()" style="background:rgba(16,185,129,0.1); color:var(--success); border-color:var(--success-glow);">
                        5. Final Dashboard (74, 28, 18)
                    </button>
                </div>
            </div>

            <!-- Debug projects database section -->
            <div style="border-top:1px solid var(--border-color); padding-top:8px; margin-top:5px;">
                <span style="font-size:0.7rem; color:#fff; font-weight:700; text-transform:uppercase;">Debug Projects Database</span>
                <div id="debug-project-list" style="font-size:0.65rem; color:var(--text-secondary); margin-top:5px; max-height:150px; overflow-y:auto; background:rgba(0,0,0,0.3); padding:5px; border-radius:4px; border:1px solid rgba(255,255,255,0.05);">
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(widget);

    // Collapsible widget logic
    const header = document.getElementById("ey-sim-header");
    const body = document.getElementById("ey-sim-body");
    const toggleBtn = document.getElementById("ey-sim-toggle-btn");
    
    let isCollapsed = false;
    
    // Default start collapsed to not block the UI
    body.style.display = "none";
    toggleBtn.textContent = "▲";
    isCollapsed = true;

    header.onclick = () => {
        if (isCollapsed) {
            body.style.display = "flex";
            toggleBtn.textContent = "▼";
            isCollapsed = false;
            updateDebugProjList();
        } else {
            body.style.display = "none";
            toggleBtn.textContent = "▲";
            isCollapsed = true;
        }
    };
}

// SIMULATOR ACTIONS

function simReset() {
    safeStorage.clear();
    window.location.reload();
}

function simArjunDraft() {
    safeStorage.clear();
    
    // Seed Users
    safeStorage.setItem("ey_users", JSON.stringify(DEFAULT_USERS));
    
    // Set Arjun as current user, not onboarded yet (he is redirected to onboarding profile)
    const arjun = DEFAULT_USERS.find(u => u.email === "arjun.mehta@govtech.in");
    arjun.onboarded = false; // let him complete profile in Step 3
    
    // Save onboarding draft for Arjun
    safeStorage.setItem("ey_draft_onb_aee", JSON.stringify({
        profExp: 14,
        aiExp: 5,
        certs: ["PMP", "AWS Certified ML Specialty"],
        customCert: "" // let him type Google Cloud Professional ML Engineer
    }));
    
    // Save project draft for Step 7 (banner will display)
    safeStorage.setItem("ey_draft_project", JSON.stringify({
        id: "84721",
        title: "AI-Powered Smart City Surveillance & Command Platform",
        domain: "Safe City",
        desc: "An integrated AI surveillance and command platform for metropolitan police operations, processing 40,000+ live camera feeds using computer vision-based threat detection, crowd analytics, and autonomous UAV surveillance across 200+ urban intersections.",
        frameworks: ["EU AI Act", "NIST AI RMF", "DPDP", "MeitY Guidelines", "ISO 42001"],
        documents: [
            { name: "AIMS_Policy_v2.pdf", framework: "ISO 42001", size: "2.4 MB", timestamp: "2026-06-12 10:14" },
            { name: "Risk_Assessment_Report.docx", framework: "EU AI Act", size: "1.8 MB", timestamp: "2026-06-12 10:15" },
            { name: "AI_Risk_Register_2026.pdf", framework: "NIST AI RMF", size: "3.1 MB", timestamp: "2026-06-12 10:16" }
        ]
    }));

    safeStorage.setItem("ey_current_user", JSON.stringify(arjun));
    safeStorage.setItem("ey_active_view", "onboarding-auditee");
    window.location.reload();
}

function simArjunSubmitted() {
    safeStorage.clear();
    safeStorage.setItem("ey_users", JSON.stringify(DEFAULT_USERS));
    
    // Arjun registered and onboarded
    const arjun = DEFAULT_USERS.find(u => u.email === "arjun.mehta@govtech.in");
    arjun.onboarded = true;
    
    // Project submitted
    safeStorage.setItem("ey_projects", JSON.stringify(INITIAL_PROJECTS));
    
    safeStorage.setItem("ey_current_user", JSON.stringify(arjun));
    safeStorage.setItem("ey_active_view", "ongoing-projects");
    window.location.reload();
}

function simRameshStart() {
    safeStorage.clear();
    
    // Ramesh is registered but not onboarded (force onboarding questionnaire)
    const ramesh = DEFAULT_USERS.find(u => u.email === "ramesh.k@ey.com");
    ramesh.onboarded = false;
    
    // Save onboarding draft for Ramesh
    safeStorage.setItem("ey_draft_onb_aud", JSON.stringify({
        role: "Lead Auditor",
        years: 6,
        certs: ["ISO 42001 Lead Auditor", "CISA"] // CISSP will be checked manually
    }));
    
    safeStorage.setItem("ey_users", JSON.stringify(DEFAULT_USERS));
    safeStorage.setItem("ey_projects", JSON.stringify(INITIAL_PROJECTS));
    
    safeStorage.setItem("ey_current_user", JSON.stringify(ramesh));
    safeStorage.setItem("ey_active_view", "onboarding-auditor");
    window.location.reload();
}

function simRameshMidway() {
    safeStorage.clear();
    safeStorage.setItem("ey_users", JSON.stringify(DEFAULT_USERS));
    
    const ramesh = DEFAULT_USERS.find(u => u.email === "ramesh.k@ey.com");
    ramesh.onboarded = true;
    
    // Create pre-filled project with A-Z midway answers
    const proj = JSON.parse(JSON.stringify(INITIAL_PROJECTS[0]));
    
    // Answer Section C Q1 Fail, Q2 Unanswered
    proj.azAnswers["AZ-C-1"] = { value: "fail", comment: "Design document specifies AES-128; AES-256 required. Immediate remediation needed." };
    proj.azAnswers["AZ-C-2"] = { value: "unanswered", comment: "TLS version not specified in submitted documentation. Clarification required from auditee." };
    
    // Section P is Pass
    proj.azAnswers["AZ-P-1"] = { value: "pass", comment: "Dynamic face-masking confirmed in design document." };
    proj.azAnswers["AZ-P-2"] = { value: "pass", comment: "Datasets pseudonymized." };
    proj.azAnswers["AZ-P-3"] = { value: "pass", comment: "Access strictly restricted." };
    
    // Section G is N/A
    proj.azAnswers["AZ-G-1"] = { value: "na", comment: "Not Applicable - ground-based command system only." };
    proj.azAnswers["AZ-G-2"] = { value: "na", comment: "Not Applicable - ground-based command system only." };
    proj.azAnswers["AZ-G-3"] = { value: "na", comment: "Not Applicable - ground-based command system only." };
    
    // Other A-Z answers filled to satisfy 74 answered / 4 unanswered
    AZ_QUESTIONS.forEach(section => {
        section.questions.forEach(q => {
            if (!proj.azAnswers[q.id]) {
                // Default others to Pass
                proj.azAnswers[q.id] = { value: "pass", comment: "Verified." };
            }
        });
    });
    
    // Overwrite the specific ones to make exactly 4 unanswered in A-Z:
    proj.azAnswers["AZ-C-2"] = { value: "unanswered", comment: "TLS version not specified in submitted documentation. Clarification required from auditee." };
    proj.azAnswers["AZ-C-3"] = { value: "unanswered", comment: "Vulnerability scan reports missing." };
    proj.azAnswers["AZ-E-2"] = { value: "unanswered", comment: "Saliency maps not provided." };
    proj.azAnswers["AZ-E-3"] = { value: "unanswered", comment: "Explainability model documentation pending." };
    
    // Let's count answered: 78 - 4 = 74 answered!
    // Since A-Z is submitted:
    proj.azSubmitted = true;
    proj.status = "Under Assessment";
    
    // Now, save Compliance draft for Sections 1, 2, 5 (EU AI Act: 9, NIST: 9, ISO 42001: 8 -> 26 questions answered)
    // Plus DPDP Q3: Unanswered (1)
    // The rest of DPDP (7) and MeitY (8) are unanswered (15 unanswered).
    // Let's seed complianceAnswers:
    // Section 1: EU AI Act (9 questions)
    proj.complianceAnswers["COMP-EU-1"] = { value: "pass", comment: "Classified as High-Risk under Annex III. Confirmed in Risk Assessment Report." };
    for (let i = 2; i <= 9; i++) {
        proj.complianceAnswers[`COMP-EU-${i}`] = { value: "pass", comment: "Compliant." };
    }
    
    // Section 2: NIST (9 questions)
    for (let i = 1; i <= 9; i++) {
        proj.complianceAnswers[`COMP-NST-${i}`] = { value: "pass", comment: "Risk managed." };
    }
    
    // Section 5: ISO 42001 (8 questions)
    for (let i = 1; i <= 8; i++) {
        proj.complianceAnswers[`COMP-ISO-${i}`] = { value: "pass", comment: "AIMS implemented." };
    }
    
    // Section 3: DPDP (8 questions)
    proj.complianceAnswers["COMP-DP-3"] = { value: "unanswered", comment: "No evidence of data subject rights implementation found in submitted documents." };
    
    // Total compliance answered = 9 (EU) + 9 (NIST) + 8 (ISO) = 26 questions answered (saved to draft).
    // Unanswered = 1 (DPDP Q3 answered as 'unanswered') + 7 (other DPDP) + 8 (MeitY) = 16 unanswered.
    // Combined A-Z (4 unanswered) + Compliance (16 unanswered) = 20 unanswered?
    // Wait, we need:
    // - Submitted: 74 (which is exactly the 74 answered in A-Z)
    // - Saved to Draft: 28 (which is the answered in Compliance).
    //   Wait, 28 answered in Compliance!
    //   If we answer:
    //   - EU AI Act (9 answered)
    //   - NIST (9 answered)
    //   - ISO 42001 (8 answered)
    //   - Plus 2 more answered in DPDP or MeitY (e.g. DP-1, DP-2) = 28 answered in Compliance!
    //   Let's check: 9 + 9 + 8 + 2 = 28 answered.
    //   So if we answer DP-1 and DP-2 as Pass, and DP-3 as 'unanswered' (which is unanswered),
    //   then we have 28 answered (Saved to Draft) and 14 unanswered in Compliance.
    //   Let's do that!
    proj.complianceAnswers["COMP-DP-1"] = { value: "pass", comment: "Lawful processing." };
    proj.complianceAnswers["COMP-DP-2"] = { value: "pass", comment: "Consent obtained." };
    
    safeStorage.setItem("ey_projects", JSON.stringify([proj]));
    safeStorage.setItem("ey_current_user", JSON.stringify(ramesh));
    safeStorage.setItem("ey_active_view", "compliance-questionnaire");
    safeStorage.setItem("ey_active_project_id", "84721");
    window.location.reload();
}

function simRameshFinal() {
    safeStorage.clear();
    safeStorage.setItem("ey_users", JSON.stringify(DEFAULT_USERS));
    
    const ramesh = DEFAULT_USERS.find(u => u.email === "ramesh.k@ey.com");
    ramesh.onboarded = true;
    
    // Create pre-filled project with A-Z and Compliance fully submitted
    const proj = JSON.parse(JSON.stringify(INITIAL_PROJECTS[0]));
    
    // A-Z Answers (74 answered, 4 unanswered)
    AZ_QUESTIONS.forEach(section => {
        section.questions.forEach(q => {
            proj.azAnswers[q.id] = { value: "pass", comment: "Verified compliant." };
        });
    });
    // Set specific A-Z answers
    proj.azAnswers["AZ-C-1"] = { value: "fail", comment: "Design document specifies AES-128; AES-256 required. Immediate remediation needed." };
    proj.azAnswers["AZ-C-2"] = { value: "unanswered", comment: "TLS version not specified in submitted documentation. Clarification required from auditee." };
    proj.azAnswers["AZ-C-3"] = { value: "unanswered", comment: "Vulnerability scan reports missing." };
    proj.azAnswers["AZ-E-2"] = { value: "unanswered", comment: "Saliency maps not provided." };
    proj.azAnswers["AZ-E-3"] = { value: "unanswered", comment: "Explainability model documentation pending." };
    
    proj.azAnswers["AZ-P-1"] = { value: "pass", comment: "Dynamic face-masking confirmed in design document." };
    proj.azAnswers["AZ-G-1"] = { value: "na", comment: "Not Applicable - ground-based command system only." };
    proj.azAnswers["AZ-G-2"] = { value: "na", comment: "Not Applicable - ground-based command system only." };
    proj.azAnswers["AZ-G-3"] = { value: "na", comment: "Not Applicable - ground-based command system only." };
    
    proj.azSubmitted = true;
    
    // Compliance Answers (28 answered, 14 unanswered)
    // Fills EU AI Act (9 answered)
    for (let i = 1; i <= 9; i++) {
        proj.complianceAnswers[`COMP-EU-${i}`] = { value: "pass", comment: "Compliant." };
    }
    proj.complianceAnswers["COMP-EU-1"] = { value: "pass", comment: "Classified as High-Risk under Annex III. Confirmed in Risk Assessment Report." };
    
    // NIST (9 answered)
    for (let i = 1; i <= 9; i++) {
        proj.complianceAnswers[`COMP-NST-${i}`] = { value: "pass", comment: "Compliant." };
    }
    
    // ISO 42001 (8 answered)
    for (let i = 1; i <= 8; i++) {
        proj.complianceAnswers[`COMP-ISO-${i}`] = { value: "pass", comment: "Compliant." };
    }
    
    // DPDP (2 answered)
    proj.complianceAnswers["COMP-DP-1"] = { value: "pass", comment: "Lawful processing." };
    proj.complianceAnswers["COMP-DP-2"] = { value: "pass", comment: "Consent obtained." };
    proj.complianceAnswers["COMP-DP-3"] = { value: "unanswered", comment: "No evidence of data subject rights implementation found in submitted documents." };
    
    // Compliance is submitted
    proj.complianceSubmitted = true;
    proj.status = "Reviewed";
    
    safeStorage.setItem("ey_projects", JSON.stringify([proj]));
    safeStorage.setItem("ey_current_user", JSON.stringify(ramesh));
    safeStorage.setItem("ey_active_view", "compliance-dashboard");
    safeStorage.setItem("ey_active_project_id", "84721");
    window.location.reload();
}

function updateDebugProjList() {
    const box = document.getElementById("debug-project-list");
    if (!box) return;
    if (!State.projects || State.projects.length === 0) {
        box.textContent = "No projects in database.";
        return;
    }
    let html = "";
    State.projects.forEach(p => {
        html += `<div style="margin-bottom:6px; border-bottom:1px dashed rgba(255,255,255,0.1); padding-bottom:4px; line-height:1.3;">
            ID: <b>${p.id}</b><br>
            Title: ${p.title ? p.title.substring(0, 25) + '...' : 'Untitled'}<br>
            Auditee: ${p.auditeeEmail || 'None'}<br>
            Auditor: ${p.auditorEmail || 'unassigned'}<br>
            Status: ${p.status}
        </div>`;
    });
    box.innerHTML = html;
}

// Notification Center Logic
function renderNotifications() {
    const listEl = document.getElementById("notification-list");
    const badgeEl = document.getElementById("notification-badge");
    if (!listEl || !badgeEl || !State.currentUser) return;
    
    const userNotifications = State.notifications.filter(n => n.receiverEmail === State.currentUser.email);
    const unreadCount = userNotifications.filter(n => n.status === "unread" || n.status === "pending").length;
    
    if (unreadCount > 0) {
        badgeEl.textContent = unreadCount;
        badgeEl.style.display = "inline-block";
    } else {
        badgeEl.style.display = "none";
    }
    
    if (userNotifications.length === 0) {
        listEl.innerHTML = `<div style="color: var(--text-muted); text-align: center; padding: 1.5rem 0;">No notifications</div>`;
        return;
    }
    
    let html = "";
    userNotifications.forEach(n => {
        const isUnread = n.status === "unread" || n.status === "pending";
        const bg = isUnread ? "rgba(255, 230, 0, 0.05)" : "transparent";
        const border = isUnread ? "1px solid var(--primary-glow)" : "1px solid rgba(255,255,255,0.05)";
        
        html += `
            <div style="padding: 0.6rem; background: ${bg}; border: ${border}; border-radius: 6px; display: flex; flex-direction: column; gap: 0.25rem; cursor: default;">
                <div style="font-weight: 600; color: var(--text-primary); line-height: 1.3;">${n.message}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.2rem;">
                    <span style="font-size: 0.65rem; color: var(--text-secondary);">${n.timestamp}</span>
                    ${n.type === "document_request" && n.status === "pending" && State.currentUser.role === "auditee" ? `
                        <button class="btn btn-primary btn-xs" onclick="uploadForRequest('${n.projectId}', '${n.id}')" style="padding: 0.15rem 0.35rem; font-size: 0.65rem; height: auto;">Upload</button>
                    ` : ""}
                </div>
            </div>
        `;
    });
    listEl.innerHTML = html;
}

function toggleNotificationPanel(event) {
    if (event) event.stopPropagation();
    const panel = document.getElementById("notification-panel");
    if (!panel) return;
    const isShowing = panel.style.display === "block";
    panel.style.display = isShowing ? "none" : "block";
    if (!isShowing) {
        renderNotifications();
    }
}

function markAllNotificationsRead(event) {
    if (event) event.stopPropagation();
    if (!State.currentUser) return;
    
    State.notifications = State.notifications.filter(n => n.receiverEmail !== State.currentUser.email);
    State.saveState();
    renderNotifications();
    showToast("Notifications cleared.", "success");
    
    const panel = document.getElementById("notification-panel");
    if (panel) panel.style.display = "none";
}

function uploadForRequest(projectId, notificationId) {
    State.activeProjectId = projectId;
    State.saveState();
    navigateTo("project-detail");
    const panel = document.getElementById("notification-panel");
    if (panel) panel.style.display = "none";
}

// Document Request Modal & Action Creators
function openRequestDocumentsModal() {
    const proj = State.getActiveProject();
    if (!proj) return;
    const msg = prompt(`Request additional evidence documents for "${proj.title}":`, `Please upload additional security logs and explainability mappings.`);
    if (msg === null) return; // user cancelled
    if (!msg.trim()) {
        showToast("Request message cannot be empty.", "error");
        return;
    }
    requestDocuments(proj.id, msg.trim());
}

function requestDocuments(projectId, message) {
    const proj = State.projects.find(p => p.id === projectId);
    if (!proj) return;
    
    // Add document request notification
    State.notifications.unshift({
        id: String(Math.floor(10000 + Math.random() * 90000)),
        projectId: proj.id,
        projectTitle: proj.title,
        senderEmail: State.currentUser.email,
        senderName: State.currentUser.fullname,
        receiverEmail: proj.auditeeEmail,
        message: `${State.currentUser.fullname} requested documents: "${message}"`,
        type: "document_request",
        status: "pending",
        timestamp: new Date().toISOString().substring(0, 16).replace('T', ' ')
    });
    
    State.saveState();
    showToast("Document request sent successfully.", "success");
    renderRoute();
}

// Project Details File Uploads
let detailSelectedFile = null;

function handleDetailFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
    detailSelectedFile = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB"
    };
    document.getElementById("detail-selected-filename").textContent = file.name;
}

function uploadDocumentToActiveProject() {
    const proj = State.getActiveProject();
    if (!proj) return;
    if (!detailSelectedFile) {
        showToast("Please choose a file to upload first.", "error");
        return;
    }
    
    const framework = document.getElementById("detail-upload-framework").value;
    
    const docObj = {
        name: detailSelectedFile.name,
        framework: framework,
        size: detailSelectedFile.size,
        timestamp: new Date().toISOString().substring(0, 16).replace('T', ' ')
    };
    proj.documents.push(docObj);
    
    // Resolve pending requests for this project
    const pendingReqs = State.notifications.filter(n => n.projectId === proj.id && n.receiverEmail === State.currentUser.email && n.type === "document_request" && n.status === "pending");
    pendingReqs.forEach(req => {
        req.status = "resolved";
    });
    
    // Notify the auditor (if assigned)
    if (proj.auditorEmail) {
        State.notifications.unshift({
            id: String(Math.floor(10000 + Math.random() * 90000)),
            projectId: proj.id,
            projectTitle: proj.title,
            senderEmail: State.currentUser.email,
            senderName: State.currentUser.fullname,
            receiverEmail: proj.auditorEmail,
            message: `${State.currentUser.fullname} has uploaded requested documents for: ${proj.title}`,
            type: "general",
            status: "unread",
            timestamp: new Date().toISOString().substring(0, 16).replace('T', ' ')
        });
    }
    
    State.saveState();
    showToast(`Successfully uploaded "${detailSelectedFile.name}" to project.`, "success");
    
    detailSelectedFile = null;
    document.getElementById("detail-selected-filename").textContent = "No file chosen";
    
    renderProjectDetailView();
}
