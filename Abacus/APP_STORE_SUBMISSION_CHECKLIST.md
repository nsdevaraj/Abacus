# App Store Submission Checklist

## 📱 App Information

**App Name**: Abacus (or your chosen name)
**Category**: Education
**Target Audience**: Children (5-12 years old) and Educational
**Platforms**: iOS, iPadOS

---

## ✅ Pre-Submission Checklist

### 1. **Xcode Project Configuration**

#### Bundle Identifier & Version
- [ ] Set a unique Bundle Identifier (e.g., `com.devois.Abacus`)
  - In Xcode: Target → General → Identity → Bundle Identifier
- [ ] Set Version number (e.g., `1.0.0`)
  - Target → General → Identity → Version
- [ ] Set Build number (e.g., `1`)
  - Target → General → Identity → Build

#### App Icons
- [ ] Create and add App Icon in all required sizes:
  - 1024×1024 (App Store)
  - 180×180 (iPhone)
  - 167×167 (iPad Pro)
  - 152×152 (iPad)
  - 120×120 (iPhone)
  - 87×87 (iPhone notifications)
  - 80×80 (iPad notifications)
  - 76×76 (iPad)
  - 60×60 (iPhone)
  - 58×58 (notifications)
  - 40×40 (spotlight)
  - 29×29 (settings)
- [ ] Use Assets.xcassets → AppIcon to add all sizes
- [ ] Ensure no alpha channel/transparency in icons

#### Launch Screen
- [ ] Create an attractive Launch Screen
  - File → New → File → Launch Screen
  - Or use Assets.xcassets → LaunchImage
- [ ] Keep it simple (app logo/name on plain background)

#### Display Name
- [ ] Set App Display Name (what appears under the icon)
  - Target → Info → Bundle display name

---

### 2. **Privacy & Permissions**

