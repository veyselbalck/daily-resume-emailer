# Daily Resume Emailer

A Google Apps Script that reads recipients from a Google Sheet and sends one resume email per execution. It records the send status and timestamp in the sheet.

## Requirements

- A Google account with access to Apps Script, Gmail, Google Sheets, and Google Drive.
- A spreadsheet with recipient email addresses in column A, a header in row 1, and the send marker in column C. The script writes the timestamp to column D, result to column E, and error details to column F.
- A PDF resume in Google Drive. An optional second PDF can be attached as a portfolio or additional resume.

## Setup

1. Create or open an Apps Script project and add `main.gs` (or create a standalone project and paste the file contents).
2. In **Project Settings > Script Properties**, add:

   | Property | Value |
   | --- | --- |
   | `SPREADSHEET_ID` | ID from the spreadsheet URL |
   | `RESUME_PDF_FILE_ID` | Google Drive file ID for the resume PDF |
   | `PORTFOLIO_PDF_FILE_ID` | Optional second PDF file ID |
   | `FULL_NAME` | Your preferred sender name |
   | `CONTACT_EMAIL` | Contact email shown in the message |
   | `PHONE` | Optional phone number |
   | `LINKEDIN_URL` | Optional profile URL |

3. Run `sendOneResumeEmailPerDay` manually once and approve the requested Google permissions.
4. To automate it, add a time-driven trigger for `sendOneResumeEmailPerDay` (for example, once daily).

## Important behavior

The function skips rows where column C contains `Yes`, sends at most one message in each execution, and stops after processing the first eligible row. Review recipient addresses and message content before enabling an automatic trigger. Gmail sending quotas apply.

## Privacy

Do not commit personal contact details, spreadsheet IDs, Drive file IDs, or recipient lists. Configure them in Script Properties and keep private data out of the repository.


---

## Türkçe

Google E-Tablolar'daki alıcı listesini okuyup her çalıştırılışta bir özgeçmiş e-postası gönderen bir Google Apps Script projesidir. Gönderim durumunu ve zamanı tabloya kaydeder.

### Gereksinimler

- Apps Script, Gmail, Google E-Tablolar ve Google Drive erişimi olan bir Google hesabı.
- A sütununda alıcı e-postaları, ilk satırda başlık ve C sütununda gönderim işareti bulunan bir tablo. Betik zamanı D, sonucu E ve hata ayrıntılarını F sütununa yazar.
- Drive'da bir PDF özgeçmiş. İsteğe bağlı ikinci PDF portföy veya ek özgeçmiş olarak eklenebilir.

### Kurulum

1. Bir Apps Script projesi oluşturun veya açın ve `main.gs` dosyasını ekleyin. Alternatif olarak bağımsız bir proje oluşturup dosya içeriğini yapıştırın.
2. **Proje Ayarları > Komut Dosyası Özellikleri** bölümüne şu değerleri ekleyin:

   | Özellik | Değer |
   | --- | --- |
   | `SPREADSHEET_ID` | E-tablo URL'sindeki kimlik |
   | `RESUME_PDF_FILE_ID` | Özgeçmiş PDF'inin Drive dosya kimliği |
   | `PORTFOLIO_PDF_FILE_ID` | İsteğe bağlı ikinci PDF dosya kimliği |
   | `FULL_NAME` | Gönderen adınız |
   | `CONTACT_EMAIL` | E-posta metninde görünecek adres |
   | `PHONE` | İsteğe bağlı telefon |
   | `LINKEDIN_URL` | İsteğe bağlı profil bağlantısı |

3. `sendOneResumeEmailPerDay` işlevini elle bir kez çalıştırıp Google izinlerini onaylayın.
4. Otomasyon için aynı işleve zamana dayalı tetikleyici ekleyin (örneğin günde bir kez).

### Önemli çalışma biçimi

Betik, C sütununda `Yes` bulunan satırları atlar ve her çalıştırmada en fazla bir e-posta gönderir. Otomatik tetikleyiciyi etkinleştirmeden önce alıcıları ve iletiyi gözden geçirin. Gmail gönderim kotaları geçerlidir.

### Gizlilik

Kişisel iletişim bilgilerini, e-tablo ve Drive kimliklerini ya da alıcı listelerini GitHub'a yüklemeyin. Bunları Komut Dosyası Özellikleri'nde saklayın.