// Configuration for Locked Landing Page & Billing Details
const CONFIG = {
  project: {
    clientName: "Client Project",
    websiteDomain: "yourdomain.com",
    invoiceNumber: "INV-2026-0849",
    invoiceDate: "September 5, 2026",
    dueDate: "Immediate",
    status: "Suspended / Awaiting Settlement"
  },
  billing: {
    currencySymbol: "₹",
    currencyCode: "INR",
    currentPending: 6999,
    items: [
      {
        title: "Domain Registration (1 Year)",
        description: "Custom top-level domain registration & DNS routing setup",
        amount: 1000,
        status: "PAID",
        paidDate: "August 2026",
        note: "Settled by client"
      },
      {
        title: "Project Initiation Advance",
        description: "Initial deposit & project kickoff phase commitment",
        amount: 300,
        status: "PAID",
        paidDate: "August 2026",
        note: "Settled by client"
      },
      {
        title: "API Credit Tokens & AI Quota Allocation",
        description: "High-throughput API token package & developer license grant",
        amount: 15000,
        status: "DISCOUNTED",
        discountAmount: 15000,
        note: "₹15,000 Promotional Credit Token Subsidy Applied (-₹15,000)"
      },
      {
        title: "Cloud Hosting & Production API Integration",
        description: "High-availability cloud server deployment, SSL certificate & API endpoints",
        amount: 6999,
        status: "PENDING",
        note: "Awaiting final settlement"
      }
    ],
    summary: {
      grossTotal: 23299,
      promotionalCredit: 15000,
      netPayableBeforeCredits: 8299,
      alreadyPaidTotal: 1300, // 1000 domain + 300 advance
      finalOutstandingPending: 6999
    }
  },
  adminContact: {
    name: "System Administrator",
    phone: "+919734039294",
    phoneDisplay: "+91 97340 39294",
    whatsappNumber: "919734039294",
    responseTime: "Unlocks immediately upon payment verification"
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
