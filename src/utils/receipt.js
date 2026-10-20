
import { jsPDF } from "jspdf";

const formatCurrency = (amount) => {
  const value = Number(amount ?? 0);

  return `KSh ${
    Number.isFinite(value)
      ? value.toLocaleString("en-KE")
      : "0"
  }`;
};

const formatDate = (value) => {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const displayValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return String(value);
};

export function downloadBookingReceipt(booking) {
  if (!booking || typeof booking !== "object") {
    throw new Error("Booking details are unavailable.");
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const ensureSpace = (requiredHeight = 12) => {
    if (y + requiredHeight > pageHeight - 18) {
      pdf.addPage();
      y = 20;
    }
  };

  const addSectionTitle = (title) => {
    ensureSpace(16);

    y += 3;

    pdf.setFillColor(235, 242, 252);
    pdf.roundedRect(
      margin,
      y - 5,
      contentWidth,
      9,
      2,
      2,
      "F"
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(26, 54, 93);
    pdf.text(title, margin + 3, y + 1);

    y += 11;
  };

  const addRow = (label, value) => {
    const safeValue = displayValue(value);
    const valueLines = pdf.splitTextToSize(
      safeValue,
      contentWidth - 52
    );

    const rowHeight = Math.max(6, valueLines.length * 4.5);

    ensureSpace(rowHeight + 2);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(80, 90, 105);
    pdf.text(label, margin + 1, y);

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(35, 45, 60);
    pdf.text(valueLines, margin + 52, y);

    y += rowHeight;

    pdf.setDrawColor(230, 234, 240);
    pdf.line(margin, y - 1, pageWidth - margin, y - 1);
  };

  // Receipt header
  pdf.setFillColor(26, 54, 93);
  pdf.rect(0, 0, pageWidth, 43, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text("MCS WAYBILL HUB", margin, 17);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text("COURIER BOOKING RECEIPT", margin, 25);

  pdf.setFontSize(9);
  pdf.text(
    `Generated: ${new Date().toLocaleString("en-KE")}`,
    margin,
    34
  );

  y = 54;

  // Waybill number
  pdf.setFillColor(240, 247, 255);
  pdf.roundedRect(
    margin,
    y - 5,
    contentWidth,
    20,
    3,
    3,
    "F"
  );

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(80, 90, 105);
  pdf.text("WAYBILL NUMBER", margin + 4, y + 1);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(26, 54, 93);
  pdf.text(
    displayValue(booking.bookingNumber || booking._id),
    margin + 4,
    y + 10
  );

  y += 23;

  addSectionTitle("SENDER DETAILS");
  addRow("Full name", booking.senderName);
  addRow("Phone", booking.senderPhone);
  addRow("Email", booking.senderEmail);
  addRow("ID number", booking.senderId);

  addSectionTitle("RECIPIENT DETAILS");
  addRow("Full name", booking.recipientName);
  addRow("Phone", booking.recipientPhone);
  addRow("ID number", booking.recipientId);

  addSectionTitle("PARCEL AND ROUTE");
  addRow("Pickup address", booking.pickupAddress || booking.pickup);
  addRow("Destination", booking.destination);
  addRow("Parcel type", booking.parcelType);
  addRow("Weight", booking.weight);
  addRow("Description", booking.description);

  addSectionTitle("PICKUP SCHEDULE");
  addRow("Pickup date", formatDate(booking.pickupDate));
  addRow("Pickup time", booking.pickupTime);
  addRow("Additional notes", booking.notes);

  addSectionTitle("PAYMENT DETAILS");
  addRow("Payment method", booking.paymentMethod || "M-Pesa");
  addRow("Payment status", booking.paymentStatus || "Unpaid");

  ensureSpace(24);

  y += 3;

  pdf.setFillColor(26, 54, 93);
  pdf.roundedRect(
    margin,
    y - 4,
    contentWidth,
    15,
    2,
    2,
    "F"
  );

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(255, 255, 255);

  pdf.text("DELIVERY FEE", margin + 4, y + 5);

  pdf.text(
    formatCurrency(booking.deliveryFee),
    pageWidth - margin - 4,
    y + 5,
    { align: "right" }
  );

  y += 22;

  ensureSpace(15);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(90, 100, 115);

  const footer = pdf.splitTextToSize(
    "Thank you for choosing MCS Waybill Hub. Please keep this receipt for your records. This receipt confirms your booking, not payment. Payment is confirmed only when the payment status indicates it.",
    contentWidth
  );

  pdf.text(footer, margin, y);

  const safeWaybill = String(
    booking.bookingNumber || booking._id || "booking"
  ).replace(/[^a-zA-Z0-9_-]/g, "_");

  pdf.save(`MCS-Receipt-${safeWaybill}.pdf`);
}
