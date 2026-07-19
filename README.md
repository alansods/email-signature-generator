# Email Signature Generator

<img width="2955" height="1409" alt="image" src="https://github.com/user-attachments/assets/e6fba259-3b0f-4b58-aa36-b33c58dced90" />

A modern and intuitive web application to create professional, customized email signatures ready to use in Gmail, Outlook, and other email clients.

## 🎯 About the Project

The **Email Signature Generator** is a tool that simplifies the creation of professional email signatures. With a user-friendly interface and smart features, you can create custom signatures in seconds without needing to know HTML or design.

## ✨ Features

### Intuitive Form
- **Professional Details**: Fill in name, title, email, phone, and company
- **Logo Upload**: Drag and drop or select your company logo (up to 2MB)
- **Automatic Color Detection**: The system automatically extracts the dominant color from your logo to harmonize the signature
- **Smart Validation**:
  - Email format validation with immediate feedback
  - Phone number validation that adapts to your language (PT-BR or EN)
  - Required field checking before export
  - Clear, descriptive error messages
- **Automatic Phone Formatting**:
  - Phone numbers are formatted as you type
  - PT-BR format: `(11) 91234-5678`
  - EN format: `(555) 123-4567`
  - Automatically reformats when you switch languages

### Professional Templates
Choose from 3 signature styles:

- **Classic**: Traditional layout with logo, vertical divider, and organized information
- **Compact**: Stacked design, ideal for saving vertical space in emails
- **Colored Divider**: Colored sidebar that highlights your brand

### Versatile Export
- **Copy to Clipboard**: Copies formatted HTML + plain text, ready to paste in Gmail/Outlook
- **Download as Image**: Export signature as high-quality PNG (2x resolution)
- **Real-time Preview**: See changes instantly as you edit

### Internationalization (i18n)
- **Multi-language Support**: Full interface available in English (US) and Portuguese (Brazil)
- **Language Switcher**: Toggle between languages with flag buttons (🇺🇸 EN / 🇧🇷 PT) in the top-right corner
- **Persistent Preference**: Language choice is saved to localStorage and remembered between sessions
- **Localized Placeholders**: All example data adapts to the selected language
- **Complete Translation**: All UI labels, error messages, and toast notifications are translated
- **Smart Validation**: Phone number format validation adapts automatically to your selected language
- **Auto-reformatting**: Phone numbers automatically reformat when you switch languages

## 🚀 Benefits

- **No Technical Knowledge Required**: Simple visual interface - no HTML knowledge needed
- **Professional Consistency**: Ensures everyone in the company has standardized signatures
- **Time Saving**: Create signatures in seconds, not hours
- **Full Compatibility**: Works with Gmail, Outlook, Apple Mail, and other email clients
- **Automatic Branding**: Color detection ensures your signature uses your brand colors
- **Responsive**: Interface adapted for desktop and mobile devices
- **100% Client-Side**: Your data is not sent to any server - everything happens in the browser
- **Smart Forms**: Automatic phone masking and intelligent validation prevent errors
- **Polished UX**: Hover effects, cursor feedback, success messages in green, and clear error states

## 🛠️ Technologies Used

- **React 19** - Modern and performant UI library
- **TypeScript** - Static typing for safer code
- **Vite** - Fast build tool with HMR (Hot Module Replacement)
- **Tailwind CSS 4** - Utility-first CSS framework
- **react-i18next** - Internationalization framework for React
- **i18next** - Core internationalization library with browser language detection
- **html2canvas** - HTML to image conversion
- **Canvas API** - Intelligent color extraction
- **Clipboard API** - Formatted content copying

## 📦 Getting Started (Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Enter the project folder
cd "Gerador de assinaturas de email"

# Install dependencies
npm install
```

### Available Commands

```bash
# Start development server
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 💡 How to Use (End User)

1. **Choose your language**: Click 🇺🇸 EN or 🇧🇷 PT in the top-right corner
2. **Fill in your details**:
   - Name, title, email (must be valid format), phone (auto-formats as you type), and company
   - All fields are required and will show validation errors if incorrect
3. **Upload your logo**:
   - Click or drag your company logo (PNG, JPG, SVG, WEBP up to 2MB)
   - The system will automatically detect the dominant color from your logo
4. **Choose a template**:
   - Select from Classic, Compact, or Colored Divider in the preview header
   - Preview updates in real-time
5. **Copy the signature**:
   - Click "Copy signature" and paste in your email client
   - **Gmail**: Settings → Signature → Paste
   - **Outlook**: File → Options → Mail → Signatures → Paste
   - Green success message confirms the copy
6. **Or download as image**: Use the "Download as image" option to get a high-quality PNG version

## 🎨 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── LanguageSwitcher.tsx # Language toggle component
│   ├── LogoUpload.tsx  # Logo upload with drag-and-drop
│   ├── SignatureForm.tsx    # Data form
│   ├── SignaturePreview.tsx # Preview and export
│   └── TemplateSelector.tsx # Template selector
├── hooks/
│   └── useSignature.ts # State management hook
├── i18n/
│   ├── index.ts        # i18next configuration
│   └── locales/        # Translation files
│       ├── en.json     # English (US) translations
│       └── pt-BR.json  # Portuguese (Brazil) translations
├── lib/
│   ├── colorExtractor.ts    # Dominant color extraction
│   ├── signatureBuilder.ts  # HTML/text generation
│   └── utils.ts            # Utilities
└── types/
    └── signature.ts    # TypeScript definitions

```

## ✅ Form Validation & UX

### Smart Input Validation
- **Email**: Validates format (e.g., `user@domain.com`) with regex pattern
- **Phone**:
  - PT-BR: Accepts `(11) 91234-5678` or `(11) 1234-5678` formats
  - EN: Accepts `(555) 123-4567` format
  - Validation adapts automatically to selected language
- **Required Fields**: All fields except logo become required before export
- **Real-time Feedback**: Errors clear immediately when you start typing

### Automatic Phone Masking
- **As You Type**: Phone numbers format automatically while you type
- **Language-Aware**: Mask changes based on selected language (PT-BR vs EN)
- **Auto-Reformat**: When you switch languages, existing phone numbers reformat automatically
- **Examples**:
  - Type `11912345678` in PT-BR → displays `(11) 91234-5678`
  - Type `5551234567` in EN → displays `(555) 123-4567`

### UX Polish
- **Cursor Feedback**: All interactive elements show pointer cursor on hover
- **Success Messages**: Green text confirms successful copy/download actions
- **Error States**: Red borders and clear error messages for invalid inputs
- **Compact UI**: Template selector buttons sized efficiently (`text-xs`)
- **Brand Consistency**: Title in brand blue color for visual identity

## 🔒 Security

- **XSS Protection**: All fields are escaped before generating HTML
- **File Validation**: 2MB limit for logo uploads with file type checking
- **Client-Side Only**: No data is sent to external servers
- **Trusted Dependencies**: Audited and reliable technology stack
- **Input Sanitization**: All user inputs validated and sanitized before use

## 📄 License

This project is under the MIT license.

---

Developed with ❤️ to make creating professional email signatures easier.
