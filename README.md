# OrangeHRM Cypress Automation Testing

## 📋 Deskripsi Project
Automasi testing untuk website OrangeHRM Demo menggunakan Cypress dengan implementasi Page Object Model (POM) dan API Intercept.

## 🎯 Fitur yang Ditest
- **Login** (16 test cases)
- **Forgot Password** (10 test cases)
- **Dashboard - Directory** (12 test cases)

**Total: 38 Test Cases** with enhanced POM & Intercept implementation

## 🛠️ Tech Stack
- Cypress v13.x
- JavaScript ES6+
- Page Object Model Pattern
- API Intercept

## 📁 Struktur Project
```
TUGAS AKHIR AUTOMATION V.2/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js           # 16 login tests
│   │   ├── forgotPassword.cy.js  # 10 forgot password tests
│   │   └── directory.cy.js       # 12 directory tests
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── ForgotPassword.js
│   │   ├── DashboardPage.js
│   │   └── DirectoryPage.js
│   ├── fixtures/
│   │   └── testData.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md
```

## 🚀 Instalasi

### Prerequisites
- Node.js (v16 atau lebih tinggi)
- npm atau yarn

### Setup
```bash
# Clone repository
git clone <your-repo-url>
cd cypress-orangehrm-automation

# Install dependencies
npm install

# Install Cypress
npm install cypress --save-dev

# Install Mochawesome Reporter (optional)
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

## ▶️ Menjalankan Test

### Mode Interactive (Cypress UI)
```bash
npm run cypress:open
```

### Mode Headless
```bash
npm run cypress:run
```

### Run Specific Test
```bash
# Login tests
npm run test:login

# Forgot Password tests
npm run test:forgot

# Directory tests
npm run test:directory
```

## 📊 Test Coverage

### 1. Login Tests (16 cases) - Enhanced with Intercept
- ✅ Login dengan kredensial valid
- ✅ Verifikasi API login dengan intercept
- ✅ Verifikasi multiple API calls dengan intercept
- ✅ Verifikasi struktur response API
- ✅ Login dengan username kosong
- ✅ Login dengan password kosong
- ✅ Login dengan username & password kosong
- ✅ Login dengan kredensial invalid
- ✅ Verifikasi no redirect on invalid login
- ✅ Validasi semua elemen UI
- ✅ Navigasi ke forgot password
- ✅ Performance test dengan intercept
- ✅ Username with spaces (negative)
- ✅ Password case sensitivity (negative)
- ✅ Username case sensitivity (negative)
- ✅ Rapid multiple login attempts (negative)

### 2. Forgot Password Tests (10 cases) - Enhanced with Intercept
- ✅ Tampilan halaman forgot password
- ✅ Tampilan semua elemen form
- ✅ Submit form dengan username valid
- ✅ Verifikasi reset API dipanggil dengan intercept
- ✅ Validasi username kosong
- ✅ Verifikasi no API call saat field empty
- ✅ Navigasi kembali ke login (cancel)
- ✅ Navigasi dari login ke forgot password
- ✅ Clear & re-enter username dengan POM
- ✅ Verifikasi form state setelah navigasi

### 3. Directory Tests (12 cases) - Enhanced with Intercept
- ✅ Akses directory dari dashboard
- ✅ Tampilan page title
- ✅ Tampilan search form
- ✅ Tampilan semua filter fields
- ✅ Input employee name dengan POM
- ✅ Execute search dan verify URL
- ✅ Reset search form dengan POM
- ✅ API intercept untuk search
- ✅ Verifikasi struktur response API
- ✅ Verifikasi multiple API calls
- ✅ Interaksi location dropdown dengan POM
- ✅ Interaksi job title dropdown dengan POM

## 🎨 Best Practices yang Diimplementasikan

### 1. Page Object Model (POM)
- Separasi logic dan test data
- Reusable methods
- Easy maintenance
- Clean code structure

### 2. API Intercept
- Mock API responses
- Validate API calls
- Test error scenarios
- Faster test execution

### 3. Custom Commands
- Login helper
- Wait utilities
- Assertion helpers

### 4. Test Organization
- Descriptive test names
- Proper test hooks (before, beforeEach)
- Independent tests
- Clear assertions

## 📝 Contoh Test

```javascript
 before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  describe('Positive Test - Login Tests', () => {
    it('TC001: Should login successfully with valid credentials', () => {
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );
      
      cy.wait(3000);
      dashboardPage.verifyDashboardVisible();
      cy.url().should('include', 'dashboard');
    });
    });
```

## 🔧 Configuration

### cypress.config.js
```javascript
module.exports = {
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000
  }
}
```

## 📈 Reporting
menggunakan Mochawesome untuk generate HTML report yang detail.
file report.txt awalnya adalah file report.json, dibuat menjadi report.txt karena file itu merah
walaupun file report.html tetap berhasil dibuat dan hasil report tetap sesuai. Di ubah ke report.txt, agar
file tersebut tidak merah dan bisa di push ke git.

```bash
# Generate report
npm run report
```

**Happy Testing! 🚀**