export interface KeyTerm {
  term: string;
  meaning: string;
}

export interface AnalysisResponse {
  simplified: string;
  risk_level: 'high' | 'medium' | 'low';
  risk_score: number;
  risk_reason: string;
  watch_out: string;
  who_affected: string;
  key_terms: KeyTerm[];
  improvements: string[];
  similar_clauses: string[];
}

export interface SavedAnalysis {
  id: string;
  clauseName: string;
  text: string;
  timestamp: string;
  result: AnalysisResponse;
}

export const TEMPLATES: Record<string, { label: string; icon: string; text: string; name: string }> = {
  indemnification: {
    label: "Indemnification Clause",
    icon: "⚖️",
    name: "Indemnification Clause",
    text: `The Service Provider shall defend, indemnify, and hold harmless the Client, its affiliates, directors, officers, and employees from and against any and all claims, liabilities, losses, damages, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to any third-party claim alleging that the Services or deliverables infringe any patent, copyright, trademark, or other proprietary right of a third party, or arising from the gross negligence or willful misconduct of the Service Provider. Furthermore, Client agrees to indemnify Service Provider for all liabilities without limit.`
  },
  noncompete: {
    label: "Non-Compete Agreement",
    icon: "🚫",
    name: "Non-Compete Agreement",
    text: `For a period of twenty-four (24) months following the termination of this Agreement for any reason, the Executive shall not, directly or indirectly, engage in, operate, manage, control, participate in, consult with, or be employed by any business, enterprise, or entity that directly competes with the core business operations of the Employer within a radius of fifty (50) miles from any office location of the Employer, without the express prior written consent of the Board of Directors.`
  },
  autorenewal: {
    label: "Auto Renewal Terms",
    icon: "🔄",
    name: "Auto Renewal Terms",
    text: `This Agreement shall automatically renew for successive terms of twelve (12) months each unless either party provides written notice of non-renewal to the other party at least ninety (90) days prior to the expiration of the then-current term. In the event of automatic renewal, the monthly subscription fees shall increase by fifteen percent (15%) over the rates applicable during the preceding subscription period, fully authorized without further notice.`
  },
  arbitration: {
    label: "Arbitration Clause",
    icon: "📊",
    name: "Arbitration Clause",
    text: `Any dispute, controversy, or claim arising out of or relating to this contract, including its formation, interpretation, performance, breach, or termination, shall be referred to and finally resolved by binding confidential arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules. The place of arbitration shall be Wilmington, Delaware. The proceedings shall be conducted by a single arbitrator, and both parties hereby waive any right to a trial by jury or participation in class-actions.`
  },
  dataprivacy: {
    label: "Data Privacy Terms",
    icon: "🔐",
    name: "Data Privacy Terms",
    text: `The Processor shall implement and maintain appropriate technical and organizational measures to safeguard user personal data. However, the Processor and its affiliates disclaim any and all absolute liability for unauthorized data access, security breaches, or server hacks occurring outside our immediate digital perimeter. By agreeing, the User acknowledges that data transmission over the internet carries inherent risks and waives any claim for consequential damages arising from security breaches.`
  },
  termination: {
    label: "Termination Clause",
    icon: "📋",
    name: "Termination Clause",
    text: `Employer may terminate this Agreement immediately 'for cause' upon written notice. 'For Cause' includes, but is not limited to, material breach of policy, insubordination, or neglect of duty. The Executive may only terminate this Agreement upon ninety (90) days prior written notice. In the event of termination by Executive, all outstanding stock options, accrued bonuses, and earned commissions shall be immediately forfeited back to the Company treasury.`
  },
  payment: {
    label: "Payment Terms",
    icon: "💰",
    name: "Payment Terms",
    text: `Client shall pay all invoices within fifteen (15) calendar days of receipt. Any amount remaining unpaid past the due date shall accumulate interest at a rate of one and a half percent (1.5%) per month, compounded weekly, or the maximum rate permitted by law, whichever is higher, in addition to collection costs and legal fees. Service Provider reserves the right to suspend or disable all system access immediately without notice if any payment is overdue.`
  },
  liability: {
    label: "Liability Waiver",
    icon: "🤝",
    name: "Liability Waiver",
    text: `The Participant hereby full-releases, waives, and discharges the Organizer from any and all liability, claims, demands, or causes of action arising out of or related to any loss, damage, personal injury, or death that may be sustained by the Participant while participating in the sponsored activities, whether caused by the active or passive negligence of the Organizer or otherwise. Participant assumes all associated physical and legal risks.`
  }
};

