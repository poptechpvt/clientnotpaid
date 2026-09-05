// Interactive Logic for Locked Landing Page
document.addEventListener('DOMContentLoaded', () => {
  // Use global CONFIG from config.js or fallback defaults
  const cfg = window.CONFIG || {
    project: {
      invoiceNumber: "INV-2026-0849"
    },
    billing: {
      currentPending: 6999
    },
    adminContact: {
      phone: "+919734039294",
      phoneDisplay: "+91 97340 39294",
      whatsappNumber: "919734039294"
    }
  };

  // Populate dynamic DOM elements if config differs
  const invoiceNumberEl = document.getElementById('invoiceNumber');
  if (invoiceNumberEl && cfg.project && cfg.project.invoiceNumber) {
    invoiceNumberEl.textContent = `Ref: ${cfg.project.invoiceNumber}`;
  }

  const phoneBtn = document.getElementById('phoneBtn');
  const phoneDisplay = document.getElementById('phoneDisplay');
  if (phoneBtn && phoneDisplay && cfg.adminContact) {
    phoneBtn.href = `tel:${cfg.adminContact.phone}`;
    phoneDisplay.textContent = cfg.adminContact.phoneDisplay || cfg.adminContact.phone;
  }

  const emailBtn = document.getElementById('emailBtn');
  const emailDisplay = document.getElementById('emailDisplay');
  if (emailBtn && emailDisplay && cfg.adminContact) {
    const subject = encodeURIComponent(`[Invoice ${cfg.project.invoiceNumber}] Settlement & Platform Unlock Request`);
    emailBtn.href = `mailto:${cfg.adminContact.email}?subject=${subject}`;
    emailDisplay.textContent = cfg.adminContact.email;
  }

  const upiIdText = document.getElementById('upiIdText');
  if (upiIdText && cfg.adminContact && cfg.adminContact.upiId) {
    upiIdText.textContent = cfg.adminContact.upiId;
  }

  // Pre-configured WhatsApp Link
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn && cfg.adminContact && cfg.adminContact.whatsappNumber) {
    const defaultMsg = encodeURIComponent(
      `Hello Admin, I am reaching out regarding invoice #${cfg.project.invoiceNumber}.\n` +
      `I would like to settle the outstanding balance of ₹${cfg.billing.currentPending} to immediately unlock and reactivate our website.\n` +
      `Please confirm the payment details.`
    );
    whatsappBtn.href = `https://wa.me/${cfg.adminContact.whatsappNumber}?text=${defaultMsg}`;
  }

  // UPI Copy to Clipboard
  const copyUpiBtn = document.getElementById('copyUpiBtn');
  const copyText = document.getElementById('copyText');
  if (copyUpiBtn) {
    copyUpiBtn.addEventListener('click', async () => {
      const upiId = (upiIdText ? upiIdText.textContent : 'payadmin@upi').trim();
      try {
        await navigator.clipboard.writeText(upiId);
        showToast(`UPI ID "${upiId}" copied!`);
        if (copyText) {
          copyText.textContent = 'Copied!';
          setTimeout(() => {
            copyText.textContent = 'Copy';
          }, 2000);
        }
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = upiId;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`UPI ID copied to clipboard!`);
      }
    });
  }

  // Print Invoice Button
  const printInvoiceBtn = document.getElementById('printInvoiceBtn');
  if (printInvoiceBtn) {
    printInvoiceBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Modal Management
  const confirmModal = document.getElementById('confirmModal');
  const openConfirmModalBtn = document.getElementById('openConfirmModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const paymentNotifyForm = document.getElementById('paymentNotifyForm');

  function openModal() {
    if (confirmModal) {
      confirmModal.classList.add('active');
      confirmModal.setAttribute('aria-hidden', 'false');
      const firstInput = document.getElementById('payerName');
      if (firstInput) firstInput.focus();
    }
  }

  function closeModal() {
    if (confirmModal) {
      confirmModal.classList.remove('active');
      confirmModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (openConfirmModalBtn) {
    openConfirmModalBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (confirmModal) {
    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && confirmModal && confirmModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submission -> Send formatted WhatsApp message
  if (paymentNotifyForm) {
    paymentNotifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const payerName = document.getElementById('payerName').value.trim();
      const utrNumber = document.getElementById('utrNumber').value.trim();
      const amount = (cfg.billing && cfg.billing.currentPending) ? `₹${cfg.billing.currentPending}` : '₹6,999';

      const waMsg = encodeURIComponent(
        `*PAYMENT SETTLEMENT NOTIFICATION*\n` +
        `------------------------------------\n` +
        `*Invoice Ref:* ${cfg.project.invoiceNumber}\n` +
        `*Name / Org:* ${payerName}\n` +
        `*Amount Paid:* ${amount}\n` +
        `*UTR / Ref No:* ${utrNumber}\n` +
        `------------------------------------\n` +
        `Please verify the transaction and unlock website access. Thank you!`
      );

      const targetWaUrl = `https://wa.me/${cfg.adminContact.whatsappNumber}?text=${waMsg}`;
      
      closeModal();
      showToast('Redirecting to WhatsApp to send payment proof...');
      
      setTimeout(() => {
        window.open(targetWaUrl, '_blank');
      }, 600);
    });
  }

  // Animated Pending Amount Counter
  const pendingDisplayEl = document.getElementById('currentPendingDisplay');
  if (pendingDisplayEl) {
    const targetAmount = (cfg.billing && cfg.billing.currentPending) ? cfg.billing.currentPending : 6999;
    animateCount(pendingDisplayEl, 0, targetAmount, 1100);
  }

  function animateCount(el, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.floor(ease * (end - start) + start);
      el.textContent = currentVal.toLocaleString('en-IN');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = end.toLocaleString('en-IN');
        el.classList.add('count-finished');
      }
    };
    window.requestAnimationFrame(step);
  }

  // Interactive ripple effect for buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;
      const rect = btn.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('btn-ripple');

      const ripple = btn.getElementsByClassName('btn-ripple')[0];
      if (ripple) ripple.remove();
      btn.appendChild(circle);
    });
  });

  // Toast Functionality
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast) return;

    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
