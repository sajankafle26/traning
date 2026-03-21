import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (order: any, userName: string) => {
    const doc = new jsPDF();

    // --- Header ---
    doc.setFillColor(2, 6, 23); // Slate-950
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SANGALO TECH", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Professional IT Training Institute", 20, 32);
    
    doc.setFontSize(18);
    doc.text("INVOICE", 150, 25);

    // --- Order Info ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text("Invoice To:", 20, 55);
    doc.setFont("helvetica", "bold");
    doc.text(userName, 20, 62);
    doc.setFont("helvetica", "normal");
    
    doc.text(`Order ID: #${order._id.substring(0, 8)}`, 130, 55);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 130, 62);
    doc.text(`Status: ${order.status.toUpperCase()}`, 130, 69);
    doc.text(`Payment: ${order.paymentMethod.toUpperCase()}`, 130, 76);

    // --- Table ---
    const tableColumn = ["Description", "Quantity", "Price", "Total"];
    const tableRows = (order.items || []).map((item: any) => [
        item.courseTitle || order.courseTitle,
        "1",
        `Rs. ${item.price?.toLocaleString() || order.amount?.toLocaleString()}`,
        `Rs. ${item.price?.toLocaleString() || order.amount?.toLocaleString()}`
    ]);

    autoTable(doc, {
        startY: 85,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [79, 70, 229] }, // Indigo-600
        styles: { fontSize: 9 }
    });

    // --- Summary ---
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: Rs. ${order.amount.toLocaleString()}`, 140, finalY);

    // --- Footer ---
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing Sangalo Tech for your learning journey.", 105, 280, { align: "center" });
    doc.text("Kathmandu, Nepal | www.sangalotech.com.np", 105, 285, { align: "center" });

    // Save PDF
    doc.save(`Invoice_${order._id.substring(0, 8)}.pdf`);
};
