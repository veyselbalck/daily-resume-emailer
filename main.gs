/** Sends one personalized resume email per execution.
 * Configure the required IDs and contact fields in Project Settings > Script Properties.
 */
function sendOneResumeEmailPerDay() {
  const config = getEmailerConfig_();
  const sheet = SpreadsheetApp.openById(config.sheetId).getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  const attachments = [config.resumeFileId, config.portfolioFileId].filter(Boolean).map(id => DriveApp.getFileById(id).getAs(MimeType.PDF));
  for (let i = 1; i < rows.length; i++) {
    const recipient = rows[i][0];
    if (!recipient || rows[i][2] === "Yes") continue;
    const subject = `Computer Engineer Application | ${config.fullName}`;
    const plainBody = `Dear Hiring Team,\n\nI am a Computer Engineer interested in opportunities at your company. Please find my resume attached.\n\nKind regards,\n${config.fullName}\n${config.email}`;
    const htmlBody = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;max-width:640px"><p>Dear Hiring Team,</p><p>I am a Computer Engineer interested in opportunities at your company. During my studies, I worked on software projects and developed my technical and problem-solving skills.</p><p>Please consider my attached resume for current or future openings that match my experience. I would welcome the opportunity to speak with you.</p><p>Kind regards,<br><strong>${escapeHtml_(config.fullName)}</strong><br>${escapeHtml_(config.phone)}<br><a href="mailto:${escapeHtml_(config.email)}">${escapeHtml_(config.email)}</a><br>${config.linkedin ? `<a href="${escapeHtml_(config.linkedin)}">LinkedIn profile</a>` : ""}</p></div>`;
    try {
      GmailApp.sendEmail(recipient, subject, plainBody, {htmlBody, name: config.fullName, attachments});
      sheet.getRange(i + 1, 3).setValue("Yes");
      sheet.getRange(i + 1, 4).setValue(new Date());
      sheet.getRange(i + 1, 5).setValue("Sent");
    } catch (error) {
      sheet.getRange(i + 1, 5).setValue("Error");
      sheet.getRange(i + 1, 6).setValue(error.message);
    }
    break; // Process at most one recipient per execution.
  }
  SpreadsheetApp.flush();
}
function getEmailerConfig_() {
  const p = PropertiesService.getScriptProperties();
  const config = {sheetId:p.getProperty("SPREADSHEET_ID"),resumeFileId:p.getProperty("RESUME_PDF_FILE_ID"),portfolioFileId:p.getProperty("PORTFOLIO_PDF_FILE_ID"),fullName:p.getProperty("FULL_NAME"),phone:p.getProperty("PHONE") || "",email:p.getProperty("CONTACT_EMAIL"),linkedin:p.getProperty("LINKEDIN_URL") || ""};
  ["sheetId", "resumeFileId", "fullName", "email"].forEach(key => {if (!config[key]) throw new Error(`Missing required Script Property: ${key}`);});
  return config;
}
function escapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
}