#### Privacy Policy (REQUIRED)
- [ ] Create a Privacy Policy document
- [ ] Host it on a publicly accessible URL
- [ ] Include sections on:
  - What data is collected (CoreData local storage)
  - How data is used (progress tracking)
  - Data storage location (device only)
  - No third-party sharing
  - No advertising/analytics (if applicable)
  - COPPA compliance (for children's apps)

#### Info.plist Permissions
Check if your app needs any of these (based on your current code, you may not):
- [ ] Camera usage description (if needed)
- [ ] Photo library usage (if needed)
- [ ] Notifications (if you add reminders)

#### Age Rating
- [ ] Determine age rating (likely 4+)
- [ ] Ensure no inappropriate content
- [ ] Comply with COPPA for children's apps

---

### 3. **Code Quality & Testing**

#### Remove Development Code
- [ ] Remove all `print()` debug statements
- [ ] Remove test data and mock content
- [ ] Remove unused imports and commented code

#### Testing
- [ ] Test on real devices (iPhone and iPad)
- [ ] Test on iOS Simulator (multiple screen sizes)
- [ ] Test all features:
  - [ ] Island selection
  - [ ] Stage navigation
  - [ ] Problem grid (5×5 display)
  - [ ] Game play for all operations (+, −, ×, ÷)
  - [ ] Progress tracking
  - [ ] Calendar view
  - [ ] Learning/Tutorial sections
  - [ ] Rotation support (iPad)
  - [ ] Dark mode compatibility
- [ ] Test edge cases:
  - [ ] First launch (no data)
  - [ ] After 25 problems completed
  - [ ] Date boundaries (new day)
  - [ ] Network disconnected (if applicable)

#### Performance
- [ ] Check for memory leaks
- [ ] Verify smooth animations
- [ ] Test on older devices (if possible)
- [ ] Optimize images and assets

#### Accessibility
- [ ] Add accessibility labels to buttons and images
- [ ] Test with VoiceOver enabled
- [ ] Ensure good color contrast
- [ ] Support Dynamic Type (text sizing)

---

### 4. **App Store Connect Setup**

#### Apple Developer Account
- [ ] Enroll in Apple Developer Program ($99/year)
  - https://developer.apple.com/programs/
- [ ] Wait for approval (can take 24-48 hours)

#### Create App Record
- [ ] Log in to App Store Connect (https://appstoreconnect.apple.com)
- [ ] Click "My Apps" → "+" → "New App"
- [ ] Fill in:
  - Platform: iOS
  - App Name (must be unique on App Store)
  - Primary Language
  - Bundle ID (must match Xcode)
  - SKU (unique identifier, e.g., `ABACUS001`)
  - User Access: Full Access

---

### 5. **App Store Metadata**

#### App Information
- [ ] **App Name**: Clear, searchable (30 chars max)
- [ ] **Subtitle**: Brief description (30 chars max)
  - Example: "Mental Math Training for Kids"
- [ ] **Primary Category**: Education
- [ ] **Secondary Category**: Games → Educational (optional)

#### Description (4000 chars max)
Write a compelling description including:
- [ ] What the app does
- [ ] Key features (problem grid, progress tracking, 11 islands)
- [ ] Educational benefits
- [ ] Age appropriateness
- [ ] No ads/in-app purchases (if true)

**Example Template**:
```
Master mental math with the ancient tool of calculation!

Abacus is an engaging educational app that helps children develop strong mental math skills through interactive practice and game-based learning.

🎯 KEY FEATURES:
• 11 themed islands with progressive difficulty
• 25 unique problems per stage (100 per island)
• Visual progress tracking with 5×5 problem grids
• Daily practice calendar with completion dates
• Four operations: Addition, Subtraction, Multiplication, Division
• Adaptive difficulty that grows with your child

📚 LEARNING APPROACH:
Each island represents a different skill level, from basic single-digit addition to complex multi-digit operations. The 5×5 problem grid lets students and parents track progress at a glance.

✨ DESIGNED FOR KIDS:
• Clean, colorful interface
• Instant feedback on answers
• Achievement-based motivation
• No ads or in-app purchases
• Fully offline - no internet required
• Safe for children

👨‍👩‍👧 FOR PARENTS & TEACHERS:
• Monitor daily practice patterns
• View completion dates for each problem
• Identify areas needing extra practice
• Track long-term progress through calendar view

Perfect for elementary school students (ages 5-12) building foundational math skills!
```

#### Keywords (100 chars max)
- [ ] Research relevant keywords
- [ ] Use comma-separated list
- Example: `math,abacus,education,kids,learning,arithmetic,addition,multiplication,mental math,school`

#### Support URL
- [ ] Create a support website or email
- Example: `mailto:support@yourdomain.com`
- Or simple GitHub Pages site

#### Marketing URL (optional)
- [ ] Create a landing page for the app

---

### 6. **Screenshots & Previews**

#### Required Screenshots
You need screenshots for:
- [ ] 6.5" iPhone (iPhone 14 Pro Max, 15 Pro Max)
- [ ] 5.5" iPhone (iPhone 8 Plus) - optional but recommended
- [ ] 12.9" iPad Pro (6th gen)
- [ ] 12.9" iPad Pro (2nd gen) - optional

#### Screenshot Requirements:
- [ ] 3-10 screenshots per device size
- [ ] Show actual app content (no mockup frames)
- [ ] Highlight key features:
  1. Island selection screen
  2. Stage selection with problem grid
  3. Problem grid view (5×5 with completion dates)
  4. Game play screen
  5. Calendar view with progress
  6. Learning/tutorial section
- [ ] Use high-quality, non-blurry images
- [ ] Add text overlays for feature highlights (optional)

#### App Preview Video (Optional)
- [ ] 15-30 second video showing app in action
- [ ] Landscape or portrait orientation
- [ ] Show actual gameplay and features

---

### 7. **Pricing & Availability**

- [ ] Choose pricing model:
  - Free (recommended for educational apps)
  - Paid (one-time purchase)
  - Freemium (with in-app purchases)
- [ ] Select territories (countries)
  - Usually "All territories" to maximize reach
- [ ] Set availability date
  - Manual release (you control when it goes live)
  - Automatic release (after approval)

---

### 8. **Build Upload**

#### Archive Your App
1. [ ] In Xcode, select "Any iOS Device (arm64)" as target
2. [ ] Product → Archive
3. [ ] Wait for archive to complete
4. [ ] Window → Organizer opens automatically

#### Validate Archive
1. [ ] Select your archive
2. [ ] Click "Validate App"
3. [ ] Choose appropriate options:
   - App Store Connect distribution
   - Automatic signing (recommended)
4. [ ] Fix any errors or warnings
5. [ ] Validation should pass

#### Upload to App Store Connect
1. [ ] Click "Distribute App"
2. [ ] Select "App Store Connect"
3. [ ] Upload
4. [ ] Wait for processing (10-60 minutes)
5. [ ] Check App Store Connect for build availability

---

### 9. **App Review Information**

#### Contact Information
- [ ] First Name, Last Name
- [ ] Phone Number
- [ ] Email Address

#### Demo Account (if login required)
- [ ] Username
- [ ] Password
- [ ] Additional details

*Note: Your app doesn't seem to require login, so you can skip this.*

#### Notes for Reviewer
Provide helpful context:
```
This is an educational math app for children learning mental arithmetic.

How to test:
1. Launch the app and select any island
2. Choose a stage to view the 5×5 problem grid
3. Tap "Start" to play the game
4. Answer math problems to see progress tracking
5. View the Calendar tab to see daily completion tracking

All data is stored locally on the device using CoreData. No internet connection is required.

Target age group: 5-12 years old
```

---

### 10. **Age Rating Questionnaire**

Answer truthfully about content in your app:
- [ ] Violence: None
- [ ] Sexual Content: None
- [ ] Profanity: None
- [ ] Horror/Fear: None
- [ ] Gambling: None
- [ ] Drugs/Alcohol/Tobacco: None
- [ ] Medical/Treatment: None
- [ ] Unrestricted Web Access: No
- [ ] Contests: No
- [ ] Made for Kids: Yes (if targeting children)

Expected Rating: **4+** (suitable for all ages)

---

### 11. **Submit for Review**

- [ ] Double-check all information
- [ ] Ensure build is selected
- [ ] Review all metadata
- [ ] Click "Submit for Review"
- [ ] Wait for Apple's review (typically 24-48 hours, can be up to 7 days)

---

## 🚨 Common Rejection Reasons to Avoid

### For Educational/Kids Apps:
1. **Missing Privacy Policy** - Must have accessible URL
2. **Age Rating Issues** - Must comply with children's privacy laws
3. **Incomplete Metadata** - All fields properly filled
4. **Low-Quality Screenshots** - Must show actual app content
5. **Crashes or Bugs** - Thoroughly test before submission
6. **Missing Functionality** - All advertised features must work
7. **Kids Category Requirements** - No third-party ads or analytics
8. **COPPA Compliance** - Must comply with children's privacy regulations

---

## 📋 Quick Command Reference

### Build for Testing
```bash
# Clean build folder
Product → Clean Build Folder (Shift + Cmd + K)

# Run on device
Select your device → Product → Run (Cmd + R)

# Run tests
Product → Test (Cmd + U)
```

### Archive for Release
```bash
# Select target
Any iOS Device (arm64)

# Archive
Product → Archive (or Cmd + Shift + B)
```

### Version Management
```bash
# In Terminal (from project directory)
# Bump version number
agvtool new-marketing-version 1.0.1

# Bump build number
agvtool next-version -all
```

---

## 🎨 Asset Creation Tips

### App Icon
- Use a simple, recognizable symbol
- Abacus-themed (beads, counting frame)
- Bold colors that stand out
- Test at small sizes (looks good at 40×40)
- Tools: Figma, Sketch, Adobe Illustrator, Canva

### Screenshots
- Use Simulator → Screenshot (Cmd + S)
- Or device screenshots via Xcode (Cmd + Shift + 5)
- Add marketing text using tools like:
  - Screenshot Pro
  - Placeit
  - Apple's Keynote
  - Figma

---

## 📞 Resources

- **App Store Connect**: https://appstoreconnect.apple.com
- **Developer Portal**: https://developer.apple.com
- **App Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **App Store Marketing**: https://developer.apple.com/app-store/marketing/guidelines/

---

## ✅ Final Checklist Before Submission

- [ ] App builds and runs without errors
- [ ] All features tested on real devices
- [ ] App Icon added (all sizes)
- [ ] Launch Screen created
- [ ] Privacy Policy URL ready
- [ ] App Store screenshots prepared
- [ ] App description written
- [ ] Keywords researched
- [ ] Support contact provided
- [ ] Age rating completed
- [ ] Build uploaded and processed
- [ ] All metadata complete
- [ ] Ready to submit!

---

## 🎉 After Approval

Once approved:
1. App goes live on App Store (if auto-release selected)
2. Monitor reviews and ratings
3. Respond to user feedback
4. Plan updates and improvements
5. Track downloads in App Store Connect Analytics

**Good luck with your submission! 🚀**

---

*Last Updated: February 23, 2026*
