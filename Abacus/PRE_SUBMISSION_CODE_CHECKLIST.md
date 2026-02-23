# Pre-Submission Code Quality Checklist

## 🧹 Code Cleanup Tasks

### Remove Debug Code
Run a search in Xcode (Cmd+Shift+F) for these and remove/fix:

- [ ] `print(` - Remove all debug print statements
- [ ] `dump(` - Remove dump statements
- [ ] `debugPrint(` - Remove debug prints
- [ ] `TODO:` - Complete or remove TODO comments
- [ ] `FIXME:` - Fix or document FIXMEs
- [ ] `XXX:` - Resolve XXX comments
- [ ] `// Test` - Remove test comments
- [ ] `fatalError("not implemented")` - Implement or handle gracefully

### Clean Up Imports
- [ ] Remove unused `import` statements
- [ ] Verify all imports are necessary
- [ ] Check for duplicate imports

### Code Comments
- [ ] Remove commented-out code blocks
- [ ] Keep only meaningful comments
- [ ] Add documentation where needed (especially for complex logic)

---

## 🎨 Asset Requirements

### App Icon
Create icon in these sizes and add to Assets.xcassets:

**iOS Sizes:**
- [ ] 1024×1024 - App Store (no alpha channel!)
- [ ] 180×180 - iPhone 3x (@3x)
- [ ] 120×120 - iPhone 2x (@2x)
- [ ] 167×167 - iPad Pro (@2x)
- [ ] 152×152 - iPad (@2x)
- [ ] 76×76 - iPad (@1x)

**Notification Icons:**
- [ ] 60×60 - Notification (@3x)
- [ ] 40×40 - Notification (@2x)
- [ ] 20×20 - Notification (@1x)

**Spotlight & Settings:**
- [ ] 120×120 - Spotlight (@3x)
- [ ] 80×80 - Spotlight (@2x)
- [ ] 58×58 - Settings (@2x)
- [ ] 87×87 - Settings (@3x)
- [ ] 40×40 - Spotlight (@1x)
- [ ] 29×29 - Settings (@1x)

### Launch Screen
- [ ] Create LaunchScreen.storyboard or use Assets
- [ ] Test on multiple device sizes
- [ ] Keep it simple (logo/app name only)
- [ ] Should match app icon style

### Image Assets
- [ ] Use @2x and @3x images where needed
- [ ] Optimize images (compress without quality loss)
- [ ] Use vector images (PDF) where possible in Assets.xcassets
- [ ] Remove unused images

---

## ⚙️ Project Settings

### Target Configuration
Navigate to: **Target → General**

- [ ] Display Name: Set app name as it appears on home screen
- [ ] Bundle Identifier: `com.yourcompany.appname` (unique, lowercase, no spaces)
- [ ] Version: `1.0.0` (semantic versioning)
- [ ] Build: `1` (increment for each submission)

### Deployment Info
- [ ] Minimum iOS/iPadOS version (recommend iOS 15.0+)
- [ ] Device orientation support:
  - iPhone: Portrait, Landscape Left, Landscape Right (optional)
  - iPad: All orientations (recommended)
- [ ] Supported interface orientations match actual app behavior

### Signing & Capabilities
Navigate to: **Target → Signing & Capabilities**

- [ ] Automatically manage signing: ✓ (recommended)
- [ ] Team: Select your Apple Developer team
- [ ] Bundle Identifier matches App Store Connect
- [ ] No signing errors displayed

### Capabilities (add only what you need)
Review and remove unnecessary capabilities:
- [ ] Background Modes (only if needed)
- [ ] Push Notifications (only if implemented)
- [ ] In-App Purchase (only if you have IAPs)
- [ ] Game Center (only if implemented)
- Remove all unused capabilities

### Info.plist Review
Check **Target → Info**:

- [ ] Bundle name: Your app name
- [ ] Bundle display name: Short name for home screen
- [ ] Privacy descriptions (if using):
  - [ ] Camera: `NSCameraUsageDescription`
  - [ ] Photo Library: `NSPhotoLibraryUsageDescription`
  - [ ] Notifications: Not required, but can add description
  - Remove any unused privacy keys