export const simulateAnalysis = (text: string): AnalysisResponse => {
  const norm = text.toLowerCase();

  if (norm.includes("indemnif") || norm.includes("hold harmless") || norm.includes("protect from loss")) {
    return {
      simplified: "This clause states that one party must cover the costs and legal fees of the other if third-party lawsuits arise (e.g., copyright infringement). It also includes a mutual indemnification which appears fair but has a sneaky unlimited clause.",
      risk_level: "medium",
      risk_score: 6,
      risk_reason: "Contains one-sided liabilities and forces you to indemnify the other party without an explicit dollar cap.",
      watch_out: "The clause 'Client agrees to indemnify Service Provider for all liabilities without limit' exposes you to uncapped financial damage.",
      who_affected: "The Client is most affected because they are taking on unbounded secondary liability for third-party claims.",
      key_terms: [
        { term: "Indemnify", meaning: "To compensate or secure another party against legal liability, loss, or damages." },
        { term: "Hold Harmless", meaning: "An agreement where one party promises not to hold the other party responsible for legal liabilities." },
        { term: "Attorneys' fees", meaning: "Charges billed by a lawyer for legal services, which you might have to pay for both sides." }
      ],
      similar_clauses: [
        "Uncapped Liability limits",
        "Third-party Intellectual Property Infringement guarantees"
      ],
      improvements: [
        "Add a maximum liability cap equal to the double of fees paid.",
        "Request mutual obligations rather than one-sided protection.",
        "Add an exception for claims arising from gross negligence."
      ]
    };
  }

  if (norm.includes("compete") || norm.includes("solicit") || norm.includes("geographical radius")) {
    return {
      simplified: "This clause blocks you from working for any competitor or launching a similar business within a 50-mile radius for two full years after leaving the company.",
      risk_level: "high",
      risk_score: 9,
      risk_reason: "Super long post-employment duration (24 months) and wide geographical restriction heavily limits future employment.",
      watch_out: "A 24-month restriction is extremely punitive for general terms. Courst favor shorter spans (e.g., 6 months).",
      who_affected: "The Executive / Employee is locked out of their primary field of expertise in their local area.",
      key_terms: [
        { term: "Non-Compete", meaning: "An agreement where an employee agrees not to join or start a competing company after leaving." },
        { term: "Geographical Radius", meaning: "The physical outline (e.g., 50 miles) within which you are forbidden to find work." },
        { term: "Indirectly compete", meaning: "A broad term that can prevent you from consulting or even owning shares in a competitor." }
      ],
      similar_clauses: [
        "Non-solicitation of clients & staff",
        "Intellectual property assignment clauses"
      ],
      improvements: [
        "Request reduction of period from 24 months to 6 months.",
        "Limit the geographical area strictly to primary office locations.",
        "Add a clause allowing you to consult for non-competing departments."
      ]
    };
  }

  if (norm.includes("renew") || norm.includes("successive terms") || norm.includes("fees shall increase")) {
    return {
      simplified: "The contract will roll over and bind you to another full year automatically unless you write an opt-out letter exactly 90 days before it ends. Plus, the price shoots up by 15% automatically.",
      risk_level: "high",
      risk_score: 8,
      risk_reason: "High automatic renewal price jump (15%) and a very long 90-day cancellation notice window.",
      watch_out: "Missing the 90-day window binds you to another full cycle at a much higher price point.",
      who_affected: "The Client/Subscriber is of primary concern as they ofttimes forget written warning dates.",
      key_terms: [
        { term: "Auto Renewal", meaning: "A contract condition where the contract rolls over into a subsequent term without manual signatures." },
        { term: "90-days prior notice", meaning: "You must notify them at least 3 months in advance to stop the auto-renew." },
        { term: "Fee Escalation", meaning: "Authorized auto-increases in service fees at the start of renewal." }
      ],
      similar_clauses: [
        "Evergreen contract extensions",
        "Price adjustments in SaaS provisions"
      ],
      improvements: [
        "Change the non-renewal notice requirement from 90 days to a standard 30 days.",
        "Add a requirement that the provider must email a notice 30 days before renewal.",
        "Negotiate a maximum price increase of 3-5% based on standard inflation indices."
      ]
    };
  }

  if (norm.includes("arbitrat") || norm.includes("dispute") || norm.includes("jury") || norm.includes("confidential")) {
    return {
      simplified: "If either party has a dispute, it cannot go to public court or a jury. It will be decided in private by a single hired arbitrator, with no class action participation allowed.",
      risk_level: "medium",
      risk_score: 5,
      risk_reason: "Forces confidential binding out-of-court arbitration and strips away the right to join class-actions or visual juries.",
      watch_out: "The binding waiver means there are virtually no appeal paths if the hired arbitrator makes a mistake.",
      who_affected: "The Client / weaker negotiating party loses their public constitutional court rights.",
      key_terms: [
        { term: "Confidential Arbitration", meaning: "Private resolutions held in secret boardrooms instead of public courthouses." },
        { term: "Jury Waiver", meaning: "Giving up the standard civil right to have your case decided by peers." },
        { term: "Class Action Waiver", meaning: "An agreement where you promise never to sue collectively with other affected users." }
      ],
      similar_clauses: [
        "Governing Law and Forum structures",
        "Alternative Dispute Resolution rules"
      ],
      improvements: [
        "Ensure arbitration cost is split equally or borne by the losing party.",
        "Specify that arbitration can be done remotely rather than Delaware.",
        "Retain the right to pursue small claims court in your local county."
      ]
    };
  }

  if (norm.includes("privacy") || norm.includes("data") || norm.includes("hacks") || norm.includes("processor")) {
    return {
      simplified: "The service provider promises to follow basic safety measures but takes zero responsibility if a hacker steals your sensitive data, and forbids you from seeking any financial compensation.",
      risk_level: "high",
      risk_score: 8,
      risk_reason: "Complete disclaimer of liability for leaks, alongside a sweeping waiver of consequential damages.",
      watch_out: "The phrase 'disclaim any and all absolute liability' lets them off the hook even if they were careless with your passwords.",
      who_affected: "The User/End-Customer is severely exposed since their private records are unprotected from legal fallback.",
      key_terms: [
        { term: "Data Processor", meaning: "The entity that performs storage or processing on behalf of the information owner." },
        { term: "Consequential Damages", meaning: "Indirect financial harms (e.g., lost business sales) caused by a data breach." },
        { term: "Liability Disclaimer", meaning: "A legal shield written to protect a company from being sued for negligence." }
      ],
      similar_clauses: [
        "Data Protection Addendum (DPA)",
        "Limitation of Actions"
      ],
      improvements: [
        "Add a requirement that they notify you within 24 hours of any security incident.",
        "Insist that their disclaimer does not apply to gross negligence or violations of GDPR/CCPA.",
        "Seek a modest carveout liability cap of at least 12 months of service values."
      ]
    };
  }

  if (norm.includes("terminate") || norm.includes("for cause") || norm.includes("forfeit")) {
    return {
      simplified: "The company can fire or drop you instantly for vague reasons (vague policy breaches or neglect), but you must give them 90 days notice. If you quit, you lose all your stock options and bonuses immediately.",
      risk_level: "high",
      risk_score: 8,
      risk_reason: "Unequal notice periods (immediate vs. 90 days) and aggressive forfeiture of stock or earned commission.",
      watch_out: "Forfeiting earned commissions and stock options after you offer resignation is a huge financial trap.",
      who_affected: "The Executive / Employee loses their equity and earned compensation on departure.",
      key_terms: [
        { term: "For Cause", meaning: "Termination based on a specific, justifiable wrongdoing without needing severance payout." },
        { term: "Forfeiture", meaning: "Being forced to give up property, stock, or earned bonuses as a penalty for quiting." },
        { term: "Notice Period", meaning: "The required advance window you have to give the other party before parting ways." }
      ],
      similar_clauses: [
        "Severance Packages",
        "Clawback provisions"
      ],
      improvements: [
        "Make notice periods equal: 30 days for both parties.",
        "Narrow down 'For Cause' strictly to felony convictions or grand theft.",
        "Strike the forfeiture clause for already vested options or earned commission."
      ]
    };
  }

  if (norm.includes("payment") || norm.includes("invoice") || norm.includes("interest") || norm.includes("unpaid")) {
    return {
      simplified: "You must pay within 15 days, which is very quick. If your payment is late by even a day, they charge ultra-high compounded weekly interest, and can shut down your account immediately without warning.",
      risk_level: "medium",
      risk_score: 6,
      risk_reason: "Short payment window (15 days), aggressive weekly compounding interest, and instant account cutoff rights.",
      watch_out: "Overdue payments can lead to service outages with no notice, crippling your operations.",
      who_affected: "The Client is affected as their business relies on service availability.",
      key_terms: [
        { term: "Invoices", meaning: "Billed charge sheets describing fees to be paid for products or services." },
        { term: "Compounded Weekly", meaning: "Interest is calculated on the principal AND the accrued interest every 7 days." },
        { term: "Suspension", meaning: "Shutting down access to the software, website, or server dashboard." }
      ],
      similar_clauses: [
        "Interest rate cap limits",
        "Service Level Agreements (SLAs)"
      ],
      improvements: [
        "Negotiate a standard Net-30 payment term.",
        "Cap the late interest to standard flat non-compounded annual interest lines (e.g. 5-8% flat).",
        "Require a 10-day formal cure notice before any system or account shutdown can occur."
      ]
    };
  }

  if (norm.includes("waiver") || norm.includes("release") || norm.includes("negligence") || norm.includes("injury")) {
    return {
      simplified: "You agree that if you are injured, suffer damages, or even lose your life, you waive all rights to sue the organizers, even if their own staff were careless or negligent.",
      risk_level: "high",
      risk_score: 9,
      risk_reason: "Extremely broad waiver of liability covering personal injury, property loss, and even death caused by negligence.",
      watch_out: "Waiving liability for active negligence of the organizer's staff releases them from all accountability.",
      who_affected: "The Participant signs away their fundamental legal recourse to sue for careless environments.",
      key_terms: [
        { term: "Liability Waiver", meaning: "A disclaimer contract which blocks participants from suing organizers for injuries." },
        { term: "Active Negligence", meaning: "Careless actions directly committed by an organizer's staff or agents." },
        { term: "Physical Risk", meaning: "Somatic dangers associated with taking part in sporting, physical, or outdoor events." }
      ],
      similar_clauses: [
        "Assumption of Risk forms",
        "Medical authorization agreements"
      ],
      improvements: [
        "Strike the waiver of active negligence, leaving only passive/inherent activity risks.",
        "Request that the organizer carries liability insurance that covers participant accidents.",
        "Add an exception for injury caused by equipment malfunction or bad safety maintenance."
      ]
    };
  }

  // Default fallback for general custom text
  return {
    simplified: "This clause outlines terms regarding operational policies, rights, obligations, or dispute rules. It contains several clauses that limit liability or define strict performance timelines.",
    risk_level: "medium",
    risk_score: 5,
    risk_reason: "Standard terms with standard risks. Regular review and standard caps on damages are recommended.",
    watch_out: "Highly generic wording may mask specific duties or bind you to rules not explicitly listed.",
    who_affected: "Both signatories are bound to the stated dispute resolution rules and timelines.",
    key_terms: [
      { term: "Operational policies", meaning: "The set of administrative rules used to direct daily company behavior." },
      { term: "Standard Terms", meaning: "Routine boilerplate conditions that are ofttimes accepted without reading." },
      { term: "Performance Timelines", meaning: "The schedule by which a supplier must complete promised deliveries." }
    ],
    similar_clauses: [
      "Standard Boilerplate clauses",
      "Miscellaneous governing conditions"
    ],
    improvements: [
      "Ask for a mutual termination for convenience clause with 30 days notice.",
      "Add a standard liability cap of the last 12 months fees paid.",
      "Consult with a licensed attorney for custom context evaluation."
    ]
  };
};