---

## 🧪 Testing Checklist

### Device Testing
Test on real devices (not just Simulator):

**iPhone:**
- [ ] iPhone SE (small screen)
- [ ] iPhone 14/15 Pro (standard)
- [ ] iPhone 14/15 Pro Max (large)

**iPad:**
- [ ] iPad (10.9")
- [ ] iPad Pro (12.9") if available

### Simulator Testing
Test various screen sizes:
- [ ] iPhone SE (2nd/3rd gen) - smallest
- [ ] iPhone 15 Pro - standard
- [ ] iPhone 15 Pro Max - largest
- [ ] iPad (10th gen)
- [ ] iPad Pro 12.9"

### Orientation Testing
- [ ] Portrait mode works correctly
- [ ] Landscape mode (if supported)
- [ ] Rotation transitions are smooth
- [ ] Layout adapts properly

### Feature Testing

**Core Functionality:**
- [ ] Island selection works
- [ ] Stage selection and navigation
- [ ] Problem grid displays correctly (5×5)
- [ ] Game play functions properly
- [ ] Answer selection and submission
- [ ] Feedback display (correct/incorrect)
- [ ] Progress saves correctly
- [ ] Calendar view displays data
- [ ] Learning/Tutorial section accessible

**Problem Grid:**
- [ ] Shows 25 cells (5×5)
- [ ] Empty cells show problem number
- [ ] Completed cells show checkmark (✓) or X (✗)
- [ ] Dates display in dd/MM format
- [ ] Green background for correct
- [ ] Red background for incorrect
- [ ] Grid scrolls properly on small screens

**Calendar:**
- [ ] Shows current month
- [ ] Navigation to previous/next months
- [ ] Completion dates highlighted
- [ ] Daily statistics display

**Data Persistence:**
- [ ] Complete a problem, close app, reopen - data persists
- [ ] Progress displays after app restart
- [ ] Date formatting remains correct

### Edge Cases
- [ ] First launch (no data)
- [ ] All 25 problems completed (shows green badge)
- [ ] Partially completed stage (shows orange badge)
- [ ] Incorrect answer handling
- [ ] Rapid button tapping (no crashes)
- [ ] Date boundary changes (test near midnight)

### Performance
- [ ] App launches quickly (< 3 seconds)
- [ ] No lag when scrolling
- [ ] Animations are smooth (60 fps)
- [ ] No memory warnings
- [ ] No excessive battery drain

### Appearance
- [ ] Light mode looks good
- [ ] Dark mode looks good (automatic adaptation)
- [ ] Dynamic Type support (text sizing)
- [ ] Colors have sufficient contrast
- [ ] Text is readable on all backgrounds

---

## ♿️ Accessibility

### VoiceOver Support
- [ ] Turn on VoiceOver (Settings → Accessibility)
- [ ] Navigate through the app using VoiceOver
- [ ] All buttons have meaningful labels
- [ ] Images have accessibility labels
- [ ] Interactive elements are announced correctly

### Accessibility Labels
Add labels to:
- [ ] Island images/buttons
- [ ] Stage cards
- [ ] Problem grid cells
- [ ] Answer buttons
- [ ] Navigation elements
- [ ] Calendar dates

Example code:
```swift
Button("Start") {
    // action
}
.accessibilityLabel("Start practicing problems")
.accessibilityHint("Begins the math game")
```

### Visual Accessibility
- [ ] Minimum tap target size: 44×44 points
- [ ] Color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] Don't rely on color alone for meaning
- [ ] Support Dynamic Type (text scales)

### Testing Tools
- [ ] Use Accessibility Inspector (Xcode → Open Developer Tool)
- [ ] Check contrast ratios
- [ ] Verify hit areas
- [ ] Test with VoiceOver

---

## 🚫 Common Issues to Fix

### Crashes
- [ ] No force unwrapping of optionals (`!`) without safety
- [ ] Guard against divide by zero
- [ ] Handle empty arrays before accessing
- [ ] Catch potential out-of-bounds errors

### Memory Leaks
- [ ] Use `[weak self]` in closures where appropriate
- [ ] Remove unused observers
- [ ] Cancel timers properly
- [ ] No retain cycles

### UI Issues
- [ ] No text clipping on small screens
- [ ] All images have correct aspect ratios
- [ ] No UI element overlap
- [ ] Safe area respected (notch, home indicator)

### Data Issues
- [ ] Date formatting is consistent
- [ ] UserDefaults keys are correct
- [ ] CoreData relationships are set
- [ ] Migration strategy (if updating models)

---

## 📸 Screenshot Requirements

### Take Screenshots
Use these device simulators:

**Required:**
1. **iPhone 6.7"** (iPhone 15 Pro Max)
   - [ ] 3-10 screenshots
   - Resolution: 1290×2796 pixels

2. **iPad Pro 12.9"** (6th gen)
   - [ ] 3-10 screenshots
   - Resolution: 2048×2732 pixels

**Recommended (for better coverage):**
3. **iPhone 5.5"** (iPhone 8 Plus)
   - Resolution: 1242×2208 pixels

### Screenshot Content
Capture these key screens:
1. [ ] Island selection screen (main screen)
2. [ ] Stage selection with cards
3. [ ] **Problem grid view** (5×5 with dates) - highlight feature!
4. [ ] Game play screen with problem
5. [ ] Calendar view with highlighted dates
6. [ ] (Optional) Learning/Tutorial section

### Screenshot Tips
- [ ] Use Command+S in Simulator to save
- [ ] Show app with data (not empty state)
- [ ] Make sure status bar looks good (time = 9:41, full battery)
- [ ] Consider adding text overlays highlighting features
- [ ] Use consistent theme (all light or all dark mode)
- [ ] Show best-case scenarios (filled grids, achievements)

### Screenshot Tools (Optional)
- **Fastlane Frameit**: Add device frames
- **Apple Keynote**: Add marketing text
- **Figma/Sketch**: Professional layouts
- **Screenshot Studio**: Quick and easy

---

## 🔍 Final Code Review

### SwiftLint (Recommended)
Install and run SwiftLint:
```bash
brew install swiftlint
cd /path/to/project
swiftlint
```

Fix any warnings or errors.

### Manual Review
- [ ] No force-casting (`as!`) without proper guards
- [ ] Error handling in place for I/O operations
- [ ] All functions have clear, single responsibilities
- [ ] Magic numbers replaced with named constants
- [ ] Complex logic has explanatory comments

### Performance Review
In Xcode:
- [ ] Product → Profile (Cmd+I)
- [ ] Run Time Profiler
- [ ] Check for performance bottlenecks
- [ ] Run Leaks instrument
- [ ] Check for memory leaks

---

## 📦 Archive & Validate

### Pre-Archive
- [ ] Clean build folder: Product → Clean Build Folder (Shift+Cmd+K)
- [ ] Build succeeds with no warnings: Product → Build (Cmd+B)
- [ ] Run analyzer: Product → Analyze (Shift+Cmd+B)
- [ ] Fix any issues found

### Create Archive
1. [ ] Select "Any iOS Device (arm64)" from scheme dropdown
2. [ ] Product → Archive (or Cmd+Shift+B)
3. [ ] Wait for archive to complete (can take 5-10 minutes)
4. [ ] Organizer window opens automatically

### Validate Archive
1. [ ] In Organizer, select your archive
2. [ ] Click "Validate App" button
3. [ ] Choose "App Store Connect" distribution
4. [ ] Select "Automatically manage signing"
5. [ ] Click "Validate"
6. [ ] Fix any errors or warnings
7. [ ] ✅ Validation successful!

### Common Validation Issues
- **Missing compliance**: Select "No" for encryption if you don't use it
- **Invalid icon**: Check alpha channel in 1024×1024 icon
- **Missing provisioning profile**: Check signing settings
- **Mismatched bundle ID**: Must match App Store Connect
- **Missing required icons**: Add all icon sizes

---

## 🎯 Pre-Upload Checklist

Final checks before uploading:

### Code Quality
- [ ] No debug code or print statements
- [ ] All features working as expected
- [ ] No crashes during testing
- [ ] Performance is acceptable
- [ ] Memory usage is reasonable

### Assets
- [ ] App icon complete (all sizes)
- [ ] Launch screen created
- [ ] No placeholder images
- [ ] All assets optimized

### Metadata Ready
- [ ] App name decided
- [ ] Description written (< 4000 chars)
- [ ] Keywords researched (< 100 chars)
- [ ] Screenshots prepared (3-10 per device)
- [ ] Privacy Policy URL ready
- [ ] Support email/website ready

### Legal
- [ ] You have rights to all content
- [ ] No copyrighted material without permission
- [ ] Privacy Policy complies with laws
- [ ] Age rating is accurate
- [ ] COPPA compliant (for kids apps)

### Apple Developer Account
- [ ] Enrolled in Apple Developer Program
- [ ] Membership is active ($99/year paid)
- [ ] App record created in App Store Connect
- [ ] Bundle ID matches exactly

---

## ✅ Upload to App Store Connect

### Distribute App
1. [ ] In Organizer, click "Distribute App"
2. [ ] Select "App Store Connect"
3. [ ] Select "Upload"
4. [ ] Choose signing (Automatically manage signing)
5. [ ] Review content, click "Upload"
6. [ ] Wait for upload to complete (5-30 minutes)

### After Upload
1. [ ] Log in to App Store Connect
2. [ ] Go to "My Apps" → Your App
3. [ ] Wait for build to process (can take 15-60 minutes)
4. [ ] You'll receive email when ready
5. [ ] Once processed, build appears in "TestFlight" tab
6. [ ] Select build for App Store submission

### Complete App Store Metadata
- [ ] Add screenshots for all required device sizes
- [ ] Fill in description, keywords, subtitle
- [ ] Set pricing (free or paid)
- [ ] Select territories (countries)
- [ ] Choose age rating (complete questionnaire)
- [ ] Add support URL and privacy policy URL
- [ ] Add app review contact information
- [ ] Write notes for app reviewer

### Submit for Review
- [ ] Review all information one final time
- [ ] Click "Submit for Review"
- [ ] Wait for Apple's review (1-7 days, typically 24-48 hours)

---

## 📋 Post-Submission

### Monitor Status
Check App Store Connect daily for:
- [ ] "Waiting for Review" - Your app is in queue
- [ ] "In Review" - Apple is actively reviewing
- [ ] "Pending Developer Release" - Approved! Ready to publish
- [ ] "Ready for Sale" - Live on App Store
- [ ] "Rejected" - Review rejection details

### If Rejected
1. [ ] Read rejection reason carefully
2. [ ] Fix the issue
3. [ ] Increment build number
4. [ ] Create new archive
5. [ ] Upload again
6. [ ] Resubmit for review

### After Approval
- [ ] Release app manually (or automatic if you selected that)
- [ ] Share launch announcement
- [ ] Monitor reviews and ratings
- [ ] Respond to user feedback
- [ ] Track downloads in Analytics
- [ ] Plan next update

---

## 🎉 Success!

Your app is now live on the App Store! 🚀

### Next Steps:
1. **Marketing**: Share on social media, website, etc.
2. **User Support**: Respond to emails and reviews
3. **Analytics**: Monitor downloads and usage
4. **Updates**: Plan feature improvements
5. **Feedback**: Listen to users and iterate

### Ongoing Maintenance:
- Respond to reviews within 24-48 hours
- Fix critical bugs quickly
- Release updates regularly (monthly or quarterly)
- Keep up with iOS updates
- Maintain privacy policy
- Renew Developer Program membership annually

---

**Good luck with your app! 🍀**

Remember: First version doesn't have to be perfect. You can always update!

---

*Last Updated: February 23, 2026*
